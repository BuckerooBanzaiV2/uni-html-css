using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase {
        private static List<TodoItem> Todos = new List<TodoItem>();
        private static int nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> Get() => Todos;

        [HttpPost]
        public IActionResult Post(TodoItem todo) {
            todo.Id = nextId++;
            Todos.Add(todo);
            return CreatedAtAction(nameof(Post), todo);
        }
    }
}