import { io } from 'socket.io-client';

// Вказуйте адресу без зайвого слеша
const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'], // Пряме з'єднання через WebSocket (без поллінгу)
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