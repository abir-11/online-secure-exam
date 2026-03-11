import { getCollection } from "./dbConnect";

export async function logActivity({
  userId,
  userName,
  userEmail,
  userRole,
  action,
  details,
  metadata = {},
}) {
  try {
    const activityCollection = await getCollection("activity_logs");

    await activityCollection.insertOne({
      userId,
      userName,
      userEmail,
      userRole,
      action,
      details,
      metadata,
      timestamp: new Date(),
    });

    console.log(`Activity logged: ${action}`);
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}
