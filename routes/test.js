const mdbUser = require("../models/mdbUser.js");
const userSchemaHapi = require("../models/validate/schema/userSchemaHapi.js");

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
        // return h.response(find).code(220);
      },
    });

    server.route({
      method: "POST",
      path: "/useradd",
      handler: async (request, h) => {
        const createdUser = await mdbUser.create(request.payload);
        return createdUser;
      },
      options: {
        validate: {
          payload: userSchemaHapi,
        },
      },
    });
  },
};

module.exports = testPlugin;
