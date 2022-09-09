# ビルド時の環境変数について

* `docker compose build --build-arg KEEP_IP2A2020=1` によりビルドを行うと、2020年度の6問をタイプできるようデータベースに登録します。
* `docker compose build --build-arg KEEP_JAVA=1` によりビルドを行うと、Javaの3問をタイプできるようデータベースに登録します。
* `docker compose build --build-arg DELETE_IP2A2021=1` によりビルドを行うと、2021年度の授業で使用した17問をデータベースに登録しません。
* `docker compose build --build-arg DISPLAY_RANK=false` によりビルドを行うと、結果ページ（result.html）でランク表示を行いません。
* `docker compose build --build-arg ENABLE_REPLAY=false` によりビルドを行うと、トップページ（top.html）からリプレイ問題選択ページへのリンクを表示しません。
* `docker compose build --build-arg ENABLE_PERFORMANCE=false` によりビルドを行うと、問題選択ページ（top.html）から実績確認ページへのリンクを表示しません。
* `docker compose build --build-arg DISPLAY_RETRY=false` によりビルドを行うと、解説ページ（commentary.html）で1回しか実施していないときに「もう1回」を促すメッセージとボタンを表示しません。
* 複数指定は、`docker compose build --build-arg KEEP_JAVA=1 --build-arg KEEP_JAVA=1 --build-arg DISPLAY_RETRY=true` のように、その都度 `--display-arg` オプションを指定してください。
