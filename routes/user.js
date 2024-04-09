const express = require('express');
const router = express.Router();

const { MongoClient, ObjectId, CURSOR_FLAGS } = require("mongodb");

const uri = "mongodb+srv://tanvirasakib:28Jt9DQd8CyIXrWl@cluster0.zgi0iwz.mongodb.net/";
const client = new MongoClient(uri);


router.get('/', async (req, res, next) => {
    try {
        await client.connect();
        const database = client.db('todo_app');
        const userCollection = database.collection('users');
        const users = await userCollection.find().toArray();
        return res.status(200).json(users);
    } finally {
        await client.close();
    }
});

router.post('/', async (req, res, next) => {
    const { userName, email, password } = req.body;
    try {
        await client.connect();
        const database = client.db('todo_app');
        const userCollection = database.collection('users');
        
        const user = await userCollection.insertOne({
            userName,
            email,
            password,
        });

        return res.status(200).json(user);
      } finally {
        await client.close();
      }
});

router.delete('/:id', async (req, res, next) => {
    const { id: taskIdToDelete } = req.params;
    try {
        await client.connect();
        const database = client.db('todo_app');
        const userCollection = database.collection('users');
        const query = {"_id": new ObjectId(taskIdToDelete)};
        const deleteResult = await userCollection.deleteOne(query);
        return res.status(200).json(deleteResult);
    } finally {
        await client.close();
    }
});

// router.put('/:id', async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         await client.connect();
//         const database = client.db('todo_app');
//         const taskCollection = database.collection('users');
//         const query = {"_id": new ObjectId(id)};
//         const task = await taskCollection.Notes.updateOne(query,{$set: status}, {new:'Done'});
//         return res.status(200).json(task);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }   
// });


module.exports = router;