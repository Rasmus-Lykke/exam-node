const { Model } = require('objection');

const User = require('./User.js');
const Comment = require('./Comment.js');

class Picture extends Model {
    static tableName = 'pictures';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'pictures.userId',
              to: 'users.id'
            }
        },
        comments: {
            relation: Model.HasManyRelation,
            modelClass: Comment,
            join: {
              from: 'pictures.id',
              to: 'comments.pictureId'
            }
        }
    }
}

module.exports = Picture;


