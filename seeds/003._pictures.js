exports.seed = function(knex) {
    return knex('users').select().then(users => {
      if (users.length >= 2) {
        return knex('pictures').insert([
          { title: 'Blue motorcycle', fileName: '66802006d39fb68670304aaf14c02629659a.jpeg', description: 'This is a picture of a blue motorcycle', category: 'motorcycle', tags: '', user_id: users[0].id},
          { title: 'Mercedes', fileName: 'a06c6b57404e490acc160ae52280649b252a.jpeg', description: 'This is a grey mercedes', category: 'car', tags: '', user_id: users[0].id},
          { title: 'Racing Porsche', fileName: '61f295c859c80f1d2f1731dacef9b64a4f48.jpeg', description: 'This is a true racing car', category: 'racing', tags: '', user_id: users[0].id},
          { title: 'Audi headlights', fileName: '901341efbf905ec00b4e0ac0f9b38b254fa8.jpeg', description: 'This is some cool headlights', category: 'car', tags: '', user_id: users[0].id},
          { title: 'Red Audi R8', fileName: '0a6636d96917632880f02c4c78d7d711c296.jpeg', description: 'Red beauty', category: 'car', tags: '', user_id: users[0].id},
          { title: 'Black motorcycle', fileName: '45f1cec1cd530049b835124fb92cf42904a6.jpeg', description: 'This is a picture of a black motorcycle', category: 'motorcycle', tags: '', user_id: users[0].id},
          { title: 'Custom Subaru', fileName: '121363f9e36527eb8fc1f20feab9a7b45d37.jpeg', description: 'This is a cool looking red custom build', category: 'custom', tags: '', user_id: users[0].id},
          { title: 'Snowy Skoda', fileName: '6b5f3a35d0085e15dadcf5d7cabc573d1573.jpeg', description: 'Skoda covered in snow', category: 'car', tags: '', user_id: users[0].id},
          { title: 'Custom bike', fileName: 'ac988223494837a2fa834c4b1780bd139213.jpeg', description: 'This is a custom build bike', category: 'custom', tags: '', user_id: users[0].id},
          
        ]);
      }
    });

  };
