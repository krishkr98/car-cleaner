require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to:', mongoose.connection.host);
  const user = await mongoose.connection.collection('users').findOne({ email: 'admin@carcleaners.com' });
  console.log('Found:', !!user);
  console.log('Role:', user?.role);
  const match = await bcrypt.compare('Admin1234', user?.password);
  console.log('Password Admin1234 matches:', match);
  process.exit(0);
});
