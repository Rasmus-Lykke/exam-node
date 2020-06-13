const { Model } = require('objection');

const Comment = require('./Comment.js');
const Picture = require('./Picture.js');

class User extends Model {
    static tableName = 'users';

    static relationMappings = {
        comments: {
            relation: Model.HasManyRelation,
            modelClass: Comment,
            join: {
              from: 'users.id',
              to: 'comments.userId'
            }
        },
        pictures: {
            relation: Model.HasManyRelation,
            modelClass: Picture,
            join: {
              from: 'users.id',
              to: 'pictures.userId'
            }
        }
    }
}

module.exports = User;