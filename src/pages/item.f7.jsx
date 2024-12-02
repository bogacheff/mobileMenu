import { formatPrice } from '../js/format-price.js';
import './item.less';

export default (props, ctx) => {
  const id = parseInt(props.id, 10);
  const { $store, $f7, $onMounted, $onBeforeUnmount, $ref } = ctx;
  const { items, favoriteItems, cart } = $store.getters;

  const item = items.value.filter((el) => el.id === id)[0];
  const currentPrice = $ref(item.prices ? item.prices[0].value : item.price);
  const currentPriceTitle = $ref(item.prices ? item.prices[0].title : '');
  const quantity = $ref(1);

  const setCurrentPrice = (priceObj) => {
    currentPrice.value = priceObj.value;
    currentPriceTitle.value = priceObj.title;
  };

  const inFavorites = () => {
    return favoriteItems.value.filter((favItem) => favItem.id === item.id)[0];
  };

  const inCart = () => {
    return cart.value.filter(
      (cartItem) =>
        cartItem.item.id === item.id && cartItem.price === currentPrice.value,
    )[0];
  };

  const notify = (message, icon) => {
    $f7.toast
      .create({
        text: message,
        destroyOnClose: true,
        closeTimeout: 1000,
        horizontalPosition: 'center',
        position: 'center',
        icon,
      })
      .open();
  };

  const toggleFavorites = () => {
    if (inFavorites()) {
      $store.dispatch('removeFavoriteItem', item);
      notify(
        `${item.title} removed from favorites`,
        $f7.theme.ios
          ? '<i class="icon f7-icons">heart_slash_fill</i>'
          : '<i class="icon material-icons">favorite_border</i>',
      );
    } else {
      $store.dispatch('addFavoriteItem', item);
      notify(
        `${item.title} added to favorites`,
        $f7.theme.ios
          ? '<i class="icon f7-icons">heart</i>'
          : '<i class="icon material-icons">favorite</i>',
      );
    }
  };

  let stepper;

  const initStepper = () => {
    stepper = $f7.stepper.create({
      el: '.item-page-quantity .stepper',
      min: 1,
      max: 10,
      value: 1,
      on: {
        change(s, value) {
          quantity.value = value;
        },
      },
    });
  };

  const destroyStepper = () => {
    if (stepper) stepper.destroy();
  };

  $onMounted(() => {
    initStepper();
    $store.dispatch('addRecentItem', item);
  });

  $onBeforeUnmount(() => {
    destroyStepper();
  });

  const addToCart = () => {
    $store.dispatch('addToCart', {
      item,
      quantity: stepper.value,
      price: currentPrice.value,
      priceTitle: currentPriceTitle.value,
    });
    notify(
      `${item.title} added to cart`,
      $f7.theme.ios
        ? '<i class="icon f7-icons">cart_fill</i>'
        : '<i class="icon material-icons">shopping_cart</i>',
    );
  };

  return () => (
    <div class="page item-page">
      <div class="navbar navbar-transparent">
        <div class="navbar-bg" />
        <div class="navbar-inner sliding">
          <div class="left">
            <a href="#" class="link back">
              <i class="icon icon-back" />
              <span class="if-ios">Back</span>
            </a>
          </div>
          <div class="title">{item.title}</div>
          <div class="right">
            <a href="#" class="link" onClick={toggleFavorites}>
              <i class="icon f7-icons ios-only">
                {inFavorites() ? 'heart_slash_fill' : 'heart'}
              </i>
              <i class="icon material-icons md-only">
                {inFavorites() ? 'favorite' : 'favorite_border'}
              </i>
            </a>
          </div>
        </div>
      </div>
      <div class="fab fab-extended fab-center-bottom">
        <a key="add-to-cart" href="#" onClick={addToCart}>
          <i class="icon f7-icons if-ios">
            cart_fill
            {inCart() && <i class="icon f7-icons">checkmark_circle_fill</i>}
          </i>
          <i class="icon material-icons if-md">
            shopping_cart
            {inCart() && <i class="icon material-icons">check_circle</i>}
          </i>
          <span class="fab-text">Add To Cart</span>
        </a>
      </div>
      <div class="page-content">
        <div class="block item-page-image no-margin">
          <img src={item.image} />
        </div>
        <div class="page-title item-page-title">{item.title}</div>
        <div class="item-page-subtitle">{item.subtitle}</div>

        <div class="block no-margin">
          {item.prices && (
            <div class="item-page-segmented segmented segmented-strong segmented-round">
              {item.prices.map((price) => (
                <button
                  type="button"
                  class={`button button-round ${
                    price.value === currentPrice.value ? 'button-active' : ''
                  }`}
                  onClick={() => {
                    setCurrentPrice(price);
                  }}
                >
                  {price.title}
                </button>
              ))}
              <span class="segmented-highlight" />
            </div>
          )}

          <div class="item-page-quantity">
            <div class="stepper stepper-round stepper-fill">
              <div class="stepper-button-minus" />
              <div class="stepper-value" />
              <div class="stepper-button-plus" />
            </div>
          </div>

          <div class="item-page-price">
            <span>$</span>
            {formatPrice(currentPrice.value * quantity.value)}
          </div>
        </div>
        {item.description && (
          <div class="block item-page-description">{item.description}</div>
        )}
      </div>
    </div>
  );
};
