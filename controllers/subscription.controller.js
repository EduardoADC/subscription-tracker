import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // console.log("Created subscription:", {
    //   subscriptionId: subscription._id,
    //   userId: req.user._id,
    //   userIdType: typeof req.user._id,
    //   userIdString: req.user._id.toString(),
    // });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscriptions/reminder`,
      body: {
        subscriptionId: subscription._id,
        userId: req.user._id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });
    res.status(201).json({ success: true, data: subscription, workflowRunId });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error(
        "You are not authorized to view these subscriptions",
      );
      error.status = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
