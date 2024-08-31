document.addEventListener("DOMContentLoaded", function () {
  const todoList = document.querySelector(".todo-list");

  if (todoList) {
    todoList.addEventListener("click", function (e) {
      if (e.target.classList.contains("todo-checkbox")) {
        const todoItem = e.target.closest(".todo-item");
        const todoId = todoItem.dataset.id;
        const isCompleted = e.target.checked;

        // Send AJAX request to update todo status
        fetch(`/todo/update/${todoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: isCompleted }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              todoItem
                .querySelector(".todo-text")
                .classList.toggle("completed", isCompleted);
            }
          })
          .catch((error) => console.error("Error:", error));
      }

      if (e.target.classList.contains("btn-delete")) {
        const todoItem = e.target.closest(".todo-item");
        const todoId = todoItem.dataset.id;

        // Send AJAX request to delete todo
        fetch(`/todo/delete/${todoId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              todoItem.remove();
            }
          })
          .catch((error) => console.error("Error:", error));
      }
    });
  }
});
