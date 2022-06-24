FROM postgres:11-alpine
LABEL maintainer="takehiko@wakayama-u.ac.jp"
ENV LANG="ja_JP.UTF-8" LANGUAGE="ja_JP:ja" LC_ALL="ja_JP.UTF-8"
EXPOSE 5432
WORKDIR /root
ADD ["sql/*.sql", "/docker-entrypoint-initdb.d/"]
ARG KEEP_IP2A2020
ARG KEEP_JAVA
ARG DELETE_IP2A2021
RUN if [ "${KEEP_IP2A2020:-0}" = "0" ]; then rm /docker-entrypoint-initdb.d/0010ip2a2020.sql; echo detele 0010ip2a2020.sql; sleep 3; fi
RUN if [ "${KEEP_JAVA:-0}" = "0" ]; then rm /docker-entrypoint-initdb.d/0020java.sql; echo delete 0020java.sql; sleep 3; fi
RUN if [ "${DELETE_IP2A2021:-0}" = "1" ]; then rm /docker-entrypoint-initdb.d/0030ip2a2021.sql; echo delete 0030ip2a2021.sql; sleep 3; fi
