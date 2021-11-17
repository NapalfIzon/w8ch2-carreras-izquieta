const initializeServer = require("./server");

require("dotenv").config();

const port = process.env.PORT || process.env.LOCAL_PORT || 8000;

(async () => {
  await initializeServer(port);
})();
