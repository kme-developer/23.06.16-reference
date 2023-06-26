// routes>posts.js

const express = require('express')
const router = express.Router()

const Post = require('../schemas/post.js')

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// 게시글 작성, 조회 API
router
  .route('/')

  .post(async (req, res) => {
    const { user, password, title, content } = req.body

    if (!user || !password || !title || !content) {
      res.status(400).json({
        message: "데이터 형식이 올바르지 않습니다."
      })
    } else {
      await Post.create( { user, password, title, content })
      res.status(201).json({
        message: "게시글을 생성하였습니다."
      })
    }
  })

  .get(async (req, res) => {
    const result = await Post.find({}).sort({ createdAt: -1 }) // 값이 '-1'일 경우 내림차순 정렬
    
    if (!result) {
      res.status(404).json({
        message: "게시글이 존재하지 않습니다."
      })
    } else {
      res.send(result.map(thisResult => {
        return {
          postId: thisResult._id,
          user: thisResult.user,
          title: thisResult.title,
          createdAt: thisResult.createdAt
        }
      }))
    }
  })

// 게시글 상세 조회, 수정, 삭제 API
router
  .route('/:id')
  
  .get(async (req, res) => {
    const { id } = req.params // req.params 유형(type)은 무조건 문자열(string)입니다.

    if (!ObjectId.isValid(id)) {
      res.status(400).json({
        message: "데이터 형식이 올바르지 않습니다."
      })
    } else {
      const result = await Post.findOne({ _id: id }) // find 반환값 => 배열, findOne 반환값 => 객체
      res.send({
        postId: result._id,
        user: result.user,
        title: result.title,
        content: result.content,
        createdAt: result.createdAt
      })
    }
  })
  // put => 전체를 치환해서 수정할 경우 사용, fetch => 일부만 치환해서 수정할 경우 사용
  .put(async (req, res) => {
    const { id } = req.params
    const { user, password, title, content } = req.body

    if (!ObjectId.isValid(id) || !user || !password || !title || !content) {
      res.status(400).json({
        message: "데이터 형식이 올바르지 않습니다."
      })
    } else {
      const post = await Post.findOne({ _id: id }) // { _id: id, password: password }
      if (!post) {
        res.status(404).json({
          message: "게시글 조회에 실패하였습니다."
        })
      } else {
        if (post.password !== password) {
          res.status(401).json({
            message: "비밀번호가 일치하지 않습니다."
          })
        } else {
          await Post.updateOne({ _id: id }, { user, title, content })
          res.status(200).json({
            message: "게시글을 수정하였습니다."
          })
        }
      }
    }
  })

  .delete(async (req, res) => {
    const { id } = req.params
    const { password } = req.body

    if (!ObjectId.isValid(id) || !password) {
      res.status(400).json({
        message: "데이터 형식이 올바르지 않습니다."
      })
    } else {
      const post = await Post.findOne({ _id: id })
      if (!post) {
        res.status(404).json({
          message: "게시글 조회에 실패하였습니다."
        })
      } else {
        if (post.password !== password) {
          res.status(401).json({
            message: "비밀번호가 일치하지 않습니다."
          })
        } else {
          await Post.deleteOne({ _id: id })
          res.status(200).json({
            message: "게시글을 삭제하였습니다."
          })
        }
      }
    }
  })

module.exports = router
