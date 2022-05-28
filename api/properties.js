import base from 'api/base';
import { returnResponseOrError } from './helpers';


function get(id) {
  return base
    .get(`/properties/${id}`)
    .then(returnResponseOrError)
    .catch(e => { throw e; });
}

export default {
  get,
}