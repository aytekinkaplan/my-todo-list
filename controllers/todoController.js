import Todo from "../models/todoModel.js";

// Get all todos
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      user: req.user.id,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single todo
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;
    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await todo.remove();
    res.status(200).json({ message: "Todo removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
