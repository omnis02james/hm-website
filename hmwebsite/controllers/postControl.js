const { validationResult } = require('express-validator');
const Post = require('../models/post');
const WebsiteError = require('../models/websiteError');
const getPostById = async (req, res, next) => {
  const postID = req.params.pid; 
  let post;
  try {
    post = await Post.findById(postID);
  } catch (err) {
    const error = new WebsiteError(
      'Something went wrong, could not find a post.',
      500
    );
    return next(error);
  }
  if (!post) {
    const error = new WebsiteError(
      'Could not find a post for the provided id.',
      404
    );
    return next(error);
  }
  res.json({ post: post.toObject({ getters: true }) }); 
};

const getPosts = async (req, res, next) => {
 let posts;
  try {
    posts = await Post.find({});
  } catch (err) {
    const error = new WebsiteError(
      'Fetching posts failed, please try again later',
      500
    );
    return next(error);
  }
  res.json({ posts: posts.map(post => post.toObject({ getters: true})) });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new WebsiteError('Invalid inputs passed, please check your data.', 422)
    );
  }

const { title, description, imageURL, creator } = req.body;
  const createdPost = new Post({
    title,
    description,
    imageURL,
    creator
  });
  try {
    createdPost.save();
  } catch (err) {
    const error = new WebsiteError(
      'Creating post failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ post: createdPost });
};
const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new WebsiteError('Invalid inputs passed, please check your data.', 422);
  }
  const { title, description, imageURL} = req.body;
  const postID = req.params.pid;
  let post;
  try {
    post = await Post.findById(postID);
  } catch (err) {
    const error = new WebsiteError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }
  post.title = title;
  post.description = description;
  post.imageURL = imageURL;
  try {
    await post.save();
  } catch (err) {
    const error = new WebsiteError(
      'Something went wrong, could not update post.',
      500
    );
    return next(error);
  }
  res.status(200).json({ post: post.toObject({ getters: true }) });
};
const deletePost = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new WebsiteError(
      'Something went wrong, could not delete post.',
      500
    );
    return next(error);
  }
  try {
    await post.remove();
  } catch (err) {
    const error = new WebsiteError(
      'Something went wrong, could not delete post.',
      500
    );
    return next(error);
  }
  res.status(200).json({ message: 'Deleted post.' });
};
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
