# queque_board_api

### 🐥🐥🐥

## API実装基準（途中）

- tokenチェック<br>
signUp、signIn以外のAPIでmiddlewreとしてtokenチェックを行う

- controlerのクラス化<br>
controllerはクラスとして定義し、routes/~.ts内でインスタンス化して実行する<br>
インスタンスの命名は、~Contextとする<br>
ex)
```PostController.ts
export class PostController {
 async getPosts(_res: Request, _res: Response): Promise<void> {
  ...
 }
}
```
```/routes/post.ts
const postContext = new PostController();

router.get("/posts", authenticateToken, postRule, validateError, postContext.getPosts);
```

ルート情報の基本的な流れは下記
```
router.method("/endpoint", authenticateToken, validateRule, validateError, classContext.actionMethod)
```

- 関数は非同期で実装し、expressが提供する形情報を利用して型付けを行う
例は上記のgetPostsメソッドを参照

- express-validatorを利用したバリデーションチェックを行う。
例は上記の/postsルーターを参照

- controllerの切り出し方
  - データアクセスが存在するロジックはmodel定義で呼び出す → prismaContext使用部分
  - データアクセスが存在しないロジックはservice定義で呼び出す

## ポート切り替え時の対応

- ポート番号3001に変更されたmainブランチをpull

- .envファイルを書き換え
　内容はメールで送信

- queque_apiブランチのターミナルで以下のコマンドを実行
```
docker compose up -d --build
docker compose exec node sh
yarn
yarn watch
```