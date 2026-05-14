import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { LiveCoverageService } from './live-coverage.service';
import { LiveCoverageGateway } from './live-coverage.gateway';

const DEMO_MATCH_ID = 'demo-2026-round1';

const SCRIPT: Array<{
  delay: number; // ms from start
  action: string;
  data: Record<string, unknown>;
}> = [
  { delay: 5_000, action: 'move', data: { san: 'e4', ply: 1 } },
  { delay: 10_000, action: 'move', data: { san: 'e5', ply: 2 } },
  { delay: 15_000, action: 'move', data: { san: 'Nf3', ply: 3 } },
  { delay: 20_000, action: 'move', data: { san: 'Nc6', ply: 4 } },
  { delay: 25_000, action: 'message', data: { text: 'Both games off to sharp starts. Ruy Lopez and Nimzo-Indian on adjacent boards.', author: 'GM Commentator' } },
  {
    delay: 30_000, action: 'result', data: {
      roundNumber: 1,
      whitePlayerName: 'Magnus Carlsen',
      blackPlayerName: 'Fabiano Caruana',
      result: '1-0',
      moves: 42,
    },
  },
  { delay: 35_000, action: 'message', data: { text: 'Carlsen converts the endgame advantage cleanly. 1-0 in 42 moves.', author: 'GM Commentator' } },
  { delay: 40_000, action: 'move', data: { san: 'd4', ply: 5 } },
  { delay: 45_000, action: 'move', data: { san: 'Nf6', ply: 6 } },
  {
    delay: 60_000, action: 'result', data: {
      roundNumber: 1,
      whitePlayerName: 'Hikaru Nakamura',
      blackPlayerName: 'Alireza Firouzja',
      result: '1/2-1/2',
      moves: 55,
    },
  },
  { delay: 65_000, action: 'message', data: { text: 'Nakamura-Firouzja drawn after a perpetual check in a sharp Sicilian. An exciting round 1!', author: 'GM Commentator' } },
  {
    delay: 90_000, action: 'result', data: {
      roundNumber: 2,
      whitePlayerName: 'Fabiano Caruana',
      blackPlayerName: 'Alireza Firouzja',
      result: '0-1',
      moves: 61,
    },
  },
  { delay: 95_000, action: 'message', data: { text: 'Firouzja bounces back with a stunning kingside attack in round 2. Firouzja leads with 1.5/2!', author: 'GM Commentator' } },
  {
    delay: 120_000, action: 'result', data: {
      roundNumber: 2,
      whitePlayerName: 'Magnus Carlsen',
      blackPlayerName: 'Hikaru Nakamura',
      result: '1-0',
      moves: 38,
    },
  },
  { delay: 125_000, action: 'message', data: { text: 'Carlsen dominant again. He leads with 2/2. Final round will be decisive!', author: 'GM Commentator' } },
];

@Injectable()
export class LiveCoverageSimulator implements OnModuleInit, OnModuleDestroy {
  private timers: NodeJS.Timeout[] = [];

  constructor(
    private readonly coverageService: LiveCoverageService,
    private readonly gateway: LiveCoverageGateway,
  ) {}

  onModuleInit() {
    this.coverageService.seedDemoMatch(DEMO_MATCH_ID);

    for (const step of SCRIPT) {
      const t = setTimeout(() => this.executeStep(step), step.delay);
      this.timers.push(t);
    }
  }

  onModuleDestroy() {
    for (const t of this.timers) clearTimeout(t);
  }

  private executeStep(step: (typeof SCRIPT)[number]) {
    const matchId = DEMO_MATCH_ID;
    if (step.action === 'move') {
      this.gateway.broadcastMovePlayed(matchId, step.data as { san: string; ply: number });
    } else if (step.action === 'message') {
      const d = step.data as { text: string; author: string };
      this.coverageService.addCoverageMessage(matchId, { ...d, timestamp: new Date().toISOString() });
      this.gateway.broadcastCoverageMessage(matchId);
    } else if (step.action === 'result') {
      const d = step.data as unknown as Parameters<typeof this.coverageService.addRoundResult>[1];
      this.coverageService.addRoundResult(matchId, d);
      this.gateway.broadcastResultPosted(matchId);
      this.gateway.broadcastStandingsUpdate(matchId);
    }
  }
}
