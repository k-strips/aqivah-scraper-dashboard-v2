import base from "api/base";
import { returnResponseOrError } from "./helpers";

function list() {
  return base
    .get("/field-types")
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function get(id) {
  return base
    .get(`/field-types/${id}`)
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function create({ label }) {
  return base
    .post("/field-types", { label })
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function update({ label, id }) {
  return base
    .patch(`/field-types/${id}`, { label })
    .then(returnResponseOrError)
    .catch((e) => {
      throw e;
    });
}

function deleteOne(id) {
  return base
    .delete(`/field-types/${id}`)
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
