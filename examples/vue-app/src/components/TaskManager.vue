<template>
  <div class="task-manager">
    <h2>Task Manager</h2>
    <div class="add-task">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask" 
        placeholder="Add a new task"
      />
      <button @click="addTask">Add</button>
    </div>
    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <span :class="{ completed: task.completed }">{{ task.text }}</span>
        <div class="task-actions">
          <button @click="toggleTask(index)" class="toggle-btn">
            {{ task.completed ? 'Undo' : 'Complete' }}
          </button>
          <button @click="removeTask(index)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskManager',
  data() {
    return {
      newTask: '',
      tasks: [
        { text: 'Learn Solo Build', completed: false },
        { text: 'Create a Vue.js app', completed: true },
        { text: 'Implement AI features', completed: false }
      ]
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({
          text: this.newTask,
          completed: false
        })
        this.newTask = ''
      }
    },
    toggleTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.task-manager {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.add-task {
  display: flex;
  margin-bottom: 15px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.add-task button {
  background-color: #7e3af2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.task-actions {
  display: flex;
  gap: 5px;
}

.toggle-btn {
  background-color: #7e3af2;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
