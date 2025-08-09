const connectionString = process.env.REDIS_URL

export type JobPayload = { agentId: string; input: any }

export class Queue<T = JobPayload> {
  private queue?: any
  private scheduler?: any
  constructor(private name: string) {
    if (connectionString) {
      try {
        const { Queue, QueueScheduler } = require('bullmq') as any
        const IORedis = require('ioredis') as any
        const connection = new IORedis(connectionString)
  this.queue = new Queue(name, { connection })
        this.scheduler = new QueueScheduler(name, { connection })
      } catch (e) {
        console.warn('[queue] bullmq/ioredis not installed; using fallback')
      }
    }
  }
  async add(name: string, data: T, opts?: any) {
    if (!this.queue) {
      // no-op fallback
      console.log(`[queue:fallback] ${this.name}:${name}`, data)
      return { id: `local-${Date.now()}` }
    }
    return this.queue.add(name, data, { attempts: 3, backoff: { type: 'exponential', delay: 1000 }, removeOnComplete: 100, removeOnFail: 1000, ...opts })
  }
}

export function createWorker<T = JobPayload>(name: string, processor: (data: T) => Promise<void>) {
  if (!connectionString) {
    console.warn(`[worker:fallback] Redis not configured; background jobs disabled`)
    return null
  }
  try {
    const { Worker } = require('bullmq') as any
    const IORedis = require('ioredis') as any
    const connection = new IORedis(connectionString)
  const worker = new Worker(name, async (job: any) => {
      await processor(job.data)
    }, { connection })
    worker.on('failed', (job: any, err: any) => {
      console.error(`[worker:${name}] job ${job?.id} failed`, err)
    })
    return worker
  } catch (e) {
    console.warn('[worker] bullmq/ioredis not installed; running in fallback')
    return null
  }
}
