const fs = require("fs/promises");

const readFile = async (commandFileHandler) => {
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
  const command = buffer.toString("utf-8");

  return command;
};

const createFile = async (path) => {
  const isExist = await fs
    .stat(path)
    .then(() => true)
    .catch(() => false);

  if (isExist) {
    throw new Error(`File ${path} already exists`);
  }

  const newFileHandler = await fs.open(path, "w");

  newFileHandler.close();
};

module.exports = {
  createFile,
  readFile,
};
