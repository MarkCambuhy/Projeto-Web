const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://0.0.0.0:27017/teste';

module.exports = class Users {
    static async insert(username, email, password) {
        const conn = await MongoClient.connect(url);
        const db = conn.db();
        await db.collection('users').insertOne({ username: username, email: email, password: password, isAdmin: false });
        conn.close();
    }
    static async findEmail(email) {
        const conn = await MongoClient.connect(url);
        const db = conn.db();
        let aux = await db.collection('users').insertOne({ email: email });
        conn.close();
        return aux;
    }
    static async findAuth(email, password) {
        const conn = await MongoClient.connect(url);
        const db = conn.db();
        let aux = await db.collection('users').insertOne({ email: email, password: password });
        conn.close();
        return aux;
    }
};