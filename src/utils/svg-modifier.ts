const modifySvgStyles = (
  svg: string,
  customization?: { cornerStyle?: 'square' | 'rounded' | 'dots'; dotStyle?: 'square' | 'rounded' | 'dots' }
) => {
  if (!customization?.cornerStyle && !customization?.dotStyle) return svg;

  // Extract size from SVG viewBox
  const viewBoxMatch = svg.match(/viewBox="0 0 (\d+) \d+"/);
  const size = parseInt(viewBoxMatch?.[1] || '0', 10);
  if (!size) return svg;

  // First convert all paths to path elements with full attributes for better control
  const svgDoc = new DOMParser().parseFromString(svg, 'image/svg+xml');
  const paths = Array.from(svgDoc.querySelectorAll('path'));
  
  paths.forEach(path => {
    const d = path.getAttribute('d') || '';
    // Detect if this is a corner or a dot based on the path data
    const isCorner = d.includes('M0,0') || d.includes('M0 0') || 
                    d.includes(`M${size},0`) || d.includes(`M${size} 0`) ||
                    d.includes(`M0,${size}`) || d.includes(`M0 ${size}`) ||
                    d.includes(`M${size},${size}`) || d.includes(`M${size} ${size}`);

    const style = isCorner ? customization.cornerStyle : customization.dotStyle;
    let rx = 0, ry = 0;

    switch (style) {
      case 'rounded':
        // Use smaller radius for dots than corners
        rx = ry = isCorner ? size * 0.15 : size * 0.08;
        break;
      case 'dots':
        // Make dots more circular
        rx = ry = isCorner ? size * 0.25 : size * 0.2;
        break;
      default: // 'square'
        rx = ry = 0;
        break;
    }

    // Apply the style
    path.setAttribute('rx', rx.toString());
    path.setAttribute('ry', ry.toString());
    
    // For dots style, also modify the path shape
    if (style === 'dots') {
      const originalWidth = size * (isCorner ? 0.35 : 0.2);
      const newD = isCorner ? 
        `M${path.getBBox().x},${path.getBBox().y} h${originalWidth} v${originalWidth} h-${originalWidth}Z` :
        d;
      path.setAttribute('d', newD);
    }
  });

  // Return the modified SVG
  return svgDoc.documentElement.outerHTML;
};

export default modifySvgStyles;