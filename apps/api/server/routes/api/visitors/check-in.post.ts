import { PrismaClient } from '@prisma/client'
import type { VisitorCheckInRequest, VisitorResponse } from '~/server/models/visitor.model'

const prisma = new PrismaClient()

export default defineEventHandler(async (event): Promise<VisitorResponse> => {
  try {
    const body: VisitorCheckInRequest = await readBody(event)
    
    if (!body.identifier || !body.identifierType) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing identifier or identifier type'
      })
    }

    // 构建查询条件
    const where: any = {}
    if (body.identifierType === 'PHONE') {
      where.phoneNumber = body.identifier
    } else if (body.identifierType === 'ID_CARD') {
      where.idCardNumber = body.identifier
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid identifier type'
      })
    }

    // 查找今天的访客记录
    const today = new Date()
    const startOfDay = new Date(today.setHours(0, 0, 0, 0))
    const endOfDay = new Date(today.setHours(23, 59, 59, 999))
    
    where.visitTime = {
      gte: startOfDay,
      lt: endOfDay
    }

    const visitor = await prisma.visitor.findFirst({
      where
    })

    if (!visitor) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No visitor record found for today'
      })
    }

    // 如果访客已签到，直接返回
    if (visitor.checkInStatus === 'CHECKED_IN') {
      return {
        visitor: visitor as any,
        message: 'Visitor already checked in'
      }
    }

    // 更新签到状态
    const updatedVisitor = await prisma.visitor.update({
      where: { id: visitor.id },
      data: {
        checkInStatus: 'CHECKED_IN',
        checkInTime: new Date()
      }
    })

    return {
      visitor: updatedVisitor as any,
      message: 'Check-in successful'
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process check-in'
    })
  }
})