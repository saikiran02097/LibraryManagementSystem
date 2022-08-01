export const getAPICall = async (url) => {
  // return new Promise((resolve, reject) => resolve());
  const prom = await fetch(`${url}`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then((res) =>
    res.json()
  );
  //   const prom = await fetch(`http://localhost:8080${url}`).then(res => res.json());
  return prom;
};

export const postAPICall = async (url, payload) => {
  return new Promise((resolve, reject) => resolve());
  const prom = await fetch(`http://localhost:8080${url}`, {
    method: "post",
    body: payload,
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then((res) => res.json());
  return prom;
};

export default {
  getAPICall,
  postAPICall,
};
