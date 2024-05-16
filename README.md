# File-Commander
This Node.js application allows you to define file system operations within a text file and automatically execute them based on the specified instructions.

##  Getting Started

1. Inside the `command.txt` file, write instructions in the following format (one instruction per line):

    - `create a file <PATH>`: Creates a new file with the specified `path`.
    - `delete the file <PATH>`: Deletes the file at the provided `path`.
    - `rename the file <OLD-PATH> to <NEW-PATH>`: Rename the file from `oldPath` into `newPath`.
    - `add to the file <PATH> this content <CONTENT>`: Add content to the provided path file.

3. Run the application using `node app.js`.

**Example :**

create a file /home/personal/diary.txt
delete the file /home/personal/diary.txt
rename the file /home/personal/diary.txt /home/personal/book.txt 
add to the file /home/personal/diary.txt Hello, world! 


## ⚙️ Features

- Simple and intuitive instruction format for defining file operations.
- Automatic execution of instructions in the running application.

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

This tool was created to streamline file system management based on pre-defined instructions in a text file.

##  Author

Suleman Elahi