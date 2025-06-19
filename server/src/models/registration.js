import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  company: String,
  phone: String,
  privacyPolicy: Boolean,
  confirmAccuracy: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
