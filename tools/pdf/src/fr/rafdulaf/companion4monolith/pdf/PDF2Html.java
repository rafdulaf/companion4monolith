package fr.rafdulaf.companion4monolith.pdf;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileTime;
import java.util.Base64;
import java.util.List;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import org.jpedal.examples.html.PDFtoHTML5Converter;
import org.jpedal.exception.PdfException;
import org.jpedal.render.output.IDRViewerOptions;
import org.jpedal.render.output.html.HTMLConversionOptions;

import io.github.mojtabaJ.cwebp.WebpConverter;

/**
 * Takes a pdf file and convert it to a HTML
 */
public class PDF2Html
{
    private static final Pattern __NUMBER = Pattern.compile("^[0-9]*$");
    private static Pattern __IMAGE_READER = Pattern.compile("<image ([^>]*\\s)?xlink:href=\"(?!data:image)([^\"]+)\"(\\s[^>]*)?/>");
    private static Pattern __SVG_READER = Pattern.compile("<object ([^>]*\\s)?data=\"([^\"]+)\"(\\s[^>]*)?></object>");
    
    /**
     * Start conversion process
     * @param args none
     * @throws IOException if cannot list files correctly
     */
    public static void main(String[] args) throws IOException
    {
        // Update buildvu date to ensure it works... sic
        Files.setLastModifiedTime(Path.of("tools/pdf/buildvu-html.jar"), FileTime.fromMillis(System.currentTimeMillis()));
        
        // Browsing data
        for (String app : List.of("Conan", "Batman"))
        {
            try (Stream<Path> books = Files.list(Path.of(app + "/data/rules/books")))
            {
                books.forEach(book -> _handleBook(book));
            }
        }
        
    }

    private static void _handleBook(Path book)
    {
        try (Stream<Path> files = Files.list(book))
        {
            files.filter(f -> !Files.isDirectory(f))
                .filter(f -> f.getFileName().toString().toLowerCase().endsWith(".pdf"))
                .forEach(f -> _handleLang(f));
        }
        catch (Exception e)
        {
            if (e instanceof RuntimeException re)
            {
                throw re;
            }
            else
            {
                throw new RuntimeException(e);
            }
        }
    }

    private static void _handleLang(Path pdfFile)
    {
        try
        {
            System.out.println("***********************************************************************************************");
            System.out.println("* Handling " + pdfFile);
            System.out.println("***********************************************************************************************");
            
            // Convert using buildvu
            System.out.println("#1 Converting PDF -> HTML");
            Path folder = _convertPDFToHTML(pdfFile);
            
            // Remove useless files
            System.out.println("#2 Cleaning");
            Files.delete(folder.resolve("annotations.json"));
            Files.delete(folder.resolve("config.js"));
            Files.delete(folder.resolve("index.html"));
            
            // Convert images to webp
            System.out.println("#3 Converting images to webp");
            _convertImages(folder);
            
            // Replace images references
            System.out.println("#4 Changing references to webp");
            _changeReferenceImages(folder);
            
            // Set autozoom in body
            System.out.println("#5 Adding autozoom to pages");
            _addAutozoom(folder);

            // Integrates images to SVG and SVG to HTML
            System.out.println("#6 Integrating images to svg and svg to html");
            _inline(folder);

            // Remove useless pages folders
            System.out.println("#7 Removing pages folder");
            _removePagesFolder(folder);

            // Remove pdf file
            System.out.println("#8 Removing pdf file");
            Files.delete(pdfFile);
        }
        catch (Exception e)
        {
            throw new RuntimeException("Error with " + pdfFile, e);
        }
    }
    
