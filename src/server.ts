const { app } = require("./app");
const PORT = 3001;

try {
  app.listen(PORT, () => {
    console.log(`queque server running at: http://localhost:${PORT}/`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
