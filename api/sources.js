import base from "api/base";
import { returnResponseOrError } from "./helpers";

function list(page = 1) {
  return base
    .get(`/sources?page=${page}`)
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function create({ source, fields }) {
  return base
    .post("/sources", { ...source, sourceFields: fields })
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function get(id) {
  return base
    .get(`/sources/${id}`)
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function update({ id, source, fields }) {
  return base
    .patch(`/sources/${id}`, { ...source, sourceFields: fields })
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function remove(id) {
  return base
    .delete(`/sources/${id}`)
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

export default {
  list,
  create,
  get,
  update,
  remove,
};
