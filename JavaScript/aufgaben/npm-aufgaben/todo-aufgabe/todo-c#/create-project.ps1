# Erstelle das Projektverzeichnis
$projectRoot = "$PSScriptRoot/TodoApp"
$backendPath = "$projectRoot/Backend"
$frontendPath = "$projectRoot/Frontend"

Write-Host "Erstelle das Projektverzeichnis..."
New-Item -ItemType Directory -Force -Path $projectRoot, $backendPath, "$backendPath/Models", $frontendPath | Out-Null

# Backend: ASP.NET Core Web API
Write-Host "Erstelle das Backend-Projekt..."
dotnet new webapi -o $backendPath

# Backend: TodoItem Model
Write-Host "Erstelle das TodoItem Model..."
$todoModel = @"
namespace TodoApp.Backend.Models {
    public class TodoItem {
        public int Id { get; set; }
        public string Task { get; set; }
        public bool IsCompleted { get; set; }
    }
}
"@
New-Item -ItemType File -Force -Path "$backendPath/Models/TodoItem.cs" -Value $todoModel | Out-Null

# Backend: TodoController
Write-Host "Erstelle den TodoController..."
$todoController = @"
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
"@
New-Item -ItemType File -Force -Path "$backendPath/Controllers/TodoController.cs" -Value $todoController | Out-Null

# Backend: Allow CORS
Write-Host "Aktualisiere Program.cs für CORS..."
(Get-Content -Path "$backendPath/Program.cs") -replace '(builder.Services.AddControllers\(\);)', '$1
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});' |
Set-Content -Path "$backendPath/Program.cs"

(Get-Content -Path "$backendPath/Program.cs") -replace '(app.UseAuthorization\(\);)', '$1
app.UseCors();' |
Set-Content -Path "$backendPath/Program.cs"

# Frontend: HTML mit Local Storage
Write-Host "Erstelle die index.html für das Frontend..."
$frontendHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        #todo-list {
            margin-top: 20px;
            list-style-type: none;
            padding: 0;
        }
        #todo-list li {
            background: #f4f4f4;
            margin: 5px 0;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Todo App</h1>
    <div>
        <input type="text" id="todo-input" placeholder="Neue Aufgabe hinzufügen" />
        <button id="add-todo">Hinzufügen</button>
    </div>
    <ul id="todo-list"></ul>

    <script>
        const todoInput = document.getElementById('todo-input');
        const addTodoButton = document.getElementById('add-todo');
        const todoList = document.getElementById('todo-list');

        // Lade Todos aus Local Storage
        function loadTodos() {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todoList.innerHTML = ''; // Liste leeren
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.task;
                todoList.appendChild(li);
            });
        }

        // Neues Todo hinzufügen
        addTodoButton.addEventListener('click', () => {
            const newTodo = todoInput.value.trim();
            if (newTodo) {
                const todos = JSON.parse(localStorage.getItem('todos')) || [];
                todos.push({ task: newTodo });
                localStorage.setItem('todos', JSON.stringify(todos));
                todoInput.value = ''; // Eingabe leeren
                loadTodos(); // Liste neu laden
            } else {
                alert('Bitte geben Sie eine Aufgabe ein.');
            }
        });

        // Initial Todos laden
        loadTodos();
    </script>
</body>
</html>
"@
New-Item -ItemType File -Force -Path "$frontendPath/index.html" -Value $frontendHtml | Out-Null

# Server-Start: Backend und Frontend
Write-Host "Starte Backend und Frontend..."
Start-Process -NoNewWindow -FilePath "dotnet" -ArgumentList "run --project $backendPath"
Start-Process -NoNewWindow -FilePath "python" -ArgumentList "-m http.server 8000 --directory $frontendPath"

Write-Host "Projekt erfolgreich erstellt! Öffne http://localhost:8000 im Browser, um die App zu testen."
