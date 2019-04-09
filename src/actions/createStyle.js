// create new (text/layer) shared style
import syncLayerToShared from './syncLayerToShared';
export default (sharedStyles, layer) => {
  sharedStyles.push({ name: layer.name, style: layer.style });
  const sharedStyle = [...sharedStyles].pop();
  syncLayerToShared(sharedStyle, layer);
};
