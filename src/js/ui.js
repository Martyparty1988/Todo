function renderTasks(tasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';
    taskElement.innerHTML = `
      <div class="task-content ${task.completed ? 'completed' : ''}">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        ${task.dueDate ? `<p class="task-meta">Splatnost: ${task.dueDate}</p>` : ''}
        <p class="task-meta">Priorita: ${task.priority}</p>
      </div>
      <div class="task-actions">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id}, this.checked)">
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;
    taskList.appendChild(taskElement);
    // Animace při přidání
    taskElement.style.opacity = '0';
    taskElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
      taskElement.style.transition = 'all 0.3s ease';
      taskElement.style.opacity = '1';
      taskElement.style.transform = 'translateY(0)';
    }, 10);
  });
}

function setActiveTab(location) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.location === location) {
      tab.classList.add('active');
    }
  });
}