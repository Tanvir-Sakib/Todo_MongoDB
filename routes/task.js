const express = require('express');
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://tanvirasakib:28Jt9DQd8CyIXrWl@cluster0.zgi0iwz.mongodb.net/";
const client = new MongoClient(uri);


router.get('/', async (req, res, next) => {
    try {
        await client.connect();
        const database = client.db('todo_app');
        const taskCollection = database.collection('tasks');
        const tasks = await taskCollection.find().toArray();
        return res.status(200).json(tasks);
    } finally {
        await client.close();
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await client.connect();
        const database = client.db('todo_app');
        const taskCollection = database.collection('tasks');
        const query = {"_id": new ObjectId(id)};
        const task = await taskCollection.findOne(query);
        return res.status(200).json(task);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }   
});

router.post('/', async (req, res, next) => {
    const { title, description, category, date, priority, status } = req.body;
    try {
        await client.connect();
        const database = client.db('todo_app');
        const taskCollection = database.collection('tasks');
        
        const task = await taskCollection.insertOne({
            title,
            description,
            category,
            date,
            priority,
            status
        });

        return res.status(200).json(task);
      } finally {
        await client.close();
      }
});

router.delete('/:id', async (req, res, next) => {
    const { id: taskIdToDelete } = req.params;
    try {
        await client.connect();
        const database = client.db('todo_app');
        const taskCollection = database.collection('tasks');
        const query = {"_id": new ObjectId(taskIdToDelete)};
        const deleteResult = await taskCollection.deleteOne(query);
        return res.status(200).json(deleteResult);
    } finally {
        await client.close();
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await client.connect();
        const database = client.db('todo_app');
        const taskCollection = database.collection('tasks');
        const query = {"_id": new ObjectId(id)};
        const update = {"status": "Done"};
        const task = await taskCollection.updateOne(query,{$set: update});
        const updatedTask = await taskCollection.findOne(query);
        return res.status(200).json(updatedTask);
    } finally {
        await client.close();
    }   
});

module.exports = router;