package imageconvert;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileFilter;

import javax.imageio.ImageIO;

import net.coobird.thumbnailator.Thumbnails;

public class MergeImageAndMask
{
    public static void main(String[] args) throws Exception
    {
        if (args.length != 2)
        {
            throw new Exception("Tu sais pas compter jusqu'à 2 ?");
        }
        
        File src = new File(args[0]);
        File dest = new File(args[1]);
        
        dest.mkdirs();
        
        File[] images = src.listFiles(new FileFilter() {
            public boolean accept(File f)
            {
                return f.isFile();
            }
        });
        
        if (images.length % 2 == 1)
        {
            throw new Exception("Nombre d'images impair");
        }
        
        for (int f = 0; f < images.length; f += 2)
        {
            File image = images[f];
            File maskFile = images[f+1];
            
            System.out.println(image + " / " + maskFile);

            BufferedImage bg = ImageIO.read(image);
            int width = bg.getWidth();
            int height = bg.getHeight();
            
            BufferedImage mask = Thumbnails.of(maskFile).size(width, height).asBufferedImage();
            
            BufferedImage result = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
            
            for (int i = 0; i < mask.getWidth(); i++)
            {
                for (int j = 0; j < mask.getHeight(); j++)
                {
                    int maskRGB = mask.getRGB(i, j);
                    int alpha = (maskRGB & 0xff) << 24;
                    result.setRGB(i, j, (bg.getRGB(i, j) & 0x00ffffff) | alpha);
                }
            }
            
            ImageIO.write(result, "png", new File(dest, image.getName()));
        }
    }
}
