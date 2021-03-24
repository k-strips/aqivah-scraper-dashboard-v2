import base from 'api/base';
import { returnResponseOrError } from './helpers';


function list() {
  return base
    .get('/field-types')
    .then(returnResponseOrError)
    .catch(e => { throw e; });
}

function create({ label }) {
  return base
    .post('/field-types', { label })
    .then(returnResponseOrError)
    .catch(e => { throw e; });
}

export default {
  list,
  create,
};