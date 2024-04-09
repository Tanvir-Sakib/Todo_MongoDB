const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();
var jwt = require('jsonwebtoken');
const JWT_SECRET = "toDo";
const authMiddleware = require('../middleware/authMiddleware.js');

const { MongoClient, ObjectId, CURSOR_FLAGS } = require("mongodb");

const uri = "mongodb+srv://tanvirasakib:28Jt9DQd8CyIXrWl@cluster0.zgi0iwz.mongodb.net/";
const client = new MongoClient(uri);

const TOKEN_KEY = 'ABCXYZ';

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        await client.connect();
        const database = client.db('todo_app');
        const userCollection = database.collection('users');
        console.log(email);
        const user = await userCollection.findOne({email});
        if(user){
            console.log("success");
            if(user.password === password){
                console.log("Password Checked");
                const data = {
                    users:{id: user.id}
                };

                const authToken = jwt.sign(
                    data,
                    TOKEN_KEY,
  
                );
                return res.json({token: authToken, success: true});
            }
            else{
                return res.json({token: null, success: false});
            }
        }
        else{
            return res.json({massage: 'Invalid UserName or Password', success: false});
        }

      } finally {
        await client.close();
      }
});

router.get('/customer', authMiddleware, async (req, res, next) => {

     return res.json({checked: 'true'});

});

module.exports = router;