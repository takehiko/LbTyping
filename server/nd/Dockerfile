FROM node:12-alpine
LABEL maintainer="takehiko@wakayama-u.ac.jp"

ENV LANG="ja_JP.UTF-8" LANGUAGE="ja_JP:ja" LC_ALL="ja_JP.UTF-8"
EXPOSE 1337
WORKDIR /root

RUN npm install pg \
    && npm install nodemon -g \
    && npm install express \
    && npm install xlsx

RUN mkdir user srcimg response register
ADD ["https://unpkg.com/axios/dist/axios.min.js", "/root/user/axios.min.js"]
COPY ["httpd.js", "db.html", "/root/"]
COPY ["user/choice.html", "user/result.html", "user/top.html", "user/typing.html", "user/commentary.html", "user/performance.html", "/root/user/"]
COPY ["user/replay-q.html", "user/replay-c.html", "user/replay1.html", "user/replay2.html", "/root/user/"]
COPY ["register/register.html","/root/register"]

ARG DISPLAY_RANK
RUN sed -ie "s/const flag_display_rank = .*/const flag_display_rank = ${DISPLAY_RANK:-true};/" /root/user/result.html && echo flag_display_rank = ${DISPLAY_RANK:-true} in result.html
ARG ENABLE_REPLAY
RUN sed -ie "s/const flag_enable_replay = .*/const flag_enable_replay = ${ENABLE_REPLAY:-true};/" /root/user/top.html && echo flag_enable_replay = ${ENABLE_REPLAY:-true} in result.html
ARG ENABLE_PERFORMANCE
RUN sed -ie "s/const flag_enable_performance = .*/const flag_enable_performance = ${ENABLE_PERFORMANCE:-true};/" /root/user/choice.html && echo flag_enable_performance = ${ENABLE_PERFORMANCE:-true} in choice.html
ARG DISPLAY_RETRY
RUN sed -ie "s/const flag_display_retry = .*/const flag_display_retry = ${DISPLAY_RETRY:-true};/" /root/user/commentary.html && echo flag_display_retry = ${DISPLAY_RETRY:-true} in commentary.html

CMD ["nodemon", "httpd.js"]
