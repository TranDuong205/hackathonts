document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');

    document.getElementById('btnAdd').addEventListener('click', function() {
        const taskName = (document.getElementById('taskInput') as HTMLInputElement).value.trim();
        
        if (taskName === "") {
            alert("Tên công việc không được để trống");
            return;
        }

        const existingTasks: { name: string, completed: boolean }[] = JSON.parse(localStorage.getItem('tasks') || '[]');
        for (let i = 0; i < existingTasks.length; i++) {
            if (existingTasks[i].name === taskName) {
                alert("Công việc đã tồn tại");
                return;
            }
        }

        const newTask = { name: taskName, completed: false };
        existingTasks.push(newTask);

        localStorage.setItem('tasks', JSON.stringify(existingTasks));

        renderTasks();
        (document.getElementById('taskInput') as HTMLInputElement).value = "";

        alert("Công việc đã được thêm");
    });

    function renderTasks() {
        const tasks: { name: string, completed: boolean }[] = JSON.parse(localStorage.getItem('tasks') || '[]');
        taskList.innerHTML = '';
        tasks.forEach(function(task) {
            const li = document.createElement('li');
            li.innerText = task.name;
            taskList.appendChild(li);
        });
    }

    renderTasks();
});

