import { PrismaClient } from '@prisma/client'
import type { VisitorConfigResponse } from '~/server/models/visitor.model'

const prisma = new PrismaClient()

export default defineEventHandler(async (event): Promise<VisitorConfigResponse> => {
  try {
    const configs = await prisma.visitorConfig.findMany({
      orderBy: { key: 'asc' }
    })

    return {
      configs: configs as any
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch visitor configurations'
    })
  }
})