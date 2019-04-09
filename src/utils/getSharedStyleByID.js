// get a shared style by specifying its ID
export default (sharedStyles, id) =>
  sharedStyles.filter(style => style.id === id)[0];
