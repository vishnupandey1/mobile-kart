export const getCards = async (page = 1) => {
  let response = await fetch(
    `https://assignment-appstreet.herokuapp.com/api/v1/products?page=${page}`
  );
  let cards = response.json();
  return cards;
};

export const getProductDetails = async (id = '5aec58965a39460004b3f6dd') => {
  let response = await fetch(
    `https://assignment-appstreet.herokuapp.com/api/v1/products/${id}`
   );
  let details = response.json();
  return details;
};
