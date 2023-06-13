let tasks = [];

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const row = document.createElement('tr');
    const taskCell = document.createElement('td');
    const priorityCell = document.createElement('td');
    const dueDateCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const showDescriptionButton = document.createElement('button');
    const completeButton = document.createElement('button');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    taskCell.textContent = task.text;
    priorityCell.textContent = task.priority;
    dueDateCell.textContent = task.dueDate.toLocaleDateString();

    if (task.completed) {
      row.classList.add('completed');
      row.classList.add('table-success');
      showDescriptionButton.textContent = 'Concluída em: ' + task.completedDate.toLocaleString();
    } else {
      row.classList.add(getPriorityClass(task.priority));
      showDescriptionButton.textContent = 'Ver Descrição';
    }

    showDescriptionButton.classList.add('btn', 'btn-primary', 'btn-sm', 'me-2');
    showDescriptionButton.addEventListener('click', () => showDescription(task.id));

    completeButton.textContent = 'Concluir';
    completeButton.classList.add('btn', 'btn-success', 'btn-sm');
    completeButton.addEventListener('click', () => completeTask(task.id, row));

    editButton.textContent = 'Editar';
    editButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'me-2');
    editButton.addEventListener('click', () => editTask(task.id));

    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.addEventListener('click', () => deleteTask(task.id, row));

    actionCell.appendChild(showDescriptionButton);
    actionCell.appendChild(completeButton);
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(taskCell);
    row.appendChild(priorityCell);
    row.appendChild(dueDateCell);
    row.appendChild(actionCell);

    taskList.appendChild(row);
  });
}

function addTask(event) {
  event.preventDefault();

  const taskInput = document.getElementById('task-input');
  const prioritySelect = document.getElementById('priority-select');
  const dueDateInput = document.getElementById('due-date-input');
  const descriptionInput = document.getElementById('description-input');

  const task = {
    id: generateId(),
    text: taskInput.value,
    priority: prioritySelect.value,
    dueDate: new Date(dueDateInput.value),
    description: descriptionInput.value,
    completed: false
  };

  tasks.push(task);
  renderTasks();

  taskInput.value = '';
  prioritySelect.value = 'alta';
  dueDateInput.value = '';
  descriptionInput.value = '';
}

function showDescription(taskId) {
  const task = tasks.find(task => task.id === taskId);
  const descriptionElement = document.getElementById('task-description');
  descriptionElement.textContent = task.description;

  const toast = new bootstrap.Toast(document.getElementById('task-toast'));
  toast.show();
}

function completeTask(taskId, row) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    tasks[taskIndex].completedDate = new Date();
    row.classList.add('completed');
    row.classList.remove(getPriorityClass(tasks[taskIndex].priority));
    row.classList.add('table-success');
    renderTasks();
  }
}

function editTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const task = tasks[taskIndex];
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date-input');
    const descriptionInput = document.getElementById('description-input');

    taskInput.value = task.text;
    prioritySelect.value = task.priority;
    dueDateInput.value = task.dueDate.toISOString().substring(0, 10);
    descriptionInput.value = task.description;

    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}

function deleteTask(taskId, row) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    row.remove();
  }
}

function getPriorityClass(priority) {
  switch (priority) {
    case 'alta':
      return 'table-danger';
    case 'média':
      return 'table-warning';
    case 'baixa':
      return 'table-info';
    default:
      return '';
  }
}

const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', addTask);

const filterSelect = document.getElementById('filter-select');
filterSelect.addEventListener('change', () => {
  const selectedValue = filterSelect.value;
  const filteredTasks = tasks.filter(task => {
    if (selectedValue === 'concluidas') {
      return task.completed;
    } else if (selectedValue === 'pendentes') {
      return !task.completed;
    } else {
      return true;
    }
  });

  renderFilteredTasks(filteredTasks);
});

function renderFilteredTasks(filteredTasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  filteredTasks.forEach(task => {
    const row = document.createElement('tr');
    const taskCell = document.createElement('td');
    const priorityCell = document.createElement('td');
    const dueDateCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const showDescriptionButton = document.createElement('button');
    const completeButton = document.createElement('button');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    taskCell.textContent = task.text;
    priorityCell.textContent = task.priority;
    dueDateCell.textContent = task.dueDate.toLocaleDateString();

    if (task.completed) {
      row.classList.add('completed');
      row.classList.add('table-success');
      showDescriptionButton.textContent = 'Concluída em: ' + task.completedDate.toLocaleString();
    } else {
      row.classList.add(getPriorityClass(task.priority));
      showDescriptionButton.textContent = 'Ver Descrição';
    }

    showDescriptionButton.classList.add('btn', 'btn-primary', 'btn-sm', 'me-2');
    showDescriptionButton.addEventListener('click', () => showDescription(task.id));

    completeButton.textContent = 'Concluir';
    completeButton.classList.add('btn', 'btn-success', 'btn-sm');
    completeButton.addEventListener('click', () => completeTask(task.id, row));

    editButton.textContent = 'Editar';
    editButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'me-2');
    editButton.addEventListener('click', () => editTask(task.id));

    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.addEventListener('click', () => deleteTask(task.id, row));

    actionCell.appendChild(showDescriptionButton);
    actionCell.appendChild(completeButton);
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(taskCell);
    row.appendChild(priorityCell);
    row.appendChild(dueDateCell);
    row.appendChild(actionCell);

    taskList.appendChild(row);
  });
}

function sortTasksByPriority() {
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = {
      baixa: 0,
      média: 1,
      alta: 2
    };

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  renderFilteredTasks(sortedTasks);
}

const sortPriorityButton = document.getElementById('sort-priority-button');
sortPriorityButton.addEventListener('click', sortTasksByPriority);
