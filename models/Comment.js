const { Model } = require('objection');

const User = require('./User.js');
const Picture = require('./Picture.js');

class Comment extends Model {
    static tableName = 'comments';

    static relationMappings = {

        picture: {
            relation: Model.BelongsToOneRelation,
            modelClass: Picture,
            join: {
              from: 'comments.pictureId',
              to: 'pictures.id'
            }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'comments.userId',
              to: 'users.id'
            }
        }
    }

}

module.exports = Comment;