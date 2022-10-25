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
  await server.register({
    plugin: require("hapi-geo-locate"),
    options: {
      enableByDefault: true,
    },
  });

  server.route({
    method: "get",
    path: "/location",
    handler: (request, h) => {
      console.log(request);
      return request.location;
    },
  });

  await server.start();
  console.log(server.info.uri);
};

mdb().then(init());
