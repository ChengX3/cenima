<template>
  <div class="app">
    <Transition name="fade" mode="out-in">
      <!-- 开始页 -->
      <StartPage
        v-if="currentPage === 'start'"
        :question-count="questions.length"
        @start="startTest"
      />

      <!-- 答题页 -->
      <Question
        v-else-if="currentPage === 'question'"
        :key="currentQuestionIndex"
        :question="currentQuestion"
        :current-index="currentQuestionIndex"
        :total="questions.length"
        @answer="handleAnswer"
      />

      <!-- 结果页 -->
      <ResultPage
        v-else-if="currentPage === 'result'"
        :horse="resultHorse"
        :qrcode-image="qrcodeImage"
        @retry="retryTest"
      />
    </Transition>

    <footer class="global-footer">
      <p>项目素材来自网络 如有侵权请联系删除</p>
      <p>本项目使用 <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache-2.0 license</a> 协议开源</p>
      <p>开源地址：<a href="https://github.com/ChengX3/nishishenma" target="_blank">github.com/ChengX3/nishishenma</a></p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StartPage from './components/StartPage.vue'
import Question from './components/Question.vue'
import ResultPage from './components/ResultPage.vue'
import { questions } from './data/questions.js'
import { calculateResult } from './utils/calculate.js'
import qrcodeImage from './assets/qrcode/qrcode.png'

// 页面状态：start | question | result
const currentPage = ref('start')

// 当前题目索引
const currentQuestionIndex = ref(0)

// 用户答案
const answers = ref([])

// 计算结果
const resultHorse = ref(null)

// 当前题目
const currentQuestion = computed(() => {
  return questions[currentQuestionIndex.value]
})

// 开始测试
function startTest() {
  currentPage.value = 'question'
  currentQuestionIndex.value = 0
  answers.value = []
}

// 处理答题
function handleAnswer(answer) {
  answers.value.push(answer)

  if (currentQuestionIndex.value < questions.length - 1) {
    // 下一题
    currentQuestionIndex.value++
  } else {
    // 计算结果
    const result = calculateResult(answers.value, questions)
    resultHorse.value = result.horse
    currentPage.value = 'result'
  }
}

// 重新测试
function retryTest() {
  currentPage.value = 'start'
  currentQuestionIndex.value = 0
  answers.value = []
  resultHorse.value = null
}
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.global-footer {
  text-align: center;
  padding: 20px 15px;
  margin-top: auto;
  font-size: 11px;
  color: #aaa;
  line-height: 1.8;
}

.global-footer a {
  color: #999;
  text-decoration: underline;
}
</style>
