import pkg from 'pg';
const { Client } = pkg;

export const db = new Client({
    user: 'codingbase_user',
    host: 'dpg-csqseuij1k6c73c2anu0-a.oregon-postgres.render.com',
    database: 'codingbase',
    password: '1t2uAAJhmAYQeAxceAFo7XwoL18R8nDW', // Ensure this is the exact password
    port: 5432,
    ssl: true,
})

db.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });