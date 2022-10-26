const hapi = require("@hapi/hapi");
const server = require("./config/serverconfig.js");
const userSchemaHapi = require("./models/validate/schema/userSchemaHapi.js");
// const {mdb} = require("./config/mongo.js`");
const Joi = require("joi");
const mongoose = require("mongoose");
const mdbUser = require("./models/mdbUser.js");
const boom = require("@hapi/boom");

const mdb = async () =>
  await mongoose
    .connect("mongodb://localhost:27017/demohapi")
    .then(() => console.log("MDB connected"))
    .catch((err) => console.log(err));

const init = async () => {
  server.route({
    method: "get",
    path: "/",
    handler: (request, h) => h.response({ result: true }),
  });

  server.route({
    method: "GET",
    path: "/hello/{name}",
    handler: function (request, h) {
      return `Hello ${request.params.name}!`;
    },
    options: {
      validate: {
        params: Joi.object({
          name: Joi.string().min(3).max(10),
        }),
      },
    },
  });

  server.route({
    method: "POST",
    path: "/post",
    handler: async () => {
      const createdUser = await mdbUser.create(request.payload);
      return createdUser;
    },
    options: {
      validate: {
        payload: userSchemaHapi,
      },
    },
  });

  server.route({
    method: "POST",
    path: "/post2",
    handler: async (request, h) => {
      const createdUser = await mdbUser.create(request.payload);
      return Joi.validate(createdUser, userSchemaHapi);
    },
  });

  await server.start();
  console.log(server.info.uri);
};

mdb().then(init());
