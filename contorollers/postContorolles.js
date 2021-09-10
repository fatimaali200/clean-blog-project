const Post = require('../models/Post');
const fs = require("fs");

exports.getALLPOSTS = async (req, res) => {
  const posts = await Post.find({});
  res.render('index', { posts });
};

exports.getPOST = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
};

exports.createPOST = async (req, res) => {// async - await yapısı kullanacğız.
  await Post.create(req.body); // body bilgisini Post modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/');
};

exports.updatePOST = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.detail = req.body.detail;
  post.title = req.body.title;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
