const express = require('express')
const router = express.Router()
const axios = require('axios');
const proxyUrl = process.env.PROXY_URL;

// Handle POST requests
router.post('/*', (req, res) => {
  // Prepare request headers.
  cleanHeaders(req);

  // Proxy with Axios
  axios({
    method: 'post',
    url: proxyUrl + req.url,
    data: req.body,
    headers: req.headers,
  })
  .then((axiosRes) => {
    console.log(axiosRes);
    respHandler(res, axiosRes.status,axiosRes.data);
  })
  .catch((err) => {
    errorHandler(err, res);
  });
  
});

// Handle GET requests
router.get('/*', (req, res) => {
  // Prepare request headers.
  cleanHeaders(req);

  // Proxy with Axios
  axios({
    method: 'get',
    url: proxyUrl + req.url,
    data: req.body,
    headers: req.headers,
  })
  .then((axiosRes) => {
    console.log(axiosRes);
    respHandler(res, axiosRes.status, axiosRes.data);
  })
  .catch((err) => {
    errorHandler(err, res);
  });
})

/**
 * 
 * @param {object} res 
 * @param {int} status Response status code
 * @param {string} data Response body content
 */
let respHandler = (res, status, data) => {
  res.status(status).send(data);
}

/**
 * Handle errors from Axios.
 * @param {object} err Axios error object.
 */
let errorHandler = (err, res) => {
  if (err.response) {
    respHandler(res, err.response.status, err.response.data, err.response.headers);
  } else if (error.request) {
    respHandler(res, err.request.status, err.request.data, err.request.headers);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', err.message);
    respHandler(res, '503', 'Something went wrong in the proxy. Contact ps@pantheon.io');
  }
  console.log(err.config);
}

/**
 * Clean up headers for proxy request.
 * @param {object} req Express request object.
 */
let cleanHeaders = (req) => {
  // Remove all headers.
  for (header in req.headers) {
    if (header !== "ens-auth-token") {
      delete req.headers[header];
    }
  }
  // Overwrite content-type for ENS.
  req.headers['Content-Type'] = 'application/json';
}

module.exports = router
