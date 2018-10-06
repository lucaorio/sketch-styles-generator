import sketch from "sketch";
import * as R from "ramda";

const generate = () => {
  const document = sketch.getSelectedDocument();
  const layerStyles = document.getSharedLayerStyles();
  const textStyles = document.getSharedTextStyles();
  const selection = document.selectedLayers;
  const layers = selection.layers;
  const count = { created: 0, updated: 0 };

  if (selection.isEmpty) {
    sketch.UI.message("No layer(s) selected!");
  } else {
    R.forEachObjIndexed((layers, type) => {
      const sharedStyles = type == "ShapePath" ? layerStyles : textStyles;

      layers.forEach(layer => {
        const sharedStyleIdx = exist(layer.name, sharedStyles);

        if (sharedStyleIdx == -1) {
          create(document, layer);
          count.created++;
        } else {
          update(sharedStyles, sharedStyles[sharedStyleIdx], layer);
          count.updated++;
        }
      });
    }, groupType(layers));

    sketch.UI.message(
      `Styles Created: ${count.created} / Updated: ${count.updated}`
    );
  }
};

// create shared styles
const create = (document, layer) => {
  const sharedStyle = sketch.SharedStyle.fromStyle({
    name: layer.name,
    style: layer.style,
    document: document
  });

  layer.sharedStyle = sharedStyle;
};

// update shared styles, and sync instances
const update = (sharedStyles, sharedStyle, layer) => {
  layer.sharedStyle.style = layer.style;

  R.map(layer => {
    if (layer.style.isOutOfSyncWithSharedStyle(sharedStyle)) {
      layer.style.syncWithSharedStyle(sharedStyle);
    }
  }, sharedStyle.getAllInstancesLayers());
};

// group layers by type
const groupType = R.groupBy(layer => layer.type);

// check existence of shared style w/ same name
const exist = (name, sharedStyles) =>
  R.findIndex(R.propEq("name", name))(sharedStyles);

export default generate;
