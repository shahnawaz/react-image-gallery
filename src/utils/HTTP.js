import axios from 'axios';
import config from './../configs/config';

export async function HTTP(method, uri, data, headers = null, params = null) {

  const url = `${config.API_URL}${uri}`.trim();

  let query = {
    method: method,
    url: url
  };

  if (headers !== null) {
    query.headers = headers;
  }

  if(params !== null){
    query.params = params;
  }

  if (method === 'post' || method === 'put' || method === 'delete' || method === 'patch') {
    query.data = data;
  }

  return await axios(query);

}
