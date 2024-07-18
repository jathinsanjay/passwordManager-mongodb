const express = require('express')
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000
const dotenv=require('dotenv')


dotenv.config()
app.use(bodyparser.json())
app.use(cors())
const url=process.env.MONGOURI;
const dbname="passwordManager"
const client = new MongoClient(url);

app.get('/api/get', async(req, res) => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbname);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.send(findResult)
})
app.post('/api/post', async(req, res) => {
    await client.connect();
    const password=req.body
    console.log('Connected successfully to server');
    const db = client.db(dbname);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})
})
app.delete('/api/delete', async(req, res) => {
    await client.connect();
    const password=req.body
    console.log('Connected successfully to server');
    const db = client.db(dbname);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(` on port ${port}`)
})