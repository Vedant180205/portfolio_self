import sys
from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    # Convert to grayscale to use as alpha channel
    gray = img.convert("L")
    
    # Get data
    img_data = img.getdata()
    alpha_data = gray.getdata()
    
    new_data = []
    for i, item in enumerate(img_data):
        # We can just keep the original RGB and set alpha based on brightness
        # Or to avoid dark fringes, we can set RGB to white/gray and let alpha do the fading.
        # Let's keep original RGB, and use brightness for Alpha.
        # But wait, if we use original RGB (which fades to black), and alpha also fades to 0,
        # it will be doubly darkened. 
        # Better: set the RGB to what it would be if it were drawn on black.
        # Actually, for this specific image, it's a white/gray logo.
        # If we just make all black pixels transparent with a threshold:
        r, g, b, a = item
        # Calculate brightness
        brightness = (r + g + b) / 3
        if brightness < 20: # threshold for black
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append((r, g, b, 255))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Success")

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2])
