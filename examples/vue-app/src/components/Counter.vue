<template>
  <div class="counter">
    <h2>Counter</h2>
    <p>Count: {{ count }}</p>
    <div class="buttons">
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
}
</script>

<style scoped>
.counter {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

button {
  background-color: #7e3af2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #6929c4;
}
</style>
