import { protect as auth } from "../middleware/authMiddleware.js";
import * as todoController from "../controllers/todoController.js";

const router = express.Router();

router.get("/", auth, todoController.loadTodo);
router.post("/add-todo", auth, todoController.addTodo);
router.get("/delete-todo", auth, todoController.deleteTodo);
router.get("/edit-todo", auth, todoController.editTodoLoad);
router.post("/edit-todo", auth, todoController.updateTodo);

export default router;
