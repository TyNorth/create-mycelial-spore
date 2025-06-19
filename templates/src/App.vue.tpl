<script setup>
import { ref } from 'vue';

const props = defineProps({
  ctx: {
    type: Object,
    required: true,
  },
});

const message = ref('Hello from your new Mycelial Spore!');
</script>

<template>
  <div class="spore-card">
    <h3>{{ message }}</h3>
    <p>Start building your component logic here.</p>
    <p>Remember to define your needs in <code>src/contract.js</code>.</p>
  </div>
</template>

<style scoped>
.spore-card {
  background-color: #333;
  color: #fff;
  padding: 2rem;
  border-radius: 0.75rem;
  text-align: center;
  border: 1px solid #555;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>