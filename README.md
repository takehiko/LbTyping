# Learning by Typing (LbTyping)

LbTyping is a web application for "learning programming by typing", which is also known as "shakyo-style learning" in Japan.

## How to run

```sh
git clone https://github.com/takehiko/LbTyping.git
cd LbTyping/server
docker-compose build
docker-compose up -d
```

Access http&#58;//hostname (or localhost):21337/top.html in your browser.

## How to use

On the top page, type in the appropriate student number and then press the "Set" button. You will be able to move to the question choice screen. Choose one question there, and you will be taken to the typing screen.

A few lines of program code that should be typed are displayed in a lighter color. As you type correctly in sequence, the characters change the color. Mistakes are also displayed in red, and you must delete them by pressing the backspace key. When you have typed everything, the typing time and the number of erroneous types are displayed. At the same time, the system records which key was pressed in how many milliseconds for each character and stores it in the database.

![Scene 1: start](https://user-images.githubusercontent.com/57928/113510678-ee440400-9596-11eb-9fa5-65d0ab3a7b31.png)

![Scene 2: missed](https://user-images.githubusercontent.com/57928/113510685-f56b1200-9596-11eb-8775-92b97a3e92ac.png)

![Scene 3: corrected](https://user-images.githubusercontent.com/57928/113510687-f7cd6c00-9596-11eb-95a5-28c5ddd9a5f6.png)

![Scene 4: completed](https://user-images.githubusercontent.com/57928/113510690-f9972f80-9596-11eb-9396-07fc337ca52d.png)

Program codes are pre-registered. These are 17 programs written in C language, which were typed by students in a class for first-year students of the Faculty of Systems Engineering, Wakayama University. In the future, we will incorporate a mechanism for easy registration from program files.

Docker Compose is used for the system execution. It works even if the client and server compute on different machines (The server needs Docker Compose, and the client only needs a browser.) or the same (i.e. standalone). You can edit docker-compose.yml to preserve the typing data stored in the database.

## Acknowledgment

This work was supported by JSPS KAKENHI Grant Number [19K12267](https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-19K12267/).

The students of Murakawa Lab. in Wakayama University assisted in the system development and prepared the program code with their explanations.
