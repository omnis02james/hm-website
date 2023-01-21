const User = require('../models/user');
const WebsiteError = require('../models/websiteError');
const { validationResult } = require('express-validator');
const getUsers = async (req, res, next) => {
    const userId = req.params.uid;
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new WebsiteError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }
    if (!user) {
        const error = new WebsiteError(
            'Could not find a user for the provided id.',
            404
        );
        return next(error);
    }
    res.json({ user: user.toObject({ getters: true }) });
};
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new WebsiteError('Invalid inputs passed, please check your data.', 422);
    }
    const { username, password } = req.body;
    const userExists = await User.findOne(u => u.username === username);
    if (userExists) {
        throw new WebsiteError('Could not create user, name already exists.', 422);
    }
    const createdUser = new User({
        username,
        password
    });
    try {
        await createdUser.save();
    } catch (err) {
        const error = new WebsiteError(
            'Creating user failed, please try again.',
            500
        );
        return next(error);
    }
    res.status(201).json({ user: createdUser });
};
const login = async (req, res, next) => {
    const { username, password } = req.body;
    const identifiedUser = await User.findOne(u => u.username === username);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new WebsiteError('Login failed, please try again.', 401);
    }
    res.json({message: 'Logged In'});
};
exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;