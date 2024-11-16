<template>
  <div class="typing-loader" role="status" aria-label="Loading">
    <div class="typing-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style scoped>
.typing-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  min-height: 2rem;
}

.typing-dots {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--color-background-bubble-soft, #3b82f6);
  border-radius: 50%;
  opacity: 0.6;
  transform: scale(0.5);
}

.dot:nth-child(1) {
  animation: typingAnimation 1.4s infinite;
}

.dot:nth-child(2) {
  animation: typingAnimation 1.4s infinite;
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation: typingAnimation 1.4s infinite;
  animation-delay: 0.4s;
}

@keyframes typingAnimation {
  0% {
    transform: scale(0.5);
    opacity: 0.6;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0.6;
  }
}

/* Pour les navigateurs qui supportent la réduction des animations */
@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none;
  }
  .typing-dots {
    gap: 0.4rem;
  }
  .dot {
    opacity: 0.8;
    transform: scale(0.8);
  }
}
</style>
