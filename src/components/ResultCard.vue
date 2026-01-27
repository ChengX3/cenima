<template>
  <div class="result-card" ref="cardRef">
    <div class="card-header">
      <span class="year-tag">2026 马年职场测评</span>
    </div>

    <!-- 马的图片区域 -->
    <div class="horse-image-area">
      <img
        v-if="horseImage"
        :src="horseImage"
        :alt="horse.name"
        class="horse-img"
      />
      <div v-else class="horse-placeholder">
        🐴
      </div>
    </div>

    <!-- 结果文字 -->
    <div class="result-text">
      <p class="result-label">恭喜你，你是一匹</p>
      <h2 class="horse-name" :style="{ color: horse.color }">
        【{{ horse.name }}】
      </h2>
    </div>

    <!-- 描述 -->
    <div class="description-area">
      <p class="short-desc">{{ horse.shortDesc }}</p>
      <p class="long-desc">{{ horse.description }}</p>
    </div>

    <!-- 属性值 -->
    <div class="attributes">
      <div
        v-for="(value, key) in horse.attributes"
        :key="key"
        class="attr-item"
      >
        <span class="attr-name">{{ key }}</span>
        <div class="attr-bar">
          <div class="attr-fill" :style="{ width: value + '%' }"></div>
        </div>
        <span class="attr-value">{{ value }}%</span>
      </div>
    </div>

    <!-- 二维码区域 -->
    <div class="qrcode-section">
      <p class="qrcode-text">{{ shareText }}</p>
      <div class="qrcode-wrapper">
        <img
          v-if="qrcodeImage"
          :src="qrcodeImage"
          alt="二维码"
          class="qrcode-img"
        />
        <div v-else class="qrcode-placeholder">
          <span>二维码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  horse: {
    type: Object,
    required: true
  },
  horseImage: {
    type: String,
    default: ''
  },
  qrcodeImage: {
    type: String,
    default: ''
  },
  shareText: {
    type: String,
    default: '扫码测你是什么马'
  }
})

const cardRef = ref(null)

defineExpose({
  cardRef
})
</script>

<style scoped>
.result-card {
  width: 350px;
  padding: 25px;
  background: linear-gradient(180deg, #FDF8F3 0%, #F5F0E6 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(139, 69, 19, 0.15);
}

.card-header {
  text-align: center;
  margin-bottom: 20px;
}

.year-tag {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, #D2691E 0%, #8B4513 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 15px;
}

.horse-image-area {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 20px rgba(139, 69, 19, 0.1);
}

.horse-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.horse-placeholder {
  font-size: 80px;
}

.result-text {
  text-align: center;
  margin-bottom: 15px;
}

.result-label {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
}

.horse-name {
  font-size: 28px;
  font-weight: 700;
}

.description-area {
  text-align: center;
  margin-bottom: 20px;
}

.short-desc {
  font-size: 16px;
  color: #D2691E;
  font-weight: 600;
  margin-bottom: 10px;
}

.long-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.attributes {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
}

.attr-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.attr-item:last-child {
  margin-bottom: 0;
}

.attr-name {
  width: 70px;
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
}

.attr-bar {
  flex: 1;
  height: 8px;
  background: #F0E8E0;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 10px;
}

.attr-fill {
  height: 100%;
  background: linear-gradient(90deg, #D2691E, #8B4513);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.attr-value {
  width: 40px;
  font-size: 12px;
  color: #8B4513;
  font-weight: 600;
  text-align: right;
}

.qrcode-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  border-top: 1px dashed #E0D5C5;
}

.qrcode-text {
  font-size: 14px;
  color: #888;
  flex: 1;
}

.qrcode-wrapper {
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.qrcode-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qrcode-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #ccc;
  border: 1px dashed #ddd;
  border-radius: 8px;
}
</style>
