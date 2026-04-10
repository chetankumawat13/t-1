import cron from "node-cron";
import Item from "../models/item.model.js";

export const startCronJobs = () => {


  cron.schedule("0 2 * * *", async () => {
    console.log("🧹 Running auto-delete cron job...");

    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);

      const result = await Item.deleteMany({
        isDeleted: true,
        deletedAt: { $lte: cutoffDate },
      });

      console.log(` Deleted ${result.deletedCount} items older than 30 days`);
    } catch (error) {
      console.error(" Cron Job Error:", error);
    }
  });

};