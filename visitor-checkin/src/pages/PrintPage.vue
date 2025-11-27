<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <!-- 打印内容 -->
    <div id="print-content" class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">访客证</h1>
        <p class="text-gray-600">Visitor Pass</p>
      </div>

      <div class="border-t border-b border-gray-300 py-4 mb-4">
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">姓名：</span>
            <span class="font-medium text-lg">{{ visitorInfo.name }}</span>
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

      <div class="text-center text-sm text-gray-500">
        <p>本证件仅当天有效</p>
        <p>请配合工作人员检查</p>
      </div>
    </div>

    <!-- 操作按钮（不打印） -->
    <div class="mt-6 space-y-3 w-full max-w-md">
      <button
        @click="handlePrintAgain"
        class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        重新打印
      </button>
      <button
        @click="handleBack"
        class="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-lg transition-all duration-300"
      >
        返回确认页面
      </button>
    </div>

  </div>
</template>

<!-- 打印样式 -->
<style scoped>
  @media print {
    body {
      background: white;
    }
    #print-content {
      box-shadow: none;
      border: 1px solid #ccc;
    }
    button {
      display: none;
    }
  }
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

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

// 页面加载后自动打印
onMounted(() => {
  window.print()
})

const handleBack = () => {
  router.push('/confirmation')
}

const handlePrintAgain = () => {
  window.print()
}
</script>
