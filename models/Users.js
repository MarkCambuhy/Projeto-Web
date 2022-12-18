const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://0.0.0.0:27017/trabalhoweb';

module.exports = class Users {
    static async insert(username, email, password) {
        const conn = await MongoClient.connect(url);
        const db = conn.db();
        await db.collection('users').insertOne({ username: username, email: email, password: password, isAdmin: false });
        conn.close();
    }
    static async find(email) {
        const conn = await MongoClient.connect(url);
        const db = conn.db();
        let user = await db.collection('users').findOne({ email: email });
        conn.close();
        return user;
    }
    static async insertPost(title, comment) {
        const conn = await MongoClient.connect(url);
        const db = conn.db();
        await db.collection('posts').insertOne({ title: title, comment: comment });
        conn.close();
    }
    static async findPosts(busca) {
        const conn = await MongoClient.connect(url);
        const db = conn.db();
        let posts;
        if (busca)
            posts = await db.collection('posts').find({ title: busca }).toArray();
        else
            posts = await db.collection('posts').find().toArray();
        conn.close();
        return posts;
    }
};