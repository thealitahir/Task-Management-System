import mongoose from 'mongoose'
enum StatusEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [30, "name must be less than 30 characters"],
    trim: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    minlength: [5, "category must be more than 5 characters"],
  },
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
  },
  status: {
    type: String,
    enum: Object.values(StatusEnum),  
    default: StatusEnum.PENDING,
    validate: {
      validator: function(value:any) {
        return Object.values(StatusEnum).includes(value);
      },
      message: "Invalid status value. Must be 'PENDING' or 'COMPLETED'.",
    },
  },
  dueDate: {
    type: String,
    validate: {
      validator: function (value) {
        // Create a regular expression to validate the "DD-MM-YYYY" format
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

        // Test if the value matches the regex
        return dateRegex.test(value);
      },
      message: "Invalid date format. Must be in the DD-MM-YYYY format.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Tasks", taskSchema);
