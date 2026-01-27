<template>
  <div class="question-page">
    <!-- 进度条 -->
    <div class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <div class="progress-text">{{ currentIndex + 1 }} / {{ total }}</div>
    </div>

    <!-- 题目 -->
    <div class="question-content">
      <h2 class="question-number">Q{{ currentIndex + 1 }}</h2>
      <p class="question-text">{{ question.question }}</p>
    </div>

    <!-- 选项 -->
    <div class="options">
      <div
        v-for="(option, index) in question.options"
        :key="index"
        class="option-item"
        :class="{ 'selected': selectedIndex === index }"
        @click="selectOption(index)"
      >
        <span class="option-letter">{{ letters[index] }}</span>
        <span class="option-text">{{ option.text }}</span>
      </div>
    </div>

    <!-- 下一题按钮 -->
    <div class="action-section">
      <button
        class="btn next-btn"
        :disabled="selectedIndex === null"
        @click="nextQuestion"
      >
        {{ isLast ? '查看结果' : '下一题' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['answer'])

const letters = ['A', 'B', 'C', 'D']
const selectedIndex = ref(null)

const progressPercent = computed(() => {
  return ((props.currentIndex) / props.total) * 100
})

const isLast = computed(() => {
  return props.currentIndex === props.total - 1
})

function selectOption(index) {
  selectedIndex.value = index
}

function nextQuestion() {
  if (selectedIndex.value !== null) {
    emit('answer', {
      questionId: props.question.id,
      optionIndex: selectedIndex.value
    })
    selectedIndex.value = null
  }
}
</script>

<style scoped>
.question-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  box-sizing: border-box;
}

.progress-section {
  margin-bottom: 30px;
}

.progress-text {
  text-align: right;
  font-size: 13px;
  color: #888;
  margin-top: 8px;
}

.question-content {
  margin-bottom: 30px;
}

.question-number {
  font-size: 16px;
  color: #D2691E;
  font-weight: 600;
  margin-bottom: 12px;
}

.question-text {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  line-height: 1.5;
}

.options {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  border: 2px solid #E8E0D5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.option-item:hover {
  border-color: #D2B48C;
  background: #FFFAF5;
}

.option-item.selected {
  border-color: #8B4513;
  background: linear-gradient(135deg, #FFF8F0 0%, #FFEFE0 100%);
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #F5F0E6;
  color: #8B4513;
  font-size: 14px;
  font-weight: 600;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
}

.option-item.selected .option-letter {
  background: #8B4513;
  color: #fff;
}

.option-text {
  font-size: 15px;
  color: #333;
  line-height: 1.4;
}

.action-section {
  padding: 20px 0;
  margin-top: auto;
}

.next-btn {
  width: 100%;
  opacity: 1;
  transition: opacity 0.2s;
}

.next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
