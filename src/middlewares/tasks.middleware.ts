import User from '../models/user.model'
export const filterTasksMiddleware = async (req, res, next) => {
    const query:any = {};
  
    // Check if "categoryName" query parameter is present
    if (req.query.categoryName) {
      query.category = req.query.categoryName;
    }
  
    if (req.query.userName) {
      const userName = req.query.userName;
        const user = await User.findOne({ name:userName }); // Replace "userName" with the actual field name in your User model
      console.log("user",user)
      if (user) {
        query.assignTo = user._id.toString();;
      } else {
        query.assignTo = '';
      }
    }
    console.log("query",query)
    req.taskQuery = query; // Store the query in a custom property of the request object
    next();
};
  