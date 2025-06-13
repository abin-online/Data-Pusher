import Bull from 'bull';
import Redis from 'ioredis';

// Redis connection
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0')
});

// Create Bull queue
const webhookQueue = new Bull('webhook processing', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0')
  }
});

// Queue service
export class QueueService {
  private queues: { [key: string]: Bull.Queue } = {};

  constructor() {
    this.queues['webhook-processing'] = webhookQueue;
    this.setupProcessors();
  }

  async addToQueue(queueName: string, data: any, options?: Bull.JobOptions): Promise<Bull.Job> {
    const queue = this.queues[queueName];
    if (!queue) {
      throw new Error(`Queue ${queueName} not found`);
    }

    return await queue.add(data, {
      removeOnComplete: 100,
      removeOnFail: 50,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      },
      ...options
    });
  }

  private setupProcessors(): void {
   
    webhookQueue.process('webhook-processing', async (job) => {
      const { accountId, eventId, data } = job.data;
      

      const {dataHandlerUseCase} = await import('../../interface/routes/dependencyInjection/dataHandler')
      
      await dataHandlerUseCase.forwardDataToDestinations(accountId, eventId, data);
      
      return { success: true, processedAt: new Date() };
    });

    // Error handling
    webhookQueue.on('failed', (job, err) => {
      console.error(`Job ${job.id} failed:`, err);
    });

    webhookQueue.on('completed', (job, result) => {
      console.log(`Job ${job.id} completed:`, result);
    });
  }

  async getQueueStats(queueName: string): Promise<any> {
    const queue = this.queues[queueName];
    if (!queue) {
      throw new Error(`Queue ${queueName} not found`);
    }

    const [waiting, active, completed, failed] = await Promise.all([
      queue.getWaiting(),
      queue.getActive(),
      queue.getCompleted(),
      queue.getFailed()
    ]);

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length
    };
  }
}

export const queueService = new QueueService();