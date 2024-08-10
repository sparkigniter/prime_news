const { Client } = require('pg');

exports.createConnection = async () => {
    try {
        const client = new Client({
            user: 'postgres',
            password: '', // Ensure you set the correct password if needed
            host: 'host.docker.internal',
            port: '5432',
            database: 'prime_news',
        });
        await client.connect(); // Wait for the connection to be established
        return client; // Return the connected client
    } catch (e) {
        console.log("DATABASE ERROR", e);
        throw e; // Re-throw the error so the calling function knows about it
    }
}
