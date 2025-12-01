import { PrismaClient } from '@prisma/client'
import type { VisitorVerificationRequest, VisitorResponse } from '~/server/models/visitor.model'

const prisma = new PrismaClient()

export default defineEventHandler(async (event): Promise<VisitorResponse> => {
  try {
    const id = Number(getRouterParam(event, 'id'))
    const body: VisitorVerificationRequest = await readBody(event)
    
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid visitor ID'
      })
    }

    if (typeof body.verificationResult !== 'boolean') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Verification result is required'
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

    // 更新验证状态
    const updatedVisitor = await prisma.visitor.update({
      where: { id },
      data: {
        verificationStatus: body.verificationResult ? 'VERIFIED' : 'FAILED',
        updatedAt: new Date()
      }
    })

    return {
      visitor: updatedVisitor as any,
      message: body.verificationResult ? 'Verification successful' : 'Verification failed'
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process verification'
    })
  }
})