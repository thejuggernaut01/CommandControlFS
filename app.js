const fs = require('fs/promises');

(async () => {
  // Commands
  const CREATE_FILE = 'create a file';
  const DELETE_FILE = 'delete a file';
  const RENAME_FILE = 'rename the file';
  const ADD_TO_FILE = 'add to the file';

  const checkIfFileExist = async (path) => {
    try {
      const fileHandle = await fs.open(path, 'r');
      await fileHandle.close();
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }
      console.error('An unexpected error occured', error);
    }
  };

  const createFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, 'r');
      existingFileHandle.close();

      return console.log(`The file ${path} already exists.`);
    } catch (error) {
      const newFileHandle = await fs.open(path, 'w');
      console.log('A new file was successfully created.');
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      const fileExist = await checkIfFileExist(path);
      if (!fileExist) {
        return console.log(`The file ${path} does not exist.`);
      }

      console.log(`Deleting ${path}...`);

      const result = await fs.unlink(path);

      if (result === undefined) {
        console.log('File was deleted successfully');
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(`Error: The file ${path} does not exist.`);
      } else {
        console.error(`Error deleting file: ${error.message}`);
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      const fileExist = await checkIfFileExist(oldPath);
      if (!fileExist) {
        return console.log(`The file ${oldPath} does not exist.`);
      }

      console.log(`Rename ${oldPath} to ${newPath}...`);
      const result = await fs.rename(oldPath, newPath);

      if (result === undefined) {
        console.log('File was rename successfully');
      }
    } catch (error) {
      console.error(`Error renaming file: ${error.message}`);
    }
  };

  const addToFile = async (path, content) => {
    try {
      const fileExist = await checkIfFileExist(path);
      if (!fileExist) {
        return console.log(`The file ${path} does not exist.`);
      }

      console.log(`Adding content to file...`);
      const result = await fs.writeFile(path, content);

      if (result === undefined) {
        console.log('Content was added successfully');
      }
    } catch (error) {
      console.error(`Error adding content to file: ${error.message}`);
    }
  };

  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);

    const offset = 0;
    const length = buff.byteLength;
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);

    const command = buff.toString('utf-8');

    // create a file:
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete a file:
    // delete a file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename a file:
    // rename the file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);

      renameFile(oldFilePath, newFilePath);
    }

    // add to file:
    // add to the file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(' this content: ');
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);

      addToFile(filePath, content);
    }
  });

  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
