const User = require('../models/User');
const Recipe = require('../models/Recipe');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Обробник для оновлення рецепту
    socket.on('updateRecipe', async ({ id, ...updatedFields }) => {

      try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          id,
          { $set: updatedFields },
          { new: true }
        );

        if (updatedRecipe) {
          io.emit('recipeUpdated', updatedRecipe);
        } else {
          console.log('Recipe not found for ID:', id);
        }
      } catch (error) {
        console.error('Error updating recipe:', error);
        socket.emit('error', 'Не вдалося оновити рецепт');
      }
    });


    // Обробник для оновлення даних користувача
    socket.on('updateUser', async ({ userId, point }) => {
      console.log('Received updateUser event:', { userId, point });

      try {
        // Оновлення користувача, додавання балів
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $inc: { point: point } }, // Додаємо бали до поточного значення
          { new: true } // Повертаємо оновлений документ
        );

        if (!updatedUser) {
          console.log('User not found for ID:', userId);
          return;
        }

        // Відправляємо оновлені дані користувача всім клієнтам
        io.emit('userUpdated', updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        socket.emit('error', 'Не вдалося оновити користувача');
      }
    });

    // Відключення клієнта
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
