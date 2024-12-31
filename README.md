# CommandControlFS

**CommandControlFS** is a command-driven file management system that allows users to perform file operations such as creating, deleting, renaming, and appending content to files by updating a designated command file. The app continuously monitors this command file for changes and executes the corresponding operations in real-time.

---

## Features

- **Command Monitoring**: Tracks changes in a `command.txt` file to process file operation commands.
- **Supported Operations**:
  - Create a file
  - Delete a file
  - Rename a file
  - Add content to a file
- **Asynchronous Execution**: Built using modern async/await patterns for efficient, non-blocking operations.
- **Error Handling**: Provides informative feedback for errors like missing files or invalid commands.

---

## Requirements

- **Node.js** (version 14 or higher)
- **npm** or **yarn**

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/CommandControlFS.git
   cd CommandControlFS
   ```

---

## Usage

1. **Create the Command File**:  
   Ensure there is a `command.txt` file in the root directory where the application will monitor for commands.

2. **Start the Application**:  
   Run the following command:

   ```bash
   node app.js
   ```

3. **Write Commands**:  
   Update `command.txt` with any of the supported commands. The app will detect the changes and execute the corresponding actions.

---

## Supported Commands

### 1. **Create a File**

```
create a file <file-path>
```

**Example**:

```
create a file ./example.txt
```

### 2. **Delete a File**

```
delete a file <file-path>
```

**Example**:

```
delete a file ./example.txt
```

### 3. **Rename a File**

```
rename the file <old-file-path> to <new-file-path>
```

**Example**:

```
rename the file ./example.txt to ./renamed-example.txt
```

### 4. **Add Content to a File**

```
add to the file <file-path> this content: <content>
```

**Example**:

```
add to the file ./example.txt this content: Hello, World!
```
