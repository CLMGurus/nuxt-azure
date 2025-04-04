const { loadNuxt } = require("nuxt");

async function start() {
  const nuxt = await loadNuxt("start");
  const port = 8080;
  nuxt.listen(port, "0.0.0.0");
  console.log(`🚀 Server running on port ${port}`);
}

start();
