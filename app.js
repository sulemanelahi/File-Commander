const fs = require("fs/promises");

(async () => {
  // watcher for command file changes
  const watcher = fs.watch("./command.txt");

  // file descriptors for command file (<FileHandle> objects)
	// <FileHandle> inherits from <EventEmitter>
  const commandFileHandler = await fs.open("./command.txt", "r");

  // observer
  commandFileHandler.on("change", async () => {
    try {
      // file size
      const sizeOfFile = (await commandFileHandler.stat()).size;
      // allocate buffer based on file size
      const buffer = Buffer.alloc(sizeOfFile);
      // location where start filling buffer
      const offset = 0;
      // how many bytes we want to read from memory
      const length = buffer.byteLength;
      // the position where we want to start reading from memory (file position)
      const position = 0;

      // write the file contents to the buffer based on the provided arguments
      await commandFileHandler.read(buffer, offset, length, position);

			// decoding buffer based on utf8 encoding
      const content = buffer.toString("utf-8");

      console.log(content);
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
