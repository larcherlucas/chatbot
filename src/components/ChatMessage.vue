<template>
  <article
    :class="['message', isMainUser ? 'user-message' : 'assistant-message']"
    :aria-label="isMainUser ? 'Your message' : 'Assistant message'"
  >
    <div class="message-content">
      <loader v-if="message === '...' && !isMainUser" />
      <div v-else class="message-text">{{ message }}</div>
    </div>
  </article>
</template>

<script setup>
import Loader from './Loader.vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  isMainUser: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.message {
  max-width: 70%;
  margin-bottom: 0.5rem;
}

.message-content {
  padding: 0.75rem 1.25rem;
  border-radius: 1.25rem;
  position: relative;
}

.user-message .message-content {
  background-color: var(--vt-c-indigo);
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.assistant-message .message-content {
  background-color: var(--color-background-soft);
  border-bottom-left-radius: 0.25rem;
}

.message-text {
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>
