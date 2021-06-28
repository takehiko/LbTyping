FROM node:12-alpine
LABEL maintainer="takehiko@wakayama-u.ac.jp"

ENV LANG="ja_JP.UTF-8" LANGUAGE="ja_JP:ja" LC_ALL="ja_JP.UTF-8"
EXPOSE 1337
WORKDIR /root

RUN npm install pg \
    && npm install nodemon -g \
    && npm install express

RUN mkdir user srcimg
COPY ["httpd.js", "db.html","question_register.html", "/root/"]
COPY ["user/choice.html", "user/result.html", "user/top.html", "user/typing.html", "user/commentary.html", "/root/user/"]
ADD ["https://unpkg.com/axios/dist/axios.min.js", "/root/user/axios.min.js"]

CMD ["nodemon", "httpd.js"]
