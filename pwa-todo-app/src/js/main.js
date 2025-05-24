let activeLocation = 'Podolí';

document.addEventListener('DOMContentLoaded', async () => {
  // Registrace Service Workeru
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(err => console.error('Service Worker error:', err));
  }

  // Načtení úkolů pro výchozí lokaci
  const tasks = await getTasks(activeLocation);
  renderTasks(tasks);

  // Přepínání karet
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', async () => {
      activeLocation = tab.dataset.location;
      setActiveTab(activeLocation);
      const tasks = await getTasks(activeLocation);
      renderTasks(tasks);
    });
  });

  // Formulář pro přidání úkolu
  document.getElementById('task-form').addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;
    const priority = document.getElementById('task-priority').value;

    await addTask({
      title,
      description,
      location: activeLocation,
      dueDate,
      priority,
      completed: false
    });

    document.getElementById('task-form').reset();
    const tasks = await getTasks(activeLocation);
    renderTasks(tasks);
  });
});

async function toggleTask(id, completed) {
  await updateTask(id, { completed });
  const tasks = await getTasks(activeLocation);
  renderTasks(tasks);
}

async function deleteTask(id) {
  await deleteTask(id);
  const tasks = await getTasks(activeLocation);
  renderTasks(tasks);
}