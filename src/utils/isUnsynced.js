// check if a layer is out of sync with the main shared style (and return it)
export default (sharedStyles, styled, layer) => {
  const unsynced = styled && layer.style.isOutOfSyncWithSharedStyle(styled);
  return unsynced ? styled : false;
};
