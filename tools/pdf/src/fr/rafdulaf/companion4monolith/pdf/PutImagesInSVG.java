package fr.rafdulaf.companion4monolith.pdf;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.util.Base64;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

/**
 * Replaces images in svg by the image content
 */
public class PutImagesInSVG
{
    static Pattern IMAGE_READER = Pattern.compile("<image ([^>]*\\s)?xlink:href=\"(?!data:image)([^\"]+)\"(\\s[^>]*)?/>");
    static Pattern SVG_READER = Pattern.compile("<object ([^>]*\\s)?data=\"([^\"]+)\"(\\s[^>]*)?></object>");

    static Set<Path> _toDelete = new HashSet<>();
    
    public static void main(String[] args) throws IOException
    {
        Path rootPath = Path.of(args[0]);
        inline(rootPath, ".svg", PutImagesInSVG::_inlineImages);
        inline(rootPath, ".html", PutImagesInSVG::_inlineSVG);
    }

    private static void inline(Path rootPath, String extension, Consumer<Path> action) throws IOException
    {
        _toDelete = new HashSet<>();
        
        try (Stream<Path> files = Files.walk(rootPath))
        {
            files.filter(Files::isRegularFile)
                 .filter(f -> f.getFileName().toString().toLowerCase().endsWith(extension))
                 .forEach(action);
        }
        
        for (Path toDelete : _toDelete)
        {
            try
            {
                Files.delete(toDelete);
                Files.delete(toDelete.getParent());
            }
            catch (DirectoryNotEmptyException e)
            {
                // ignore
            }
            catch (NoSuchFileException e)
            {
                System.out.println("Duplicated " + toDelete);
            }
        }
        
        _toDelete = null;
    }

    private static void _inlineSVG(Path htmlFile)
    {
        try
        {
            String fileContent = Files.readString(htmlFile);
            
            StringBuilder sb = new StringBuilder();
            
            int count = 0;
            Matcher m = SVG_READER.matcher(fileContent);
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
                
                _toDelete.add(svgFile);
                
                count++;
            }

            m.appendTail(sb);
            
            if (count > 0)
            {
                System.out.println("Handle " + htmlFile + " (" + count + ")");
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
            Matcher m = IMAGE_READER.matcher(fileContent);
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
                
                _toDelete.add(imgFile);
                
                count++;
            }

            m.appendTail(sb);
            
            if (count > 0)
            {
                System.out.println("Handle " + svgFile + " (" + count + ")");
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
}
