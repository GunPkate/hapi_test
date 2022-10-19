const hapi = require("@hapi/hapi");

const server = hapi.server({
    port: 3000,
    host: "localhost"
})

module.exports = server;