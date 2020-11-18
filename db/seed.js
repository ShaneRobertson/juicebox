//note* pg (and client) are a programmatice way to interact with the Database rather than manually typing in queries directly into SQL
const {
    client,
    getAllUsers,
    createUser
} = require('./index');


const createInitialUsers = async () => {
    try {
        console.log("Starting to create users...");

        const albert = await createUser({username: 'albert', password: 'bertie99'});

        console.log(albert);

        console.log('Finished creating users!')
    } catch (error) {
        console.error('Error creating users!')
        throw error;
    }
}

// this function should call a query which drops all tables from our database
const dropTables = async () => {
    try {
        console.log("Starting to drop tables...");
        await client.query(`
            DROP TABLE IF EXISTS users;
        `)
        console.log("Finished dropping tables!");
    } catch (error) {
        console.error("Error dropping tables!");
        throw error; // we pass the error up to the function that calls dropTables
    }
}

// this function should call a query which creates all tables for our database 
const createTables = async () => {
    try {
        console.log("Starting to build tables...");

        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        console.log("Finished building tables!");
    } catch (error) {
        console.error("Error building tables!");
        throw error // we pass the error up to the function that calls dropTables
    }
}

const rebuildDB = async () => {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
       throw error;
    } 
}

//TESTING THE DATABASE
async function testDB() {
    try{
        console.log("Starting to test database...");
        
        const users = await getAllUsers()
        console.log("getAllUsers:", users);

        console.log("Finished database tests!");
    } catch (error) {
        console.error("Error testing database!");
        throw error;
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end())