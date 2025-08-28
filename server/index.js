const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DB connected');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@taskmanager.7tnzarm.mongodb.net/`;
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const tasks = client.db('tasks-manager').collection('tasks');

    app.post('/create-task', async (req, res) => {
      const task = req.body;
      try {
        const result = await tasks.insertOne(task);
        const newData = await tasks.find().toArray();
        if (result.acknowledged === true) {
          res.status(200).send({
            status: true,
            message: 'Task created successfully',
            data: newData,
          });
          return;
        }
      } catch (err) {
        console.error('fail create task:', err.message);
        res.status(500).send({
          status: false,
          message: 'Failed to create task',
        });
      }
    });

    app.get('/tasks', async (req, res) => {
      try {
        const result = await tasks.find().toArray();
        res.status(200).send({
          status: true,
          task: result,
        });
        return;
      } catch (error) {
        res.status(500).send({
          status: false,
          message: 'Failed to get tasks',
        });
      }
    });
    // Update task status
    app.put('/update-status/:id', async (req, res) => {
      const { id } = req.params;
      const { status } = req.body; 
      console.log(`Updating task with ID: ${id} to status: ${status}`);

      try {
        const filter = { _id: new ObjectId(id) };

        const result = await tasks.updateOne(filter, { $set: { status } });

        if (result.matchedCount === 0) {
          return res.status(404).send({
            status: false,
            message: `Task not found with ID: ${id}`,
          });
        }

        const updatedTask = await tasks.findOne(filter);

        res.status(200).send({
          status: true,
          task: updatedTask,
        });
        return;
      } catch (error) {
        console.error('Update Error:', error);
        res.status(500).send({
          status: false,
          message: `Failed to update task: ${id}`,
        });
      }
    });


    
  } catch (err) {
    console.error('❌ MongoDB error:', err.message);
  }
}
run();

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
