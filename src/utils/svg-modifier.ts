const modifySvgStyles = (
  svg: string,
  customization?: { cornerStyle?: 'square' | 'rounded' | 'dots'; dotStyle?: 'square' | 'rounded' | 'dots' }
) => {
  if (!customization?.cornerStyle && !customization?.dotStyle) return svg;

  // Replace the path with rect elements that support rounding
  let modifiedSvg = svg;
  const pathRegex = /<path\s+d="([^"]+)"\s*[^>]*>/g;
  const paths = Array.from(svg.matchAll(pathRegex));
  
  paths.forEach((pathMatch) => {
    const originalPath = pathMatch[0];
    const pathD = pathMatch[1];
    
    // Parse the path data to extract position and size
    const numbers = pathD.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
    if (numbers.length < 4) return;
    
    const [x, y] = numbers;
    const width = Math.abs(numbers[2] - x) || Math.abs(numbers[4] - x) || 1;
    const height = Math.abs(numbers[3] - y) || Math.abs(numbers[5] - y) || 1;
    
    // Determine if this is a corner or regular dot
    const isCorner = x === 0 || y === 0 || x >= width * 7 || y >= height * 7;
    const style = isCorner ? customization.cornerStyle : customization.dotStyle;
    
    let rx = 0, ry = 0;
    let scale = 1;
    
    switch (style) {
      case 'rounded':
        rx = ry = Math.min(width, height) * (isCorner ? 0.3 : 0.15);
        break;
      case 'dots':
        rx = ry = Math.min(width, height) * (isCorner ? 0.5 : 0.4);
        scale = 0.8; // Make dots slightly smaller
        break;
      default: // 'square'
        rx = ry = 0;
        break;
    }
    
    // Create rect element with rounded corners
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const adjustedX = centerX - scaledWidth / 2;
    const adjustedY = centerY - scaledHeight / 2;
    
    const rect = `<rect x="${adjustedX}" y="${adjustedY}" width="${scaledWidth}" height="${scaledHeight}" 
      rx="${rx}" ry="${ry}" fill="currentColor"/>`;
    
    modifiedSvg = modifiedSvg.replace(originalPath, rect);
  });
  
  return modifiedSvg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
};

export default modifySvgStyles;