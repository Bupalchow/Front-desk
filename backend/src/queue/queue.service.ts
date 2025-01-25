import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from '../typeorm/entities/Queue.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private queueRepository: Repository<Queue>,
  ) {}

  async addToQueue(patientName: string): Promise<Queue> {
    const latestQueue = await this.queueRepository.find({
      order: { queueNumber: 'DESC' },
      take: 1,
    });

    const newQueueNumber = latestQueue.length > 0 ? latestQueue[0].queueNumber + 1 : 1;

    const queue = this.queueRepository.create({
      patientName,
      queueNumber: newQueueNumber,
      status: 'waiting',
    });

    return this.queueRepository.save(queue);
  }

  async updateStatus(id: number, status: string): Promise<Queue> {
    const queue = await this.queueRepository.findOne({ where: { id } });
    if (!queue) {
      throw new NotFoundException(`Queue with ID ${id} not found`);
    }

    queue.status = status;
    return this.queueRepository.save(queue);
  }

  async getQueue(): Promise<Queue[]> {
    return this.queueRepository.find({
      order: { queueNumber: 'ASC' },
      where: [
        { status: 'waiting' },
        { status: 'with_doctor' }
      ],
    });
  }

  async removeFromQueue(id: number): Promise<void> {
    const queue = await this.queueRepository.findOne({ where: { id } });
    if (!queue) {
      throw new NotFoundException(`Queue with ID ${id} not found`);
    }
    await this.queueRepository.remove(queue);
  }
}