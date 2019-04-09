// get a shared style by specifying its name
export default (sharedStyles, name) =>
  sharedStyles.filter(style => style.name === name)[0];
