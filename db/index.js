const { Client } = require('pg');

const client = new Client ('postgres://postgres:ganon3422@localhost:5432/juicebox-dev');


const getAllUsers = async () => {
    const {rows} = await client.query(`
        SELECT id, username
        FROM users;
    `);

    return rows;
}

const createUser = async ({username, password}) => {
    try {
        const result = await client.query(`
            INSERT INTO users(username, password) 
            VALUES ($1, $2);
        `, [username, password]);

        return result
    } catch (error) {
        throw error
    }
}



module.exports = {
    client,
    getAllUsers,
    createUser,
}
