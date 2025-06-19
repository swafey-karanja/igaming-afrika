import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  topic: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);