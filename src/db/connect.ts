import mongoose from 'mongoose';

async function connect() {
  const dbUri = process.env.CONNECTION_URI ?? '';

  return mongoose
    .connect(dbUri)
    .then(() => console.log('Database connected'))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}

export default connect;
