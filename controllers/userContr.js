const express = require('express');

const router = express.Router();

// 引用檔案 - 錯誤訊息
const appError = require('../servers/appError');
const handleErrorAsync = require('../servers/handleErrorAsync');

// 引用 Model 檔案
const Post = require('../Models/postModel');
const User = require('../Models/usersModel');

// 註用、登入、重設密碼、取得個人資料、更新個人資料
const userController = {};

module.exports = userController;
