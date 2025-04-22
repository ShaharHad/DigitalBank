const { getDashboardData } = require("../services/dashboardService");

exports.getDashboard = async function (req, res, next) {
  try {
    const {userId} = req.params;
    const data = await getDashboardData(userId);

    return res.status(200).json({ data });
  } catch (error) {
    return next(error); 
  }
};
