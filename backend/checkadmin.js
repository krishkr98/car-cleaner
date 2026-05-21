require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to:', mongoose.connection.host);
  const users = await mongoose.connection.collection('users').find({ email: 'admin@carcleaners.com' }).toArray();
  console.log('Admin users found:', users.length);
  users.forEach(u => {
    console.log('id:', u._id);
    console.log('role:', u.role);
    console.log('has password:', !!u.password);
  });
  process.exit(0);
});
