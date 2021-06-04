# Learning by Typing (LbTyping)

「写経型学習（写経型プログラミング）」のためのWebアプリケーションです。

## 動かすには

```sh
git clone https://github.com/takehiko/LbTyping.git
cd LbTyping/server
docker-compose build
docker-compose up -d
```

ブラウザで、http&#58;//ホスト名（またはlocalhost）:21337/top.htmlにアクセスしてください。

## 使い方など

トップページでは、学籍番号として適当な数字を打ち込んでから、「設定する」のボタンを押してください。問題選択画面に移動できるようになります。そこで1問を選ぶと、タイピング画面になります。

タイプすべき数行のプログラムコードが、薄く表示されます。順に正しくタイプすると、色が変わっていきます。またミスタイプは赤字で表示され、バックスペースキーを押して削除しないといけません。すべて打ち込むと、タイプ時間と誤タイプ数が表示されます。また、何ミリ秒でどのキーを押したかを文字ごとに記録し、データベースに格納します。

![Scene 1: start](https://user-images.githubusercontent.com/57928/113510678-ee440400-9596-11eb-9fa5-65d0ab3a7b31.png)

![Scene 2: missed](https://user-images.githubusercontent.com/57928/113510685-f56b1200-9596-11eb-8775-92b97a3e92ac.png)

![Scene 3: corrected](https://user-images.githubusercontent.com/57928/113510687-f7cd6c00-9596-11eb-95a5-28c5ddd9a5f6.png)

![Scene 4: completed](https://user-images.githubusercontent.com/57928/113510690-f9972f80-9596-11eb-9396-07fc337ca52d.png)

プログラムコードは、あらかじめ登録されています。和歌山大学システム工学部の1年生向け授業で学生にタイピングしてもらった、C言語で書かれた6つのプログラムです。将来的には、プログラムファイルから簡単に登録するための仕組みを取り入れます。

実行にあたってはDocker Composeを使用します。クライアントとサーバの計算機が異なっていても（その場合にはサーバにのみDocker Composeが必要となり、クライアントはブラウザのみでかまいません）、同じ（スタンドアロン）でも、動作します。docker-compose.ymlを編集すれば、終了しても、データベースに格納されたデータ（実施日時や結果など）を保持することができます。

## 謝辞ほか

本システムの開発は、JSPS科研費[19K12267](https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-19K12267/)の助成を受けたものです。

開発（プログラムコードおよび解説の作成も）にあたっては、和歌山大学システム工学部 村川研究室学生の協力を得ました。以下にて成果を発表しています。

- 小髙真太郎, 窪田雅崇, 村川猛彦: 写経型学習に基づくC言語学習支援システムの開発, 2020年電子情報通信学会総合大会, 情報・システム講演論文集1, p.121 (2020).
- 小髙真太郎, 村川猛彦: 写経型プログラミングに基づく学習支援システムの構築, 2021年電子情報通信学会総合大会, 情報・システム講演論文集1, p.92 (2021).

docker-compose down --rmi all --volumes --remove-orphans