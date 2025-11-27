<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">行程确认</h1>

      <!-- 访客信息 -->
      <div class="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">访客信息</h2>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">姓名：</span>
            <span class="font-medium">{{ visitorInfo.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">手机号：</span>
            <span class="font-medium">{{ visitorInfo.phone }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">身份证号：</span>
            <span class="font-medium">{{ visitorInfo.idNumber }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">来访时间：</span>
            <span class="font-medium">{{ visitorInfo.visitTime }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">来访楼层：</span>
            <span class="font-medium">{{ visitorInfo.visitFloor }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">接待人工号：</span>
            <span class="font-medium">{{ visitorInfo.receptionistId }}</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div v-if="isToday" class="space-y-4">
        <button
          @click="handlePrint"
          class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          打印访客证
        </button>
        <button
          @click="router.push('/')"
          class="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          返回待机页面
        </button>
      </div>
      <div v-else class="space-y-4">
        <div class="text-red-500 text-center mb-4">
          <p class="font-medium">非当天行程或无行程记录</p>
          <p>请联系您的邀约人</p>
        </div>
        <button
          @click="handleContactHost"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          联系邀约人
        </button>
        <button
          @click="router.push('/')"
          class="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          返回待机页面
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 访客信息类型定义
interface VisitorInfo {
  name: string
  phone: string
  idNumber: string
  visitTime: string
  visitFloor: string
  receptionistId: string
}

// 模拟访客信息
const visitorInfo: VisitorInfo = {
  name: '张三',
  phone: '13800138000',
  idNumber: '110101199001011234',
  visitTime: new Date().toLocaleString('zh-CN'),
  visitFloor: '5楼',
  receptionistId: 'EMP001',
}

// 检查是否为当天行程
const isToday = () => {
  const today = new Date()
  const visitDate = new Date(visitorInfo.visitTime)
  return today.toDateString() === visitDate.toDateString()
}

const handlePrint = () => {
  // 跳转到打印页面
  router.push('/print')
}

const handleContactHost = () => {
  // 这里可以添加联系邀约人的逻辑，比如显示邀约人信息或拨打电话
  alert('请联系您的邀约人')
}
</script>
