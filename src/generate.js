// main
const generate = ctx => {
  const doc = ctx.document;
  const sel = ctx.api().selectedDocument.selectedLayers;
  const lyrStyles = doc.documentData().layerStyles();
  const txtStyles = doc.documentData().layerTextStyles();

  let count = {
    created: 0,
    updated: 0
  };

  if (sel.isEmpty) {
    exit(doc, 'No layer(s) selected!');
  } else {
    iterate(sel, 'isShape', lyrStyles, count);
    iterate(sel, 'isText', txtStyles, count);
    exit(doc, 'Styles Created: ' + count.created + ' / Updated: ' + count.updated);
  }
};

// iterate on selected layers
const iterate = (sel, filter, styles, count) => {
  sel.iterateWithFilter(filter, function (layer) {
    const name = layer.sketchObject.name();
    const style = layer.sketchObject.style();
    const cleanObj = existing(styles);
    const exist = compare(name, cleanObj);

    if (exist) update(style, cleanObj[name], styles, count);
    else create(name, style, styles, count);
  });
};

// creates a decent object for existing styles
const existing = styles => {
  const cleanObj = {};

  for (let i = 0; i < styles.numberOfSharedStyles(); i++) {
    const entry = styles.objects().objectAtIndex(i);
    cleanObj[entry.name()] = entry;
  }

  return cleanObj;
};

// compare layer name to styles object
const compare = (name, styles) => Object.keys(styles).find(x => x == name);

// create new layer style
const create = (name, style, styles, count) => {
  styles.addSharedStyleWithName_firstInstance(name, style);
  count.created++;
};

// update existing layer style, syncronize the instances
const update = (style, pointer, styles, count) => {
  styles.updateValueOfSharedObject_byCopyingInstance(pointer, style);
  styles.synchroniseInstancesOfSharedObject_withInstance(pointer, style);
  count.updated++;
};

// exit and print message
const exit = (doc, msg) => {
  doc.showMessage(msg);
  doc.reloadInspector();
};

export default generate;
