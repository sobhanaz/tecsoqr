import type { QRCodeCustomization } from '@/types/qr-code';

export function modifySvgStyles(svg: string, customization?: QRCodeCustomization): string {
  if (!customization?.cornerStyle && !customization?.dotStyle) {
    return svg;
  }

  // Parse the SVG string to extract paths and apply modifications
  const transformPath = (pathD: string, isCorner: boolean): string => {
    // Extract the path commands (M = move to, h = horizontal line, v = vertical line, z = close path)
    const match = pathD.match(/M(\d+)\s+(\d+)h(\d+)v(\d+)H(\d+)z/);
    if (!match) return pathD;

    const [, x, y, width, height] = match.map(Number);
    
    // Determine if this is a corner finder pattern based on size and position
    const size = Math.max(width, height);
    const cornerSize = 7; // Standard size for QR code corner patterns
    const isFinderPattern = size === cornerSize;
    
    if (isFinderPattern && customization?.cornerStyle) {
      // Apply corner style
      switch (customization.cornerStyle) {
        case 'rounded':
          return `M${x} ${y + 1}q0 -1 1 -1h${width - 2}q1 0 1 1v${height - 2}q0 1 -1 1h${width - 2}q-1 0 -1 -1z`;
        case 'dots':
          const cx = x + width / 2;
          const cy = y + height / 2;
          const r = width / 2;
          return `M${cx} ${cy}m-${r} 0a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 -${r * 2} 0z`;
        default:
          return pathD;
      }
    } else if (!isFinderPattern && customization?.dotStyle) {
      // Apply dot style to regular modules
      switch (customization.dotStyle) {
        case 'rounded':
          return `M${x} ${y + 0.5}q0 -0.5 0.5 -0.5h${width - 1}q0.5 0 0.5 0.5v${height - 1}q0 0.5 -0.5 0.5h${width - 1}q-0.5 0 -0.5 -0.5z`;
        case 'dots':
          const cx = x + width / 2;
          const cy = y + height / 2;
          const r = Math.min(width, height) / 2;
          return `M${cx} ${cy}m-${r} 0a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 -${r * 2} 0z`;
        default:
          return pathD;
      }
    }
    return pathD;
  };

  // Process the SVG string using regex to find and replace path data
  return svg.replace(/<path[^>]*\sd="([^"]+)"[^>]*>/g, (match, pathD) => {
    const isCorner = pathD.includes('M0 0') || pathD.includes('M0 33') || pathD.includes('M33 0');
    const newPathD = transformPath(pathD, isCorner);
    return match.replace(pathD, newPathD);
  });
}