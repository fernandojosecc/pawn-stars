import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RatingsImportService } from './ratings-import.service';

@Injectable()
export class RatingsImportScheduler {
  private readonly logger = new Logger(RatingsImportScheduler.name);

  constructor(private readonly importer: RatingsImportService) {}

  /** Runs every night at 02:00 UTC */
  @Cron('0 2 * * *', { timeZone: 'UTC' })
  async handleNightlyImport(): Promise<void> {
    this.logger.log('Nightly ratings import triggered');
    try {
      const result = await this.importer.runImport();
      this.logger.log(
        `Nightly import complete — ${result.succeeded}/${result.totalPlayers} players synced`,
      );
    } catch (err) {
      this.logger.error(`Nightly ratings import failed: ${(err as Error).message}`);
    }
  }
}
