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
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

/**
 * Replaces images in svg by the image content
 */
public class PutImagesInSVG
{
    static Pattern IMAGE_READER = Pattern.compile("<image ([^>]*\\s)?xlink:href=\"(?!data:image)([^\"]+)\"(\\s[^>]*)?/>");

    static Set<Path> _toDelete = new HashSet<>();
    
    public static void main(String[] args) throws IOException
    {
        Path rootPath = Path.of(args[0]);
        try (Stream<Path> files = Files.walk(rootPath))
        {
            files.filter(Files::isRegularFile)
                 .filter(f -> f.getFileName().toString().toLowerCase().endsWith(".svg"))
                 .forEach(PutImagesInSVG::_handle);
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
    }
    
    private static void _handle(Path svgFile)
    {
        try
        {
    //        System.out.println("Handle " + svgFile);
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
            
    /*        String svgFileLocation = args[0];
            Path svgFile = Path.of(svgFileLocation);
            
    
            String fileName = svgFile.getFileName().toString();
            int i = fileName.lastIndexOf('.');
            String dirName = fileName.substring(0, i);
            
            Path subPath = svgFile.getParent().resolve(dirName);
            Files.createDirectories(subPath);
            
            StringBuilder sb = new StringBuilder();
            
            Matcher m = IMAGE_READER.matcher(fileContent);
            while (m.find())
            {
                String imageName = m.group(1);
    
                byte[] imageBytes = Files.readAllBytes(subPath.resolve(imageName + ".webp"));
                byte[] encodedImage = Base64.getEncoder().encode(imageBytes);
                String finalImage = new String(encodedImage, StandardCharsets.UTF_8);
                
                m.appendReplacement(sb, "<image id=\"" + imageName + "\"" + m.group(2) + "xlink:href=\"page/" + finalImage + "\"/>");
            }
            
            m.appendTail(sb);
            
            Files.write(svgFile, sb.toString().getBytes(StandardCharsets.UTF_8));
            */
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
