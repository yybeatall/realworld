import { PrismaClient } from '@prisma/client'
import type { CreateVisitorRequest, VisitorResponse } from '~/server/models/visitor.model'

const prisma = new PrismaClient()

export default defineEventHandler(async (event): Promise<VisitorResponse> => {
  try {
    const body: CreateVisitorRequest = await readBody(event)
    
    // 验证必填字段
    if (!body.name || !body.phoneNumber || !body.idCardNumber || !body.visitTime || !body.visitFloor || !body.receptionistId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(body.phoneNumber)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid phone number format'
      })
    }

    // 验证身份证号格式
    const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/
    if (!idCardRegex.test(body.idCardNumber)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid ID card number format'
      })
    }

    // 检查是否已存在相同手机号或身份证号的访客
    const existingVisitor = await prisma.visitor.findFirst({
      where: {
        OR: [
          { phoneNumber: body.phoneNumber },
          { idCardNumber: body.idCardNumber }
        ],
        visitTime: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }
    })

    if (existingVisitor) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Visitor already exists for today'
      })
    }

    const visitor = await prisma.visitor.create({
      data: {
        name: body.name,
        phoneNumber: body.phoneNumber,
        idCardNumber: body.idCardNumber,
        visitTime: new Date(body.visitTime),
        visitFloor: body.visitFloor,
        receptionistId: body.receptionistId,
        isRegistered: false,
        checkInStatus: 'PENDING',
        verificationStatus: 'PENDING'
      }
    })

    return {
      visitor: visitor as any,
      message: 'Visitor created successfully'
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create visitor'
    })
  }
})