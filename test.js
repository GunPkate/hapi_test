// const hapi = require("@hapi/hapi");

// const init = async () => {
//   const server = await hapi.server({
//     port: 3000,
//     host: "localhost",
//   });

//   server.route({
//     method: "get",
//     path: "/",
//     handler: (req, h) => {
//       return "Hello";
//     },
//   });

//   await server.start();
//   console.log("Server running on %s", server.info.uri);
// };

// process.on("unhandledRejection", (err) => {
//   console.log(err);
//   process.exit(1);
// });

// init();

const a = setTimeout(() => {
  console.log("A");
}, 2000);
const b = setTimeout(() => {
  console.log("B");
}, 1000);

const c = new Promise((resolve, reject) => {
  resolve();
});
c.then(a).then(b);
