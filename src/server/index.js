const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const csv = require('csv-writer').createObjectCsvStringifier;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/shuttle_service', { useNewUrlParser: true, useUnifiedTopology: true });

// User model
const User = mongoose.model('User', {
  username: String,
  password: String,
  role: String
});

// Booking model
const Booking = mongoose.model('Booking', {
  date: Date,
  pickupLocation: String,
  dropoffLocation: String,
  passengers: Number,
  totalPrice: Number
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login route
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET);
    res.json({ accessToken });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

// Bookings route
app.get('/bookings', authenticateToken, async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Advanced analytics route
app.get('/analytics/advanced', authenticateToken, async (req, res) => {
  const revenueData = await Booking.aggregate([
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, revenue: { $sum: "$totalPrice" } } },
    { $sort: { _id: 1 } }
  ]);

  const demandData = await Booking.aggregate([
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, demand: { $sum: "$passengers" } } },
    { $sort: { _id: 1 } }
  ]);

  res.json({
    revenueForecasts: revenueData.map(item => ({ date: item._id, actualRevenue: item.revenue, forecastRevenue: item.revenue * 1.1 })),
    demandPredictions: demandData.map(item => ({ date: item._id, actualDemand: item.demand, predictedDemand: item.demand * 1.05 }))
  });
});

// Report export routes
app.get('/reports/export/csv', authenticateToken, async (req, res) => {
  const bookings = await Booking.find();
  const csvStringifier = csv({
    header: [
      {id: 'date', title: 'Date'},
      {id: 'pickupLocation', title: 'Pickup Location'},
      {id: 'dropoffLocation', title: 'Dropoff Location'},
      {id: 'passengers', title: 'Passengers'},
      {id: 'totalPrice', title: 'Total Price'}
    ]
  });

  const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(bookings);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
  res.send(csvString);
});

app.get('/reports/export/pdf', authenticateToken, async (req, res) => {
  const bookings = await Booking.find();
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Bookings Report', { align: 'center' });
  doc.moveDown();
  bookings.forEach(booking => {
    doc.fontSize(12).text(`Date: ${booking.date.toDateString()}`);
    doc.text(`Pickup: ${booking.pickupLocation}`);
    doc.text(`Dropoff: ${booking.dropoffLocation}`);
    doc.text(`Passengers: ${booking.passengers}`);
    doc.text(`Total Price: $${booking.totalPrice}`);
    doc.moveDown();
  });

  doc.end();
});

// WebSocket setup
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('newBooking', (booking) => {
    io.emit('bookingUpdate', booking);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));