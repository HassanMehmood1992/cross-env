const sa = require("superagent");

const createURL = function(path, source) {
  if (source === "backend") {
    return process.env.API_SERVER + path;
  }
};
module.exports = (
  path,
  {
    req = null,
    from = "backend",
    method = "GET",
    data = null,
    query = null,
    fields = null,
    attachments = null,
    headers = {},
    token = null
  } = {}
) => {
  const request = sa(method, createURL(path, from));
};
