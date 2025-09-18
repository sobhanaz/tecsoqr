const modifySvgStyles = (
  svg: string,
  customization?: {
    cornerStyle?: "square" | "rounded" | "dots";
    dotStyle?: "square" | "rounded" | "dots";
  }
) => {
  if (!customization?.cornerStyle && !customization?.dotStyle) return svg;

  // Calculate QR code parameters
  const viewBoxMatch = svg.match(/viewBox="0 0 (\d+) \d+"/);
  const size = parseInt(viewBoxMatch?.[1] || "0", 10);
  if (!size) return svg;

  // Standard QR code is 33x33 including quiet zone
  const moduleCount = 33;
  const moduleSize = size / moduleCount;
  const spacing = moduleSize * 0.1; // 10% spacing between modules

  // Parse SVG and prepare for modification
  let modifiedSvg = svg;
  const pathRegex = /<path\s+d="([^"]+)"\s*[^>]*>/g;
  const paths = Array.from(svg.matchAll(pathRegex));

  paths.forEach((pathMatch) => {
    const originalPath = pathMatch[0];
    const pathD = pathMatch[1];

    // Extract coordinates from path data
    const coords = pathD.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
    if (coords.length < 4) return;

    const [x, y] = coords;
    const width =
      Math.abs(coords[2] - x) || Math.abs(coords[4] - x) || moduleSize;
    const height =
      Math.abs(coords[3] - y) || Math.abs(coords[5] - y) || moduleSize;

    // Detect corner modules (improved detection)
    const isCorner =
      (x <= moduleSize * 2 && y <= moduleSize * 2) || // Top-left
      (x >= size - moduleSize * 4 && y <= moduleSize * 2) || // Top-right
      (x <= moduleSize * 2 && y >= size - moduleSize * 4) || // Bottom-left
      (x >= size - moduleSize * 4 && y >= size - moduleSize * 4); // Bottom-right

    const style = isCorner ? customization.cornerStyle : customization.dotStyle;

    // Apply styles with improved calculations
    let rx = 0,
      ry = 0;
    let shrinkFactor = 1;
    let finalWidth = width;
    let finalHeight = height;

    switch (style) {
      case "rounded": {
        // Use consistent rounding radius
        rx = ry = Math.min(width, height) * (isCorner ? 0.25 : 0.2);
        shrinkFactor = isCorner ? 0.95 : 0.92;
        finalWidth = width * shrinkFactor - spacing * 2;
        finalHeight = height * shrinkFactor - spacing * 2;
        break;
      }
      case "dots": {
        // Ensure perfect circles with equal width/height
        const size = Math.min(width, height) * (isCorner ? 0.9 : 0.85);
        finalWidth = finalHeight = size - spacing * 2;
        rx = ry = size / 2;
        break;
      }
      default: {
        // 'square'
        rx = ry = 0;
        finalWidth = width - spacing * 2;
        finalHeight = height - spacing * 2;
        break;
      }
    }

    // Calculate final position to center the shape
    const finalX = x + (width - finalWidth) / 2;
    const finalY = y + (height - finalHeight) / 2;

    // Create rect element with calculated attributes
    const rect = `<rect 
      x="${finalX}" 
      y="${finalY}" 
      width="${finalWidth}" 
      height="${finalHeight}" 
      rx="${rx}" 
      ry="${ry}" 
      fill="currentColor"
    />`
      .replace(/\s+/g, " ")
      .trim();

    modifiedSvg = modifiedSvg.replace(originalPath, rect);
  });

  // Ensure consistent color handling
  return modifiedSvg
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/>\s+</g, "><")
    .trim();
};

export default modifySvgStyles;
