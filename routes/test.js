const mdbUser = require("../models/mdbUser.js");

("use strict");
const plugin_name = "test";
const plugin_version = "1.0.0";

const testPlugin = {
  name: plugin_name,
  version: plugin_version,
  register: async function (server, options) {
    await server.route({
      method: "get",
      path: "/location",
      handler: (request, h) => {
        console.log(request);
        return request.location;
      },
    });

    await server.route({
      method: "get",
      path: "/user",
      handler: async (request, h) => {
        const find = await mdbUser.find();
        return find;
      },
    });
  },
};

module.exports = testPlugin;
