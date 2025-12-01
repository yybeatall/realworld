import { PrismaClient } from '@prisma/client'
import type { VisitorResponse } from '~/server/models/visitor.model'

const prisma = new PrismaClient()

export default defineEventHandler(async (event): Promise<VisitorResponse> => {
  try {
    const id = Number(getRouterParam(event, 'id'))
    
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid visitor ID'
      })
    }

    const visitor = await prisma.visitor.findUnique({
      where: { id }
    })

    if (!visitor) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Visitor not found'
      })
    }

    return {
      visitor: visitor as any
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch visitor'
    })
  }
})