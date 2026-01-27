<template>
  <div class="start-page">
    <div class="content">
      <div class="title-section">
        <div class="year-badge">2026</div>
        <h1 class="main-title">马年职场测评</h1>
        <p class="subtitle">测测你是什么马</p>
      </div>

      <div class="horse-emoji">
        🐴
      </div>

      <div class="desc-section">
        <p class="desc-text">
          2026马年到了<br>
          打工人的精神状态还好吗？<br>
          快来测测你是职场里的什么马！
        </p>
      </div>

      <div class="examples">
        <span class="example-tag">🐂 牛马</span>
        <span class="example-tag">🙉 白聋马</span>
        <span class="example-tag">🔪 刀马</span>
        <span class="example-tag">🍔 饿了马</span>
      </div>

      <button class="btn start-btn" @click="$emit('start')">
        开始测评
      </button>

      <p class="tip">共 {{ questionCount }} 道题，测完生成专属结果图</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  questionCount: {
    type: Number,
    required: true
  }
})

defineEmits(['start'])
</script>

<style scoped>
.start-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.content {
  text-align: center;
  max-width: 350px;
}

.title-section {
  margin-bottom: 20px;
}

.year-badge {
  display: inline-block;
  padding: 6px 20px;
  background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 12px;
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  color: #8B4513;
  margin-bottom: 8px;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 18px;
  color: #666;
}

.horse-emoji {
  font-size: 80px;
  margin: 30px 0;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.desc-section {
  margin-bottom: 25px;
}

.desc-text {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
}

.examples {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 35px;
}

.example-tag {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(139, 69, 19, 0.1);
  color: #8B4513;
  font-size: 13px;
  border-radius: 15px;
}

.start-btn {
  width: 100%;
  max-width: 200px;
  font-size: 20px;
  padding: 16px 40px;
}

.tip {
  margin-top: 20px;
  font-size: 13px;
  color: #999;
}
</style>
