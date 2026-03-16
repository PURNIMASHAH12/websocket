import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const notificationModel = new mongoose.model("notification", notificationSchema);

export default notificationModel;
