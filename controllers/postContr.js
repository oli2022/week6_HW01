const express = require('express');

const router = express.Router();

// 引用其他檔案 - 錯誤訊息
const appError = require('../servers/appError');
const handleErrorAsync = require('../servers/handleErrorAsync');

// 引用 Model 檔案
const Post = require('../Models/postModel');
const User = require('../Models/usersModel');

// 新增、修改、刪除
const postsController = {
    getAllPosts: async (req, res) => {
        const timeSort = req.query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
        const q = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
        const post = await Post.find(q)
            .populate({
                path: 'user',
                select: 'name photo ',
            })
            .sort(timeSort);
        // asc 遞增(由小到大，由舊到新) createdAt ;
        // desc 遞減(由大到小、由新到舊) "-createdAt"

        res.status(200).json(post);
    },

    createPost: handleErrorAsync(async function (req, res, next) {
        if (req.body.content == undefined) {
            return next(appError(400, ' content 欄位為必填', next));
        }
        const newPost = await Post.create(req.body);
        res.status(200).json({
            status: '單筆資料新增成功',
            post: newPost,
        });
    }),

    deleteAll: handleErrorAsync(async function (req, res, next) {
        if (req.originalUrl === '/posts') {
            await Post.deleteMany({});
            res.status(200).json({
                status: '刪除全部資料成功',
            });
        } else {
            return next(appError(500, '路徑錯誤', next));
        }
    }),

    deleteOne: handleErrorAsync(async function (req, res, next) {
        const id = req.params.id;
        const isDelete = await Post.findByIdAndDelete(id);
        if (!isDelete) {
            return next(appError(400, '刪除失敗, id 不正確'));
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({
            status: ' 單筆資料刪除成功 ',
        });
    }),

    updatePost: handleErrorAsync(async function (req, res, next) {
        const id = req.params.id;
        const data = req.body;
        await Post.findByIdAndUpdate(id, data);
        if (!id) {
            return next(appError(500, '無此 id', next));
        }
        res.status(200).json({
            status: ' 單筆資料更新成功 ',
            data,
        });
    }),
};

module.exports = postsController;
