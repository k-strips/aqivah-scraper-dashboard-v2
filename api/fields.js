const { default: base } = require("./base");
const { returnResponseOrError } = require("./helpers");

function list({ required } = {}, limit) {
  return base
    .get(`/fields?limit=${limit}`, { required })
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function get(id) {
  return base
    .get(`/fields/${id}`)
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function create({ label, isRequired, isAqivahField }) {
  return base
    .post("/fields", { label, isRequired, isAqivahField })
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function update({ label, isRequired, isAqivahField, id }) {
  return base
    .patch(`/fields/${id}`, { label, isRequired, isAqivahField })
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function deleteOne(id) {
  return base
    .delete(`/fields/${id}`)
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

export default {
  list,
  get,
  create,
  update,
  deleteOne,
};
