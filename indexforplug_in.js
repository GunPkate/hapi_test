const server = require("./config/serverconfig.js");
const mongoose = require("mongoose");

const mdb = async () =>
  await mongoose
    .connect("mongodb://localhost:27017/demohapi")
    .then(() => console.log("MDB connected"))
    .catch((err) => console.log(err));

const init = async () => {
  // call from router (plugin)
  await server.register({
    plugin: require("hapi-geo-locate"),
  });
  await server.register({
    plugin: require("./routes/test.js"),
  });

  await server.start();
  console.log(server.info.uri);
};

mdb().then(init());
