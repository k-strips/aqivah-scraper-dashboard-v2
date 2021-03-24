const { default: base } = require("./base");
const { returnResponseOrError } = require("./helpers");


function list() {
  return base
    .get('/fields')
    .then(returnResponseOrError)
    .catch(e => { throw e; });
}

export default {
  list,
}