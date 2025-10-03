export const generateGreetings = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 0 && hour < 11) {
    return "Selamat pagi";
  } else if (hour >= 11 && hour < 15) {
    return "Selamat siang";
  } else if (hour >= 15 && hour < 18) {
    return "Selamat sore";
  } else {
    return "Selamat malam";
  }
};
