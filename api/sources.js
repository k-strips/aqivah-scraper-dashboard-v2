import base from 'api/base';
import { returnResponseOrError } from './helpers';


function list() {
  return base
    .get('/sources')
    .then(returnResponseOrError)
    .catch(e => { throw e; });
}


export default {
  list,
}