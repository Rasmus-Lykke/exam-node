exports.up = function (knex) {
    // Using knex to create a table called users which includes the columns 
    // id, username, password, email, updated at and created at.
    return knex.schema
        .createTable('users', table => {
            table.increments('id'); // Auto increments
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
            table.string('email').notNullable().unique();

            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('pictures', table => {
            table.increments('id');
            table.string('title').notNullable()
            table.string('file_name').notNullable().unique();
            table.string('description').notNullable();
            table.string('category').notNullable();
            table.string('tags');

            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');

            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.timestamp('created_at').defaultTo(knex.fn.now());

        })
        .createTable('comments', table => {
            table.increments('id');
            table.string('comment').notNullable();
            table.string('filename').notNullable(); // Temporary until at find out the relations which are giving me problems

            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');

            /* Having errors when creating this migration
            table.string('picture_id').unsigned().notNullable();
            table.foreign('picture_id').references('pictures.id');
            */

            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.timestamp('created_at').defaultTo(knex.fn.now());

        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('comments')
        .dropTableIfExists('pictures')
        .dropTableIfExists('users');
};