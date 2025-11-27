import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import CheckInPage from './pages/CheckInPage.vue'
import FaceRecognitionPage from './pages/FaceRecognitionPage.vue'
import ConfirmationPage from './pages/ConfirmationPage.vue'
import PrintPage from './pages/PrintPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/checkin', component: CheckInPage },
    { path: '/face-recognition', component: FaceRecognitionPage },
    { path: '/confirmation', component: ConfirmationPage },
    { path: '/print', component: PrintPage },
  ],
})

export default router
