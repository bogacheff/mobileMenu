export const formatPrice = (price) => {
  price = String(price);
  if (price.split('.')[1] && price.split('.')[1].length !== 2) {
    let afterDot = price.split('.')[1].slice(0, 2);
    if (afterDot.length === 1) afterDot = `${afterDot}0`;
    price = `${price.split('.')[0]}.${afterDot}`;
  } else if (!price.split('.')[1]) {
    price = `${price}.00`;
  }
  return price;
};
