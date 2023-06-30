import mongoose from 'mongoose';

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://shrishty:shrishty123@cluster0.welkr3m.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectToDatabase;
