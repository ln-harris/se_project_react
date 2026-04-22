export const addClothingItem = ({ name, imageUrl, weather }) => {
  return Promise.resolve({
    _id: Date.now(),
    name,
    weather,
    link: imageUrl,
  });
};
