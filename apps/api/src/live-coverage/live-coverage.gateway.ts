import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LiveCoverageService } from './live-coverage.service';

@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true },
  namespace: '/live',
})
export class LiveCoverageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly coverageService: LiveCoverageService) {}

  handleConnection(client: Socket) {
    const matchId = client.handshake.query.matchId as string | undefined;
    if (matchId) {
      client.join(matchId);
      this.coverageService.incrementViewers(matchId, 1);
      const state = this.coverageService.getState(matchId);
      if (state) {
        client.emit('state_snapshot', state);
        this.server.to(matchId).emit('viewer_count', { matchId, viewers: state.viewers });
      }
    }
  }

  handleDisconnect(client: Socket) {
    const matchId = client.handshake.query.matchId as string | undefined;
    if (matchId) {
      this.coverageService.incrementViewers(matchId, -1);
      const state = this.coverageService.getState(matchId);
      if (state) {
        this.server.to(matchId).emit('viewer_count', { matchId, viewers: state.viewers });
      }
    }
  }

  @SubscribeMessage('join_match')
  handleJoinMatch(
    @MessageBody() data: { matchId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.matchId);
    const state = this.coverageService.getState(data.matchId);
    if (state) client.emit('state_snapshot', state);
  }

  broadcastRoundUpdate(matchId: string) {
    const state = this.coverageService.getState(matchId);
    if (state) this.server.to(matchId).emit('round_update', state);
  }

  broadcastResultPosted(matchId: string) {
    const state = this.coverageService.getState(matchId);
    if (state) this.server.to(matchId).emit('result_posted', state);
  }

  broadcastStandingsUpdate(matchId: string) {
    const state = this.coverageService.getState(matchId);
    if (state) this.server.to(matchId).emit('standings_update', state.standings);
  }

  broadcastCoverageMessage(matchId: string) {
    const state = this.coverageService.getState(matchId);
    if (state && state.coverageFeed.length > 0) {
      this.server.to(matchId).emit('coverage_message', state.coverageFeed[0]);
    }
  }

  broadcastMovePlayed(matchId: string, move: { san: string; ply: number }) {
    this.server.to(matchId).emit('move_played', { matchId, ...move });
  }
}
