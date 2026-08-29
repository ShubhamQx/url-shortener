import "dotenv/config"

import app from "./app";
import { checkDBStatus } from "./db";

const PORT = process.env.PORT || 5000;

const startServer = async () => { 
  await checkDBStatus();
  app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
