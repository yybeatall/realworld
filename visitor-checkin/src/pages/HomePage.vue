<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
    :style="{
      backgroundImage: `url(${config.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <!-- 背景遮罩 -->
    <div class="absolute inset-0 bg-black opacity-30"></div>

    <!-- 内容 -->
    <div class="relative z-10 text-center">
      <img
        :src="config.logo"
        alt="Company Logo"
        class="mx-auto mb-8"
      />
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        {{ config.welcomeMessage }}
      </h1>
      <button
        @click="handleCheckIn"
        class="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        开始签到
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟后台配置的数据
const config = {
  backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop',
  logo: 'https://via.placeholder.com/200x100?text=Company+Logo',
  welcomeMessage: '欢迎光临本公司，请点击下方按钮进行签到',
}

const handleCheckIn = () => {
  router.push('/checkin')
}
</script>
