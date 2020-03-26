const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': true
    }
  });

  const responseBody = await response.json();
  responseBody.status = response.status;
  return responseBody;
}

const postData = async (url, body, contentType) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': true
    },
    body: body
  });

  const responseBody = await response.json();
  responseBody.status = response.status;
  return responseBody;
}

const updateData = async (url, body, contentType) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': true
    },
    body: body
  });

  const responseBody = await response.json();
  responseBody.status = response.status;
  return responseBody;
}

export {
  getData,
  postData,
  updateData
}