const fs = require("fs/promises");
const {
  CREATE_A_FILE,
  DELETE_THE_FILE,
  RENAME_THE_FILE,
  ADD_TO_THE_FILE,
} = require("./constant.js");
const { readFile } = require("./operations");

(async () => {
  // watcher for command file changes
  const watcher = fs.watch("./command.txt");

  // file descriptors for command file (<FileHandle> objects)
  // <FileHandle> inherits from <EventEmitter>
  const commandFileHandler = await fs.open("./command.txt", "r");

  // observer
  commandFileHandler.on("change", async () => {
    try {
      const command = await readFile(commandFileHandler);

      if (command.includes(CREATE_A_FILE)) {
        const path = command.substring(CREATE_A_FILE.length + 1);

        // await createFile(path);
      }

      if (command.includes(DELETE_THE_FILE)) {
        console.log("deleted file");
      }

      if (command.includes(RENAME_THE_FILE)) {
        console.log("deleted file");
      }
      if (command.includes(ADD_TO_THE_FILE)) {
        console.log("deleted file");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  });

  // watcher checking for eventType of change
  for await (const event of watcher) {
    if (event.eventType === "change") {
      // observable
      commandFileHandler.emit("change");
    }
  }
})();
