export const getProductVariation = (product_variations, selected_ids) => {
  selected_ids = selected_ids.sort();
  let product_variation = product_variations.filter(product_variation => (
    product_variation.sign.sort().every((value, index) => value === selected_ids[index])
  ));

  return product_variation;
};