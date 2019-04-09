import sketch from 'sketch';
import createStyle from './actions/createStyle';
import syncLayerToShared from './actions/syncLayerToShared';
import syncSharedToLayer from './actions/syncSharedToLayer';
import renameSharedStyle from './actions/renameSharedStyle';
import cleanArray from './utils/cleanArray';
import isShape from './utils/isShape';
import isUnsynced from './utils/isUnsynced';
import getSharedStyleByID from './utils/getSharedStyleByID';
import getSharedStyleByName from './utils/getSharedStyleByName';

// main constants definition, and selection check
const generate = () => {
  const document = sketch.getSelectedDocument();
  const selection = document.selectedLayers;
  const layers = cleanArray(selection.layers);

  const counter = {
    created: 0,
    applied: 0,
    renamed: 0,
    synced: 0,
    syncedrenamed: 0
  };

  if (selection.isEmpty || !layers.length) {
    sketch.UI.message('No applicable layer(s) selected!');
  } else {
    const layerStyles = document.sharedLayerStyles;
    const textStyles = document.sharedTextStyles;

    for (let layer of layers) {
      const sharedStyles = isShape(layer) ? layerStyles : textStyles;
      const styled = getSharedStyleByID(sharedStyles, layer.sharedStyleId);
      const matched = getSharedStyleByName(sharedStyles, layer.name);
      const unsynced = isUnsynced(sharedStyles, styled, layer);

      // no shared style / no sync / no matching name
      if (!styled && !unsynced && !matched) {
        createStyle(sharedStyles, layer);
        counter.created++;
      }

      // no shared style / no sync / yes matching name
      else if (!styled && !unsynced && matched) {
        syncLayerToShared(matched, layer);
        counter.applied++;
      }

      // yes shared style / yes sync / no matching name
      else if (styled && !unsynced && !matched) {
        renameSharedStyle(styled, layer);
        counter.renamed++;
      }

      // yes shared style / no sync / yes matching name
      else if (styled && unsynced && matched) {
        syncSharedToLayer(unsynced, layer);
        counter.synced++;
      }

      // yes shared style / no sync / no matching name
      else if (styled && unsynced && !matched) {
        syncSharedToLayer(unsynced, layer);
        renameSharedStyle(unsynced, layer);
        counter.syncedrenamed++;
      }
    }

    // log the counter
    sketch.UI.alert(
      'Shared Styles Recap',
      `
      - Created: ${counter.created}\n
      - Applied: ${counter.applied}\n
      - Renamed: ${counter.renamed}\n
      - Synced: ${counter.synced}\n
      - Renamed & Synced: ${counter.syncedrenamed}
      `
    );
  }
};

export default generate;
