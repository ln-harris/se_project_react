const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
};

export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const addClothingItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
};

export const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
