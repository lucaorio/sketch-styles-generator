// return an array with just shape, or text layers
import isShape from './isShape';
import isText from './isText';
export default layers =>
  layers.filter(layer => isShape(layer) || isText(layer));
