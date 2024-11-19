export default {
  beforeMount(el, binding) {
    // Визначаємо placeholder Base64 зображення (для початкового показу)
    const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // Це має бути ваше Base64 зображення
    el.src = placeholder; // Спочатку встановлюємо placeholder

    const loadImage = () => {
      el.src = binding.value; // Завантажуємо реальне зображення, коли воно стає видимим
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el); // Зупиняємо спостереження після завантаження зображення
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el); // Спостерігаємо за елементом
  }
};
