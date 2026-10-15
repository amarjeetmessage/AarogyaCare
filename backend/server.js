const app = require("./src/app");
const { connectDatabase, port } = require("./src/config");

async function start() {
  await connectDatabase();
  app.listen(port, () => console.log(`AarogyaCare API listening on ${port}`));
}

if (require.main === module) {
  start().catch((error) => { console.error("Database connection failed", error.message); process.exit(1); });
}

module.exports = app;
