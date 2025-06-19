import { createApp } from 'vue';
import App from './App.vue';
import { contract } from './contract.js';

export { contract };

export function mount(element, ctx) {
  const app = createApp(App, { ctx: ctx });
  app.mount(element);
}
