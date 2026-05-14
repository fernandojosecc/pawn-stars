import { Module } from '@nestjs/common';
import { LiveCoverageGateway } from './live-coverage.gateway';
import { LiveCoverageService } from './live-coverage.service';
import { LiveCoverageSimulator } from './live-coverage.simulator';

@Module({
  providers: [LiveCoverageService, LiveCoverageGateway, LiveCoverageSimulator],
  exports: [LiveCoverageService],
})
export class LiveCoverageModule {}
