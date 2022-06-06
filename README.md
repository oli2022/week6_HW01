# 第六週：JWT 身份驗證機制

LV1：設計五個 API
POST：{url}/users/sign_up：註冊
POST：{url}/users/sign_in：登入
POST：{url}/users/updatePassword: 重設密碼
GET：{url}/users/profile: 取得個人資料，需設計 isAuth middleware。
PATCH：{url}/users/profile: 更新個人資料，需設計 isAuth middleware

## 使用到的 NPM

-   bcryptjs：密碼加解密
-   validator：使用者資料驗證
-   jsonwebtoken：JWT 產生與驗證

```js
$ npm install bcryptjs
$ npm install validator
$ npm install jsonwebtoken
```
