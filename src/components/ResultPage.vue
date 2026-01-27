<template>
  <div class="result-page">
    <!-- 加载中 -->
    <div v-if="isGenerating" class="loading">
      <div class="loading-spinner"></div>
      <p>正在生成结果图片...</p>
    </div>

    <!-- 生成好的图片 -->
    <div v-else class="image-container">
      <img
        :src="generatedImage"
        alt="测评结果"
        class="result-image"
      />
    </div>

    <!-- 提示文字 -->
    <p class="save-tip">长按图片保存到相册分享给好友</p>

    <!-- 按钮区域 -->
    <div class="button-section">
      <button class="btn" @click="downloadImage">
        保存图片
      </button>
      <button class="btn btn-secondary" @click="$emit('retry')">
        再测一次
      </button>
    </div>

    <!-- 隐藏的卡片，用于生成图片 -->
    <div class="hidden-card-wrapper">
      <div class="result-card" ref="cardRef">
        <div class="card-header">
          <span class="year-tag">2026 马年职场测评</span>
        </div>

        <div class="horse-image-area">
          <img
            v-if="horseImageSrc"
            :src="horseImageSrc"
            :alt="horse.name"
            class="horse-img"
            crossorigin="anonymous"
          />
          <div v-else class="horse-placeholder">🐴</div>
        </div>

        <div class="result-text">
          <p class="result-label">恭喜你，你是一匹</p>
          <h2 class="horse-name" :style="{ color: horse.color }">
            【{{ horse.name }}】
          </h2>
        </div>

        <div class="description-area">
          <p class="short-desc">{{ horse.shortDesc }}</p>
          <p class="long-desc">{{ horse.description }}</p>
        </div>

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

        <div class="qrcode-section">
          <p class="qrcode-text">{{ shareText }}</p>
          <div class="qrcode-wrapper">
            <img
              v-if="qrcodeImage"
              :src="qrcodeImage"
              alt="二维码"
              class="qrcode-img"
              crossorigin="anonymous"
            />
            <div v-else class="qrcode-placeholder">
              <span>二维码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import html2canvas from 'html2canvas'
import { getHorseImage } from '../assets/horses/index.js'

const props = defineProps({
  horse: {
    type: Object,
    required: true
  },
  qrcodeImage: {
    type: String,
    default: ''
  }
})

defineEmits(['retry'])

const cardRef = ref(null)
const generatedImage = ref('')
const isGenerating = ref(true)

const horseImageSrc = computed(() => {
  return getHorseImage(props.horse.id)
})

const shareText = computed(() => {
  return `我测出来是${props.horse.name}，你呢？`
})

// 生成带圆角的图片
async function generateImage() {
  try {
    await nextTick()

    // 等待图片加载完成
    await new Promise(resolve => setTimeout(resolve, 100))

    if (!cardRef.value) return

    const canvas = await html2canvas(cardRef.value, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      logging: false
    })

    // 创建带圆角的 canvas
    const roundedCanvas = document.createElement('canvas')
    const ctx = roundedCanvas.getContext('2d')
    const radius = 40 // 圆角半径（scale 2倍后的值）

    roundedCanvas.width = canvas.width
    roundedCanvas.height = canvas.height

    // 绘制圆角矩形路径
    ctx.beginPath()
    ctx.moveTo(radius, 0)
    ctx.lineTo(canvas.width - radius, 0)
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius)
    ctx.lineTo(canvas.width, canvas.height - radius)
    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height)
    ctx.lineTo(radius, canvas.height)
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius)
    ctx.lineTo(0, radius)
    ctx.quadraticCurveTo(0, 0, radius, 0)
    ctx.closePath()
    ctx.clip()

    // 绘制原图
    ctx.drawImage(canvas, 0, 0)

    generatedImage.value = roundedCanvas.toDataURL('image/png')
    isGenerating.value = false
  } catch (error) {
    console.error('生成图片失败:', error)
    isGenerating.value = false
  }
}

function downloadImage() {
  if (!generatedImage.value) return

  const link = document.createElement('a')
  link.download = `2026马年测评-${props.horse.name}.png`
  link.href = generatedImage.value
  link.click()
}

onMounted(() => {
  generateImage()
})
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #E8E0D5;
  border-top-color: #8B4513;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.image-container {
  margin-bottom: 15px;
}

.result-image {
  max-width: 350px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(139, 69, 19, 0.15);
}

.save-tip {
  font-size: 13px;
  color: #999;
  margin-bottom: 20px;
}

.button-section {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-section .btn {
  width: 100%;
}

/* 隐藏的卡片区域 */
.hidden-card-wrapper {
  position: absolute;
  left: -9999px;
  top: 0;
}

.result-card {
  width: 350px;
  padding: 25px;
  background: linear-gradient(180deg, #FDF8F3 0%, #F5F0E6 100%);
  border-radius: 20px;
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
