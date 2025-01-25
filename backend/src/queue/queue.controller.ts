import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  addToQueue(@Body('patientName') patientName: string) {
    return this.queueService.addToQueue(patientName);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ) {
    return this.queueService.updateStatus(id, status);
  }

  @Get()
  getQueue() {
    return this.queueService.getQueue();
  }

  @Delete(':id')
  removeFromQueue(@Param('id') id: number) {
    return this.queueService.removeFromQueue(id);
  }
}