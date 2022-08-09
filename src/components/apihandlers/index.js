export const getAPICall = async (url) => {
  return new Promise((resolve, reject) => resolve());
  const prom = await fetch(url, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return response.json();
  }
  );
  return prom;
};

export const postAPICall = async (url, payload) => {
  return new Promise((resolve, reject) => resolve());
  const prom = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json'
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return response.json();
  }
  );
  return prom;
};

export default {
  getAPICall,
  postAPICall,
};
