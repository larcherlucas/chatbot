<template>
  <div class="chat-container">
    <ul class="messages-list" ref="messagesList">
      <li v-for="(message, index) in history"
          :key="index"
          :class="['message-wrapper', message.role === 'user' ? 'user-message' : 'assistant-message']">
        <chat-message :message="message.message" :isMainUser="message.role === 'user'" />
      </li>
    </ul>

    <div class="status-container">
      <div v-if="isPending" class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div v-else-if="isError && error" class="error-message">
        <icon-exclamation-circle class="error-icon" />
        {{ error.message }}
      </div>
    </div>

    <chat-input @onMessage="startChat" :isPending="isPending" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ChatInput from './ChatInput.vue'
import ChatMessage from './ChatMessage.vue'
import useChatMutation from '../composables/useChatMutation'

const messagesList = ref(null)
const { history, mutate, isPending, isError, error } = useChatMutation()

const scrollToBottom = () => {
  if (messagesList.value) {
    messagesList.value.scrollTop = messagesList.value.scrollHeight
  }
}

const startChat = async (query) => {
  await mutate(query)
  scrollToBottom()
}

onMounted(scrollToBottom)
watch(history, scrollToBottom)
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.messages-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  margin: 0;
  list-style: none;
  scroll-behavior: smooth;
}

.message-wrapper {
  margin-bottom: 1.5rem;
  animation: fadeIn 0.3s ease-in-out;
}

.user-message {
  display: flex;
  justify-content: flex-end;
}

.status-container {
  min-height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.typing-indicator span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--vt-c-indigo);
  animation: bounce 1s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-error, #dc2626);
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
