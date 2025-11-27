<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">访客签到</h1>

      <!-- 签到类型选择 -->
      <div class="flex mb-6">
        <button
          @click="checkInType = 'phone'"
          class="flex-1 py-3 px-4 rounded-l-lg font-semibold transition-all duration-300"
          :class="
            checkInType === 'phone'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          "
        >
          手机号签到
        </button>
        <button
          @click="checkInType = 'id'"
          class="flex-1 py-3 px-4 rounded-r-lg font-semibold transition-all duration-300"
          :class="
            checkInType === 'id'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          "
        >
          身份证签到
        </button>
      </div>

      <!-- 表单 -->
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">
            {{ checkInType === 'phone' ? '请输入手机号' : '请输入身份证号' }}
          </label>
          <input
            :type="checkInType === 'phone' ? 'tel' : 'text'"
            v-model="inputValue"
            @input="setErrorMessage('')"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="checkInType === 'phone' ? '13800138000' : '110101199001011234'"
          />
          <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          下一步
        </button>
      </form>

      <!-- 返回按钮 -->
      <button
        @click="router.push('/')"
        class="w-full py-2 mt-4 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300"
      >
        ← 返回待机页面
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const checkInType = ref<'phone' | 'id'>('phone')
const inputValue = ref('')
const errorMessage = ref('')

const setErrorMessage = (message: string) => {
  errorMessage.value = message
}

const validateInput = () => {
  if (!inputValue.value.trim()) {
    setErrorMessage('请输入信息')
    return false
  }

  if (checkInType.value === 'phone') {
    // 手机号验证正则
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(inputValue.value.trim())) {
      setErrorMessage('请输入有效的手机号')
      return false
    }
  } else {
    // 身份证号验证正则
    const idRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
    if (!idRegex.test(inputValue.value.trim())) {
      setErrorMessage('请输入有效的身份证号')
      return false
    }
  }

  return true
}

const handleSubmit = () => {
  if (validateInput()) {
    // 模拟验证访客信息
    console.log(`Checking in with ${checkInType.value}: ${inputValue.value}`)
    // 这里应该调用 API 验证访客信息
    // 假设验证成功，跳转到人脸比对页面
    router.push('/face-recognition')
  }
}
</script>
