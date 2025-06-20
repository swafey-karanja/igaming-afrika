import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  company: String,
  phone: String,
  interests: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
