const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Middleware to ensure DB connection is available
app.use(async (req, res, next) => {
  req.db = await connectDB();
  next();
});

// Donor Registration Endpoint
app.post('/donors', async (req, res) => {
  try {
    const donor = req.body;
    const result = await req.db.collection('donors').insertOne(donor);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error registering donor', error });
  }
});

// Get Donors List Endpoint
app.get('/donors', async (req, res) => {
  try {
    const donors = await req.db.collection('donors').find().toArray();
    res.status(200).send(donors);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching donors', error });
  }
});

// Get Single Donor by ID
app.get('/donors/:id', async (req, res) => {
  const { ObjectId } = require('mongodb');
  try {
    const donor = await req.db.collection('donors').findOne({ _id: new ObjectId(req.params.id) });
    if (!donor) {
      return res.status(404).send({ message: 'Donor not found' });
    }
    res.status(200).send(donor);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching donor', error });
  }
});

// Update Donor Information
app.put('/donors/:id', async (req, res) => {
  const { ObjectId } = require('mongodb');
  try {
    const updatedDonor = req.body;
    const result = await req.db.collection('donors').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedDonor }
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error updating donor', error });
  }
});

// Delete Donor
app.delete('/donors/:id', async (req, res) => {
  const { ObjectId } = require('mongodb');
  try {
    const result = await req.db.collection('donors').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Donor not found' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error deleting donor', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
