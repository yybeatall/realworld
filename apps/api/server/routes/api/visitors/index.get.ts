import { PrismaClient } from '@prisma/client'
import type { VisitorListResponse } from '~/server/models/visitor.model'

const prisma = new PrismaClient()

export default defineEventHandler(async (event): Promise<VisitorListResponse> => {
  try {
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10
    const skip = (page - 1) * pageSize

    // 构建查询条件
    const where: any = {}
    if (query.name) {
      where.name = { contains: query.name as string }
    }
    if (query.phoneNumber) {
      where.phoneNumber = query.phoneNumber as string
    }
    if (query.idCardNumber) {
      where.idCardNumber = query.idCardNumber as string
    }
    if (query.checkInStatus) {
      where.checkInStatus = query.checkInStatus as string
    }
    if (query.visitDate) {
      const visitDate = new Date(query.visitDate as string)
      const nextDate = new Date(visitDate)
      nextDate.setDate(nextDate.getDate() + 1)
      where.visitTime = {
        gte: visitDate,
        lt: nextDate
      }
    }

    const [visitors, total] = await Promise.all([
      prisma.visitor.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.visitor.count({ where })
    ])

    return {
      visitors: visitors as any,
      total,
      page,
      pageSize
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch visitors'
    })
  }
})