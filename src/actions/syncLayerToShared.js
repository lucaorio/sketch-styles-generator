// sync layer style with shared style
export default (sharedStyle, layer) => {
  layer.sharedStyle = sharedStyle;
  layer.style.syncWithSharedStyle(sharedStyle);
};
