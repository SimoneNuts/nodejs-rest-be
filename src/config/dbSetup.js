const db = require('./db');

async function initializeDatabase() {
    const exists = await db.schema.hasTable('users');

    if (!exists) {
        try {
            await db.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('username').notNullable();
                table.string('email').notNullable().unique();
                table.string('password').notNullable();
                table.timestamp('created_at').defaultTo(db.fn.now());
            });

            console.log('✅ Table "users" created.');
        } catch (error) {
            console.error('❌ Error creating "users" table:', error);
        }
    } else {
        console.log('ℹ️ Table "users" already exists.');
    }
}

module.exports = { initializeDatabase };
