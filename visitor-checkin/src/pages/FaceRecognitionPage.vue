<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-xl text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">人证比对</h1>

      <!-- 摄像头预览区域 -->
      <div class="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
        <div class="text-gray-500">
          <div class="text-4xl mb-2">📷</div>
          <p>请将脸部对准摄像头</p>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          class="bg-blue-600 h-4 rounded-full transition-all duration-500"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <!-- 提示信息 -->
      <p class="text-gray-600 mb-8">
        {{ isProcessing ? '正在进行人脸采集和比对，请稍候...' : '比对完成' }}
      </p>

      <!-- 取消按钮 -->
      <button
        @click="router.push('/checkin')"
        class="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-lg transition-all duration-300"
      >
        取消
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isProcessing = ref(true)
const progress = ref(0)
let timer: number | null = null

// 模拟人脸采集和比对过程
onMounted(() => {
  timer = window.setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      if (timer) {
        clearInterval(timer)
      }
      // 模拟比对成功，跳转到确认行程页面
      setTimeout(() => {
        router.push('/confirmation')
      }, 500)
    }
  }, 500)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

// 模拟人脸采集函数（预留桩代码）
const captureFace = async () => {
  // 这里应该调用硬件 SDK 进行人脸采集
  console.log('正在采集人脸...')
  // 模拟采集过程
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('人脸采集完成')
}

// 模拟人脸比对函数（预留桩代码）
const compareFace = async (_faceData: any) => {
  // 这里应该调用硬件 SDK 进行人脸比对
  console.log('正在进行人脸比对...')
  // 模拟比对过程
  await new Promise(resolve => setTimeout(resolve, 1500))
  console.log('人脸比对完成')
  // 假设比对成功
  return true
}
</script>