    private static Path _convertPDFToHTML(Path pdfFile) throws PdfException
    {
        HTMLConversionOptions conversionOptions = new HTMLConversionOptions();
        conversionOptions.setCompressImages(true);
        IDRViewerOptions viewerOptions = new IDRViewerOptions();
        viewerOptions.setGenerateSearchFile(true);
        viewerOptions.setOutputThumbnails(true);
        
        String pdfFileName = pdfFile.getFileName().toString();
        String folderName = pdfFileName.substring(0, pdfFileName.length() - 4);
        Path folder = pdfFile.getParent().resolve(folderName);
        
        if (Files.exists(folder))
        {
            throw new RuntimeException(folder + " already exists. Stoping.");
        }
        
        PDFtoHTML5Converter converter = new PDFtoHTML5Converter(pdfFile.toFile(), folder.getParent().toFile(), conversionOptions, viewerOptions);
        converter.convert();
        
        return folder;
    }
    
    private static void _convertImages(Path folder)
    {
        try (Stream<Path> files = Files.list(folder))
        {
            files.forEach(f -> {
                if (Files.isDirectory(f))
                {
                    _convertImages(f);
                }
                else
                {
                    String filename = f.getFileName().toString().toLowerCase();
                    if (filename.endsWith(".png") || filename.endsWith(".jpg") || filename.endsWith(".jpeg"))
                    {
                        int index = filename.lastIndexOf(".");
                        String newFilename = filename.substring(0, index) + ".webp";

                        WebpConverter.imageFileToWebpFile(f.toAbsolutePath().toString(), f.getParent().resolve(newFilename).toAbsolutePath().toString(), 60);
                        try
                        {
                            Files.delete(f);
                        }
                        catch (IOException e)
                        {
                            throw new RuntimeException(e);
                        }
                    }
                }
            });
        }
        catch (IOException e)
        {
            throw new RuntimeException("An error occurred on " + folder, e);
        }
    }
    
    private static void _changeReferenceImages(Path folder)
    {
        try (Stream<Path> files = Files.list(folder))
        {
            files.forEach(f -> {
                if (Files.isDirectory(f))
                {
                    _changeReferenceImages(f);
                }
                else
                {
                    String filename = f.getFileName().toString().toLowerCase();
                    if (filename.endsWith(".svg") || filename.endsWith(".html"))
                    {
                        try
                        {
                            String fileContent = Files.readString(f, StandardCharsets.UTF_8);
                            String newFileContent = fileContent;
                            newFileContent = newFileContent.replace(".png", ".webp");
                            newFileContent = newFileContent.replace(".jpg", ".webp");
                            newFileContent = newFileContent.replace(".jpeg", ".webp");
                            if (!newFileContent.equals(fileContent))
                            {
                                Files.writeString(f, newFileContent, StandardCharsets.UTF_8);
                            }
                        }
                        catch (IOException e)
                        {
                            throw new RuntimeException(e);
                        }
                    }
                }
            });
        }
        catch (IOException e)
        {
            throw new RuntimeException("An error occurred on " + folder, e);
        }
    }
    
    private static void _addAutozoom(Path folder)
    {
        try (Stream<Path> files = Files.list(folder))
        {
            files.forEach(f -> {
                if (Files.isDirectory(f))
                {
                    _addAutozoom(f);
                }
                else
                {
                    String filename = f.getFileName().toString().toLowerCase();
                    if (filename.endsWith(".html"))
                    {
                        try
                        {
                            String fileContent = Files.readString(f, StandardCharsets.UTF_8);
                            String newFileContent = fileContent;
                            newFileContent = newFileContent.replace("<body style=\"margin: 0;\">", "<body style=\"margin: 0;\"><script src=\"../../../../../engine/rules/autozoom.js\"></script>");
                            if (!newFileContent.equals(fileContent))
                            {
                                Files.writeString(f, newFileContent, StandardCharsets.UTF_8);
                            }
                        }
                        catch (IOException e)
                        {
                            throw new RuntimeException(e);
                        }
                    }
                }
            });
        }
        catch (IOException e)
        {
            throw new RuntimeException("An error occurred on " + folder, e);
        }
    }
    
    private static void _inline(Path folder) throws IOException
    {
        _inline(folder, ".svg", PDF2Html::_inlineImages);
        _inline(folder, ".html", PDF2Html::_inlineSVG);
    }
    
