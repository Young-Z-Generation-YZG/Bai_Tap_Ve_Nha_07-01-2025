import { Socket } from 'socket.io-client';
import config from '~/src/infrastructure/config/env';


class SocketService {
  socket: typeof Socket | null = null;

  constructor() {
    this.socket = null;
  }

  connect() {
    if (this.socket && this.socket.connected) {
      console.log('Socket already connected');
      return;
    }

    this.socket = io(config.api.url, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      transports: ['websocket'],
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });



    this.socket.on('disconnect', () => {
      console.log('Socket disconnected:');
    });

  }

  authenticate(userId: string) {
    if (this.socket) {
      this.socket.emit('authenticate-user', { "userId": userId });
      console.log('Authenticated as', 'with ID:', userId);
    } else {
      console.warn('Socket not connected, cannot authenticate');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return !!this.socket?.connected;
  }

  getSocketId(): string | null {
    return this.socket?.id || null;
  }
}

// Create a singleton instance
const socketService = new SocketService();

export default socketService;
