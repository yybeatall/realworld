import { PrismaClient } from '@prisma/client'
import type { UpdateConfigRequest, VisitorConfigResponse } from '~/server/models/visitor.model'

const prisma = new PrismaClient()

export default defineEventHandler(async (event): Promise<{ message: string }> => {
  try {
    const body: UpdateConfigRequest = await readBody(event)
    
    if (!body.key || !body.value) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Key and value are required'
      })
    }

    // 检查配置项是否存在
    const existingConfig = await prisma.visitorConfig.findUnique({
      where: { key: body.key }
    })

    if (existingConfig) {
      // 更新现有配置
      await prisma.visitorConfig.update({
        where: { key: body.key },
        data: {
          value: body.value,
          description: body.description,
          updatedAt: new Date()
        }
      })
    } else {
      // 创建新配置
      await prisma.visitorConfig.create({
        data: {
          key: body.key,
          value: body.value,
          description: body.description
        }
      })
    }

    return {
      message: 'Configuration updated successfully'
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update configuration'
    })
  }
})