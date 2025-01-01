# yurumentor

## UIライブラリ

- [shadcn/ui](https://ui.shadcn.com/)

- 各部品のインストール

```bash
npx shadcn@latest add label
```

### 現在のディレクトリ設計

- features ディレクトリには、各機能に関するファイルを配置しています。
  - actions ディレクトリにはserver actionsを配置しています。（この中で直接DBにアクセスすることを許可しています）

### 想定してたディレクトリ設計（本当はこうしたい😇）

- https://github.com/alan2207/bulletproof-react を参考にしています。
- features ディレクトリには、各機能に関するファイルを配置しています。（ここはぞれぞれの機能同士が参照することを禁止します）
- services ディレクトリには、各スキーマに関するファイルを配置してます（ここはそれぞれのスキーマ同士が参照することを許可します）
  - 例えば、consultations の詳細にて、紐づく matches を参照して「相談に乗る」ボタンにするか「相談に乗る申請済み」ボタンにするかを判断するために、matches のスキーマを参照することを許可します
