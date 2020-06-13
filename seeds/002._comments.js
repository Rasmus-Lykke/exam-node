exports.seed = function(knex) {
    return knex('users').select().then(users => {
      if (users.length >= 2) {
        return knex('comments').insert([
          { comment: 'Cool ride', user_id: users[2].id, filename: '0a6636d96917632880f02c4c78d7d711c296.jpeg'},
          { comment: 'Nice color', user_id: users[0].id, filename: '6b5f3a35d0085e15dadcf5d7cabc573d1573.jpeg'},
          { comment: 'Thats hot', user_id: users[1].id, filename: '6b5f3a35d0085e15dadcf5d7cabc573d1573.jpeg'},
          { comment: 'Kinda lame', user_id: users[0].id, filename: '901341efbf905ec00b4e0ac0f9b38b254fa8.jpeg'},
          { comment: 'I have one just like it ............. ............................. ........... ...... ...... .......... ........ ............ ........ ............ ........... ........... ................. ....... .......', user_id: users[2].id, filename: '901341efbf905ec00b4e0ac0f9b38b254fa8.jpeg'},
          { comment: 'OK', user_id: users[0].id, filename: 'a06c6b57404e490acc160ae52280649b252a.jpeg'}
        ]);
      }
    });

  };
  