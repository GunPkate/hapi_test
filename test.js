const hapi = require("@hapi/hapi");

const init = async () => {
  const server = await hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "get",
    path: "/",
    handler: (req, h) => {
      return "Hello";
    },
  });

  

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();