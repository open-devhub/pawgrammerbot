import path from "path";
import { fileURLToPath, pathToFileURL } from "url"; // Added pathToFileURL
import getAllFiles from "../utils/getAllFiles.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    let eventFiles = getAllFiles(eventFolder);
    eventFiles.sort();

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        // Wrap the path in pathToFileURL().href to fix the Windows ESM bug
        const eventFunction = await import(pathToFileURL(eventFile).href);
        await eventFunction.default(client, arg);
      }
    });
  }
};