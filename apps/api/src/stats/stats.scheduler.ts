import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StatsService } from './stats.service';

const FINISHED_TOURNAMENT_IDS = ['1', '2', '3', '4'];

@Injectable()
export class StatsScheduler {
  private readonly logger = new Logger(StatsScheduler.name);

  constructor(private readonly statsService: StatsService) {}

  /**
   * Checks every 15 minutes for tournaments that have just completed and
   * auto-captures snapshots for any player/tournament pair that is missing one.
   * In production this would query the DB for tournaments where status changed
   * to 'completed' since the last run.
   */
  @Cron('0 */15 * * * *', { timeZone: 'UTC' })
  async handleTournamentCompletion(): Promise<void> {
    this.logger.log('Checking for newly completed tournaments…');
    try {
      for (const tournamentId of FINISHED_TOURNAMENT_IDS) {
        const result = this.statsService.captureForTournament(tournamentId);
        if (result.captured > 0) {
          this.logger.log(
            `Captured ${result.captured} snapshot(s) for tournament ${tournamentId}`,
          );
        }
      }
    } catch (err) {
      this.logger.error(
        `Snapshot auto-capture failed: ${(err as Error).message}`,
      );
    }
  }
}
