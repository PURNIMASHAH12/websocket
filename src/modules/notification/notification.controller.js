import notificationModel from "./notification.models.js";
import { goIo } from "../../../config/server.config.js";

export const notification = async (req,res) => {
  try {
    const { message, userId } = req.body

    if (!message || !userId) res.status(400).json({
      message: "all fields are required"
    })

    const newNotification = await notificationModel.create({
      message,
      userId,
      read: false
    })

    goIo().emit('newNotification', newNotification);

    res.status(201).json({
      message: "Notification !!!",
      data: newNotification,
      success: true
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
}

export const getNotification = async (req, res) => {
  try {
    const notification = await notificationModel.find();

    if (!notification || notification.length === 0) {
      return res.status(404).json({
        message: "No Notification Found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Notification Sent Successfully",
      success: true,
      data: notification,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};