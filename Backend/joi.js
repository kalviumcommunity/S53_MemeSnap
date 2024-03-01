const joi = require("joi");
const joi_model = joi.object({
    memeId: joi.number(),
    memeTitle: joi.string(),
    user: joi.string(),
    image: joi.string(),
    likes: joi.number(),
    comments: joi.array(),
    tags: joi.string()
});

module.exports = joi_model;