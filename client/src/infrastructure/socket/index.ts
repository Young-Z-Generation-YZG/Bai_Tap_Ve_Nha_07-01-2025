import { Socket } from 'socket.io-client';
import config from '~/src/infrastructure/config/env';


class SocketService {
  private socket: typeof Socket | null = null;
  private listeners: Map<string, ((...args: any[]) => void)[]> = new Map();

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

      this.authenticate("664439317954a1ae3c523650", "USER");
    });



    this.socket.on('disconnect', () => {
      console.log('Socket disconnected:');
    });

    // this.socket.on('connect_error', (error) => {
    //   console.error('Socket connection error:', error);
    // });

    // this.socket.on('reconnect', (attemptNumber) => {
    //   console.log('Socket reconnected after', attemptNumber, 'attempts');
    // });

    // this.socket.on('reconnect_attempt', (attemptNumber) => {
    //   console.log('Socket reconnection attempt:', attemptNumber);
    // });

    // this.socket.on('reconnect_error', (error) => {
    //   console.error('Socket reconnection error:', error);
    // });

    // this.socket.on('reconnect_failed', () => {
    //   console.error('Socket reconnection failed');
    // });
  }

  authenticate(userId: string, role: string) {
    if (this.socket) {
      this.socket.emit('authenticate-user', { "userId": userId, "role": role });
      console.log('Authenticated as', role, 'with ID:', userId);
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

//   emit(event: string, ...args: any[]) {
//     if (!this.socket || !this.socket.connected) {
//       console.warn('Socket not connected, cannot emit', event);
//       return false;
//     }
//     this.socket.emit(event, ...args);
//     return true;
//   }

//   on(event: string, callback: (...args: any[]) => void) {
//     if (!this.socket) {
//       console.warn('Socket not initialized, cannot listen to', event);
//       return () => {};
//     }

//     const eventListeners = this.listeners.get(event) || [];
//     eventListeners.push(callback);
//     this.listeners.set(event, eventListeners);

//     this.socket.on(event, callback);

//     // Return unsubscribe function
//     return () => this.off(event, callback);
//   }

//   off(event: string, callback?: (...args: any[]) => void) {
//     if (!this.socket) return;

//     if (callback) {
//       this.socket.off(event, callback);
      
//       // Remove specific callback from listeners
//       const eventListeners = this.listeners.get(event) || [];
//       this.listeners.set(
//         event,
//         eventListeners.filter((cb) => cb !== callback)
//       );
//     } else {
//       // Remove all listeners for this event
//       this.socket.off(event);
//       this.listeners.delete(event);
//     }
//   }

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
