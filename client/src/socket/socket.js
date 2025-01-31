import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL, {
  cors: {
    origin: '*', // Дозволяє підключення з будь-якого джерела
  },
  transports: ['websocket'],
});

// Обробка підключення
socket.on('connect', () => {
  console.log('Connected to WebSocket server:', socket.id);
});

// Обробка помилок
socket.on('connect_error', (err) => {
  console.error('Connection error:', err);
});

export default socket