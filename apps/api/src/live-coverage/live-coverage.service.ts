import { Injectable } from '@nestjs/common';
import {
  LiveMatchState,
  LiveRoundResult,
  LiveStandingRow,
  CoverageMessage,
} from '@pawn-stars/shared-types';

const DEMO_PLAYERS = [
  { id: 'p1', name: 'Magnus Carlsen' },
  { id: 'p2', name: 'Fabiano Caruana' },
  { id: 'p3', name: 'Hikaru Nakamura' },
  { id: 'p4', name: 'Alireza Firouzja' },
];

function buildStandings(results: LiveRoundResult[]): LiveStandingRow[] {
  const map = new Map<string, LiveStandingRow>();
  for (const p of DEMO_PLAYERS) {
    map.set(p.name, {
      playerId: p.id,
      playerName: p.name,
      points: 0,
      gamesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
    });
  }
  for (const r of results) {
    if (r.result === '*') continue;
    const w = map.get(r.whitePlayerName)!;
    const b = map.get(r.blackPlayerName)!;
    w.gamesPlayed++;
    b.gamesPlayed++;
    if (r.result === '1-0') {
      w.points += 1; w.wins++;
      b.losses++;
    } else if (r.result === '0-1') {
      b.points += 1; b.wins++;
      w.losses++;
    } else {
      w.points += 0.5; w.draws++;
      b.points += 0.5; b.draws++;
    }
  }
  return [...map.values()].sort((a, b) => b.points - a.points);
}

@Injectable()
export class LiveCoverageService {
  private states = new Map<string, LiveMatchState>();

  seedDemoMatch(matchId: string): LiveMatchState {
    const state: LiveMatchState = {
      matchId,
      tournamentName: 'Pawn Stars Open 2026',
      roundLabel: 'Round 1',
      currentRound: 1,
      totalRounds: 3,
      status: 'live',
      viewers: 1,
      standings: buildStandings([]),
      roundResults: [],
      coverageFeed: [
        {
          id: 'init-1',
          matchId,
          text: 'Welcome to live coverage of the Pawn Stars Open 2026!',
          author: 'Chief Arbiter',
          timestamp: new Date().toISOString(),
        },
      ],
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.states.set(matchId, state);
    return state;
  }

  getState(matchId: string): LiveMatchState | undefined {
    return this.states.get(matchId);
  }

  getAllLive(): LiveMatchState[] {
    return [...this.states.values()].filter((s) => s.status === 'live');
  }

  addRoundResult(matchId: string, result: LiveRoundResult): LiveMatchState | undefined {
    const state = this.states.get(matchId);
    if (!state) return undefined;
    state.roundResults.push(result);
    state.standings = buildStandings(state.roundResults);
    state.roundLabel = `Round ${result.roundNumber}`;
    state.currentRound = result.roundNumber;
    state.updatedAt = new Date().toISOString();
    return state;
  }

  addCoverageMessage(matchId: string, msg: Omit<CoverageMessage, 'id' | 'matchId'>): LiveMatchState | undefined {
    const state = this.states.get(matchId);
    if (!state) return undefined;
    const full: CoverageMessage = {
      id: `msg-${Date.now()}`,
      matchId,
      ...msg,
    };
    state.coverageFeed.unshift(full);
    if (state.coverageFeed.length > 50) state.coverageFeed.pop();
    state.updatedAt = new Date().toISOString();
    return state;
  }

  incrementViewers(matchId: string, delta: 1 | -1): void {
    const state = this.states.get(matchId);
    if (!state) return;
    state.viewers = Math.max(0, state.viewers + delta);
  }

  finishMatch(matchId: string): void {
    const state = this.states.get(matchId);
    if (state) state.status = 'finished';
  }
}
