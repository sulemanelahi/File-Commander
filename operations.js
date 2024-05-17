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

  console.log(`New file ${path} successfully created`);

  newFileHandler.close();
};

const deleteFile = async (path) => {
  await fs.unlink(path);

  console.log(`Deleting ${path}`);
};

const renameFile = async (oldPath, newPath) => {
  await fs.rename(oldPath, newPath);

  console.log(`Renamed ${oldPath} to ${newPath}`);
};

const addContent = async (content, path) => {
  const fileHandler = await fs.open(path, "a");

  fileHandler.write(content);

  console.log(`Added ${content} into ${path}`);

  fileHandler.close();
};

module.exports = {
  createFile,
  readFile,
  deleteFile,
  renameFile,
  addContent,
};
