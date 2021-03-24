import base from 'api/base';
import { returnResponseOrError } from './helpers';


function list() {
  return base
    .get('/field-types')
    .then(returnResponseOrError)
    .catch(e => { throw e; });
}

export default {
  list,
}