    private static void _inline(Path rootPath, String extension, Consumer<Path> action) throws IOException
    {
        try (Stream<Path> files = Files.walk(rootPath))
        {
            files.filter(Files::isRegularFile)
                 .filter(f -> f.getFileName().toString().toLowerCase().endsWith(extension))
                 .forEach(action);
        }
    }
    
    private static void _inlineSVG(Path htmlFile)
    {
        try
        {
            String fileContent = Files.readString(htmlFile);
            
            StringBuilder sb = new StringBuilder();
            
            int count = 0;
            Matcher m = __SVG_READER.matcher(fileContent);
            while (m.find())
            {
                String svgName = m.group(2);
                
                Path svgFile = htmlFile.getParent().resolve(svgName);
                if (!Files.exists(svgFile))
                {
                    throw new FileNotFoundException(htmlFile + " references the unexisting svg file " + svgFile);
                }
                
                String svgContent = Files.readString(svgFile);
                svgContent = svgContent.substring(svgContent.indexOf("<svg") + 3);
                
                m.appendReplacement(sb, "<svg " + _default(m.group(1)) + _default(m.group(3)) + svgContent);
                
                count++;
            }

            m.appendTail(sb);
            
            if (count > 0)
            {
                Files.write(htmlFile, sb.toString().getBytes(StandardCharsets.UTF_8));
            }
        }
        catch (Exception e)
        {
            throw new RuntimeException("Error handling " + htmlFile, e);
        }
    }
    
    private static void _inlineImages(Path svgFile)
    {
        try
        {
            String fileContent = Files.readString(svgFile);
            
            StringBuilder sb = new StringBuilder();
            
            int count = 0;
            Matcher m = __IMAGE_READER.matcher(fileContent);
            while (m.find())
            {
                String imageName = m.group(2);
                
                Path imgFile = svgFile.getParent().resolve(imageName);
                if (!Files.exists(imgFile))
                {
                    throw new FileNotFoundException(svgFile + " references the unexisting image file " + imgFile);
                }
                byte[] imageBytes = Files.readAllBytes(imgFile);
                byte[] encodedImage = Base64.getEncoder().encode(imageBytes);
                String finalImage = new String(encodedImage, StandardCharsets.UTF_8);
                
                m.appendReplacement(sb, "<image " + _default(m.group(1)) + "xlink:href=\"data:image/" + _mimetype(imgFile) + ";base64," + finalImage + "\"" + _default(m.group(3)) + "/>");
                
                count++;
            }

            m.appendTail(sb);
            
            if (count > 0)
            {
                Files.write(svgFile, sb.toString().getBytes(StandardCharsets.UTF_8));
            }
        }
        catch (Exception e)
        {
            throw new RuntimeException("Error handling " + svgFile, e);
        }
    }
    
    private static String _default(String s)
    {
        if (s == null)
        {
            return "";
        }
        else
        {
            return s;
        }
    }

    private static String _mimetype(Path imgFile)
    {
        String fileName = imgFile.getFileName().toString();
        if (fileName.toLowerCase().endsWith(".webp"))
        {
            return "webp";
        }
        else
        {
            throw new IllegalArgumentException("Unknown mimetype for extension of file named " + fileName);
        }
    }
    
    private static void _removePagesFolder(Path folder)
    {
        try (Stream<Path> files = Files.list(folder))
        {
            files.forEach(f -> {
                if (Files.isDirectory(f) && __NUMBER.matcher(f.getFileName().toString()).matches())
                {
                    _deleteDirectory(f);
                }
            });
        }
        catch (IOException e)
        {
            throw new RuntimeException("An error occurred on " + folder, e);
        }
    }
    
    private static void _deleteDirectory(Path directoryToBeDeleted)
    {
        try
        {
            if (Files.isDirectory(directoryToBeDeleted))
            {
                try (Stream<Path> files = Files.list(directoryToBeDeleted))
                {
                    files.forEach(f -> _deleteDirectory(f));
                }
            }
            Files.delete(directoryToBeDeleted);
        }
        catch (Exception e)
        {
            throw new RuntimeException(e);
        }
    }
}
