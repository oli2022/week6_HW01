const express = require('express');

const router = express.Router();

// 引用 userContr.js檔案
const userContr = require('../controllers/userContr');

/**
 * 注意‼️
 * 路徑還沒有改好
 */
router.get('/posts', (req, res, next) => userContr.getAllPosts(req, res, next)); // 註冊
router.post('/post', (req, res, next) => userContr.createPost(req, res, next)); // 登入
router.delete('/post/:id', (req, res, next) => userContr.deleteOne(req, res, next)); // 重設密碼
router.delete('/posts', (req, res, next) => userContr.deleteAll(req, res, next)); // 取得個人資料
router.patch('/post/:id', (req, res, next) => userContr.updatePost(req, res, next)); // 更新個人資料

module.exports = router;
