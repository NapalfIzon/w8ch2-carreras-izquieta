const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const debug = require("debug")("tuitah:serverIndex");
const tuitRoutes = require("./routes/tuitRoutes");

const app = express();
app.disable("x-powered-by");

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.bgGreen.red(
          `Servidor ejecutado OK y escuchando el puerto ${port} ${"ᕦ( ͡° ͜ʖ ͡°)ᕤ"}`
        )
      );
      resolve(server);
    });

    server.on("error", (error) => {
      debug(
        chalk.bgRed.black(
          `Ha habido un problema inicializando el servidor ಥ╭╮ಥ`
        )
      );
      if (error.code === "EADDRINUSE") {
        debug(chalk.bgRed.black(`El puerto ${port} está en uso ಥ╭╮ಥ`));
      }
      reject();
    });

    server.on("close", () => {
      debug(
        chalk.bgBlue.yellow(
          `Se ha desconectado el servidor correctamente ( ͡° ͜ʖ ͡°)`
        )
      );
    });
  });

app.use(chalk.cyanBright(morgan("dev")));
app.use(cors());
app.use(express.json());

app.use("/tuit", tuitRoutes);

module.exports = initializeServer;
