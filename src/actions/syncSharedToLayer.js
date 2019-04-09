// sync shared style with layer style, and update all instances
export default (sharedStyle, layer) => {
  sharedStyle.style = layer.style;
  const layers = sharedStyle.getAllInstancesLayers();
  for (let layer of layers) layer.style.syncWithSharedStyle(sharedStyle);
};
