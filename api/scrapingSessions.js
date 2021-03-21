import axios from 'api/base';
import { returnResponseOrError } from './helpers';


function list({scraper}) {
  return axios
    .get('/scraper-sessions', {scraper})
    .then(returnResponseOrError)
    .catch(e => { throw e; });
}


export default {
  list,
};