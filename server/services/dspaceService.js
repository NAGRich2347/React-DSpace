const axios = require('axios');
const { DSPACE_BASE_URL, DSPACE_USER, DSPACE_PASS } = process.env;
let cookieJar = null;

// Authenticate and store session cookie
async function authenticate() {
  const resp = await axios.post(`${DSPACE_BASE_URL}/rest/login`, { email: DSPACE_USER, password: DSPACE_PASS });
  cookieJar = resp.headers['set-cookie'];
}

async function ensureAuth() {
  if (!cookieJar) await authenticate();
}

exports.uploadFile = async ({ fileData, filename }) => {
  await ensureAuth();
  const resp = await axios.post(
    `${DSPACE_BASE_URL}/rest/bitstreams?name=${encodeURIComponent(filename)}`,
    fileData,
    { headers: { 'Content-Type': 'application/octet-stream', Cookie: cookieJar } }
  );
  return resp.data;
};

exports.addMetadata = async (id, metadata) => {
  await ensureAuth();
  return axios.put(
    `${DSPACE_BASE_URL}/rest/collections/${id}/metadata`, metadata,
    { headers: { Cookie: cookieJar } }
  );
};

exports.getSubmission = async (id) => {
  await ensureAuth();
  const resp = await axios.get(`${DSPACE_BASE_URL}/rest/collections/${id}`, { headers: { Cookie: cookieJar } });
  return resp.data;
};

exports.publish = async (id) => {
  await ensureAuth();
  return axios.post(`${DSPACE_BASE_URL}/rest/collections/${id}/items`);
};