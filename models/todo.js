import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo title is required"],
      trim: true,
      maxlength: [100, "Todo title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
TodoSchema.index({ user: 1, status: 1 });

// Virtual for formatted due date
TodoSchema.virtual("formattedDueDate").get(function () {
  return this.dueDate ? this.dueDate.toLocaleDateString() : "No due date";
});

// Instance method to toggle completion status
TodoSchema.methods.toggleComplete = function () {
  this.completed = !this.completed;
  return this.save();
};

// Static method to find overdue todos
TodoSchema.statics.findOverdue = function (userId) {
  return this.find({
    user: userId,
    dueDate: { $lt: new Date() },
    completed: false,
  });
};

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
