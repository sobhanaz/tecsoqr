const modifySvgStyles = (
  svg: string,
  customization?: { cornerStyle?: 'square' | 'rounded' | 'dots'; dotStyle?: 'square' | 'rounded' | 'dots' }
) => {
  if (!customization?.cornerStyle && !customization?.dotStyle) return svg;
  const size = parseInt(svg.match(/h(\d+)/)?.[1] || '1', 10);
  const r = size / (customization.cornerStyle === 'dots' || customization.dotStyle === 'dots' ? 2 : 4);
  return svg.replace(/<path/g, `<path rx="${r}" ry="${r}"`);
};

export default modifySvgStyles;