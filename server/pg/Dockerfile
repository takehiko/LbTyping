FROM postgres:11-alpine
LABEL maintainer="takehiko@wakayama-u.ac.jp"
ENV LANG="ja_JP.UTF-8" LANGUAGE="ja_JP:ja" LC_ALL="ja_JP.UTF-8"
EXPOSE 5432
WORKDIR /root
ADD ["sql/0000create.sql", "sql/0040ip2a2022.sql", "/docker-entrypoint-initdb.d/"]
ADD [".psqlrc", "/root/"]
