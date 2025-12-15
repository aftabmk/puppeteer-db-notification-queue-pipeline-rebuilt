const { main, close } = require('../main');

const lambda = async () => {
  try {
    await main();
    return {
      status: 200,
      message: "Workflow completed successfully",
    };
  } 
  catch (error) {
    console.error("❌ Error in workflow:", error);

    // Close resources only if there was an error
    try {
      await close();
      console.log("🧹 Closed resources after failure.");
    } 
    catch (closeErr) {
      console.error("⚠️ Failed to close resources:", closeErr);
    }

    return {
      status: 500,
      message: "Workflow failed",
      error: error.message,
    };
  }
};

module.exports = { lambda };
