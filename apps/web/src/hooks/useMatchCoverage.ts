'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type {
  LiveMatchState,
  LiveStandingRow,
  CoverageMessage,
  LiveRoundResult,
} from '@pawn-stars/shared-types';

type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

interface UseMatchCoverageResult {
  state: LiveMatchState | null;
  standings: LiveStandingRow[];
  roundResults: LiveRoundResult[];
  coverageFeed: CoverageMessage[];
  viewers: number;
  connectionStatus: ConnectionStatus;
  lastMove: { san: string; ply: number } | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function useMatchCoverage(
  matchId: string,
  fallbackState: LiveMatchState | null = null,
): UseMatchCoverageResult {
  const [state, setState] = useState<LiveMatchState | null>(fallbackState);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [lastMove, setLastMove] = useState<{ san: string; ply: number } | null>(null);
  const socketRef = useRef<import('socket.io-client').Socket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  const connect = useCallback(() => {
    // Dynamic import to avoid SSR issues
    import('socket.io-client').then(({ io }) => {
      if (!mountedRef.current) return;

      const socket = io(`${API_URL}/live`, {
        query: { matchId },
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        transports: ['websocket', 'polling'],
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        if (!mountedRef.current) return;
        setConnectionStatus('connected');
      });

      socket.on('disconnect', () => {
        if (!mountedRef.current) return;
        setConnectionStatus('reconnecting');
      });

      socket.on('connect_error', () => {
        if (!mountedRef.current) return;
        setConnectionStatus('reconnecting');
      });

      socket.on('reconnect_failed', () => {
        if (!mountedRef.current) return;
        setConnectionStatus('disconnected');
      });

      socket.on('state_snapshot', (data: LiveMatchState) => {
        if (!mountedRef.current) return;
        setState(data);
      });

      socket.on('round_update', (data: LiveMatchState) => {
        if (!mountedRef.current) return;
        setState(data);
      });

      socket.on('result_posted', (data: LiveMatchState) => {
        if (!mountedRef.current) return;
        setState(data);
      });

      socket.on('standings_update', (standings: LiveStandingRow[]) => {
        if (!mountedRef.current) return;
        setState((prev) => (prev ? { ...prev, standings } : prev));
      });

      socket.on('coverage_message', (msg: CoverageMessage) => {
        if (!mountedRef.current) return;
        setState((prev) => {
          if (!prev) return prev;
          const feed = [msg, ...prev.coverageFeed].slice(0, 50);
          return { ...prev, coverageFeed: feed };
        });
      });

      socket.on('move_played', (data: { san: string; ply: number }) => {
        if (!mountedRef.current) return;
        setLastMove(data);
      });

      socket.on('viewer_count', (data: { viewers: number }) => {
        if (!mountedRef.current) return;
        setState((prev) => (prev ? { ...prev, viewers: data.viewers } : prev));
      });
    }).catch(() => {
      if (!mountedRef.current) return;
      setConnectionStatus('disconnected');
    });
  }, [matchId]);

  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      mountedRef.current = false;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [connect]);

  return {
    state,
    standings: state?.standings ?? [],
    roundResults: state?.roundResults ?? [],
    coverageFeed: state?.coverageFeed ?? [],
    viewers: state?.viewers ?? 0,
    connectionStatus,
    lastMove,
  };
}
