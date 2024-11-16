<template>
  <div class="chat-input-wrapper">
    <form @submit.prevent="sendMessage" class="chat-input-container">
      <input
        v-model="query"
        type="text"
        class="message-input"
        placeholder="Type your message..."
        :disabled="isPending"
        aria-label="Message input"
      />
      <button
        type="submit"
        class="send-button"
        :disabled="!query.trim() || isPending"
      >
        <span class="button-text">Send</span>
        <icon-send class="send-icon" />
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const events = defineEmits(['onMessage'])
const props = defineProps({
  isPending: {
    type: Boolean,
    default: false,
  },
})

const query = ref('')

const sendMessage = () => {
  const message = query.value.trim()
  if (!message || props.isPending) return

  events('onMessage', message)
  query.value = ''
}
</script>

<style scoped>
.chat-input-wrapper {
  background: linear-gradient(
    to top,
    var(--color-background) 80%,
    transparent
  );
  padding: 1rem;
}

.chat-input-container {
  display: flex;
  gap: 0.75rem;
  max-width: 900px;
  margin: 0 auto;
}

.message-input {
  flex: 1;
  padding: 0.875rem 1.25rem;
  border-radius: 1.5rem;
  border: 2px solid var(--color-border);
  background-color: var(--color-background);
  transition: all 0.2s ease;
}

.message-input:focus {
  outline: none;
  border-color: var(--vt-c-indigo);
  box-shadow: 0 0 0 2px var(--vt-c-indigo-soft);
}

.message-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.send-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 1.5rem;
  border: none;
  background-color: var(--vt-c-indigo);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.send-button:hover:not(:disabled) {
  background-color: var(--vt-c-indigo-dark);
  transform: translateY(-1px);
}

.send-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.send-icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 640px) {
  .button-text {
    display: none;
  }

  .send-button {
    padding: 0.875rem;
  }
}
</style>
