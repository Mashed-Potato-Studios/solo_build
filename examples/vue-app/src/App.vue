<template>
  <div class="app">
    <h1>Vue.js App Example with Solo Build</h1>
    <p>This is a simple Vue.js application demonstrating Solo Build integration.</p>
    
    <div class="components">
      <Counter />
      <TaskManager />
    </div>
  </div>
</template>

<script>
import Counter from './components/Counter.vue'
import TaskManager from './components/TaskManager.vue'

export default {
  name: 'App',
  components: {
    Counter,
    TaskManager
  }
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.components {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 20px auto;
  max-width: 900px;
}
</style>
