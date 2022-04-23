const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Middleware
app.use(cors());
app.use(express.json());

// user Name: geniusUser
// password: YoqJTzh0hIdQ33H6


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.buxdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// get/find data to Database. 
async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');

        // Load data to Database.
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
            })

            // 
            app.get('/service/:id', async(req,res)=>{
                const id = req.params.id;
                const query = {_id: ObjectId(id)};
                const service = await serviceCollection.findOne(query);
                res.send(service);
            })
            // Post
            app.post('/service',async(req,res)=>{
                const newService = req.body;
                const result = await serviceCollection.insertOne(newService);
                res.send(result);
            })

            // Delete
            app.delete('/service/:id',async(req,res)=>{
                const id = req.params.id;
                const quary = {_id: ObjectId(id)};
                const result = await serviceCollection.deleteOne(quary);
                res.send(result);
            })


    }
    finally {

    }

}

run().catch(console.dir);

// 
app.get('/', (req, res) => {
    res.send('running genius server');
})

app.listen(port, () => {
    console.log('Running ', port)
})