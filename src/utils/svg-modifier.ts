import type { QRCodeCustomization } from '@/types/qr-code';

export function modifySvgStyles(svg: string, customization?: QRCodeCustomization): string {
  if (!customization?.cornerStyle && !customization?.dotStyle) {
    return svg;
  }

  // Helper function to create SVG path for rounded rectangles
  const createRoundedRectPath = (x: number, y: number, width: number, height: number, radius: number): string => {
    return `M${x},${y + radius}` +
           `a${radius},${radius} 0 0,1 ${radius},-${radius}` +
           `h${width - 2 * radius}` +
           `a${radius},${radius} 0 0,1 ${radius},${radius}` +
           `v${height - 2 * radius}` +
           `a${radius},${radius} 0 0,1 -${radius},${radius}` +
           `h-${width - 2 * radius}` +
           `a${radius},${radius} 0 0,1 -${radius},-${radius}z`;
  };

  // Helper function to create SVG path for dots (circles)
  const createDotPath = (x: number, y: number, size: number): string => {
    const radius = size / 2;
    const cx = x + radius;
    const cy = y + radius;
    return `M${cx},${cy} m-${radius},0 a${radius},${radius} 0 1,0 ${size},0 a${radius},${radius} 0 1,0 -${size},0`;
  };

  // Find the module size by analyzing the first path
  const moduleSize = parseInt((svg.match(/h(\d+)v\1/) || ['', '1'])[1]) || 1;
  const finderPatternSize = moduleSize * 7; // Finder patterns are 7x7 modules

  // Transform SVG paths
  const transformedSvg = svg.replace(/<path[^>]*\sd="([^"]+)"[^>]*>/g, (pathStr) => {
    const dAttr = pathStr.match(/d="([^"]+)"/)?.[1] || '';
    const fillAttr = pathStr.match(/fill="([^"]+)"/)?.[1] || '#000000';
    
    // Parse the path coordinates
    const moveMatch = dAttr.match(/M(\d+)\s+(\d+)/);
    if (!moveMatch) return pathStr;

    const x = parseInt(moveMatch[1]);
    const y = parseInt(moveMatch[2]);
    const pathSize = parseInt((dAttr.match(/h(\d+)/) || ['', '0'])[1]) || moduleSize;

    // Identify if this is a finder pattern component
    const isFinderPattern = pathSize === finderPatternSize ||
                          (x === 0 && y === 0) ||
                          (x === 0 && y === (33 * moduleSize)) ||
                          (x === (33 * moduleSize) && y === 0);

    let newD: string;
    if (isFinderPattern && customization?.cornerStyle !== 'square') {
      switch (customization?.cornerStyle) {
        case 'rounded':
          newD = createRoundedRectPath(x, y, pathSize, pathSize, moduleSize);
          break;
        case 'dots':
          newD = createDotPath(x, y, pathSize);
          break;
        default:
          newD = dAttr;
      }
    } else if (!isFinderPattern && customization?.dotStyle !== 'square') {
      switch (customization?.dotStyle) {
        case 'rounded':
          newD = createRoundedRectPath(x, y, pathSize, pathSize, moduleSize / 2);
          break;
        case 'dots':
          newD = createDotPath(x, y, pathSize);
          break;
        default:
          newD = dAttr;
      }
    } else {
      newD = dAttr;
    }

    return `<path d="${newD}" fill="${fillAttr}"/>`;
  });

  return transformedSvg;
}