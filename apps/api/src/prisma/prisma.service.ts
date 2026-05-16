import { Injectable } from '@nestjs/common'

const { PrismaClient } = require('@prisma/client')
type PrismaClient = InstanceType<typeof PrismaClient>

@Injectable()
export class PrismaService {
  constructor() {}
  protected prisma: PrismaClient = new PrismaClient()
}
