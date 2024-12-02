import { formatPrice } from '../js/format-price.js';
import './cart.less';

export default (props, ctx) => {
  const { $store, $ref, $f7, $el } = ctx;
  const { cart, cartTotal } = $store.getters;

  let name = '';
  let address = '';
  let tel = '';
  const payment = $ref('card');
  const orderSuccess = $ref(false);

  const setPayment = (newPayment) => {
    payment.value = newPayment;
  };

  const makePayment = () => {
    const isValid = $f7.input.validateInputs($el.value.find('form'));
    if (!isValid) return;
    // ORDER DATA
    // eslint-disable-next-line
    console.log({ name, address, tel, payment, cart: [...cart.value] });
    $store.dispatch('emptyCart');
    orderSuccess.value = true;
    requestAnimationFrame(() => {
      $el.value.find('.page-content').trigger('scroll');
    });
  };

  const onStepperChange = (e, obj) => {
    const newValue = e.detail;
    $store.dispatch('updateCartQuantity', { quantity: newValue, obj });
  };

  return () => (
    <div class="page cart-page">
      <div class="navbar navbar-transparent">
        <div class="navbar-bg" />
        <div class="navbar-inner sliding">
          <div class="title">Cart</div>
        </div>
      </div>

      {cart.value.length > 0 && (
        <div class="fab fab-extended fab-center-bottom">
          <a key="add-to-cart" href="#" onClick={makePayment}>
            <span class="fab-text">
              <span>
                {payment.value === 'delivery' ? 'Place Order' : 'Make Payment'}
              </span>
              <span>${cartTotal.value}</span>
            </span>
          </a>
        </div>
      )}

      <div class="page-content">
        {orderSuccess.value && cart.value.length === 0 ? (
          <>
            <div class="block cart-order-success">
              <p>
                <i class="icon f7-icons">checkmark_circle_fill</i>
              </p>
              <h1>
                <b>Thank you!</b>
              </h1>
              <p>
                We are currently processing your order and will make delivery as
                soon as possible
              </p>
            </div>
          </>
        ) : cart.value.length === 0 ? (
          <>
            <div class="page-title">Cart</div>
            <div class="block">Your cart is empty.</div>
          </>
        ) : (
          <>
            <div class="page-title">Cart</div>
            <div class="list cart-list inset-md medium-inset-ios list-strong list-dividers">
              <ul>
                {cart.value.map((cartItem, index) => (
                  <li key={`${cartItem.item.id}-${index}`} class="item-content">
                    <div class="item-media">
                      <img src={cartItem.item.image} />
                    </div>
                    <div class="item-inner">
                      <div class="item-title">
                        <div class="cart-list-item-title">
                          {cartItem.item.title}
                          {cartItem.priceTitle
                            ? ` (${cartItem.priceTitle})`
                            : ''}
                        </div>
                        <div class="cart-list-item-price">
                          ${cartItem.price}
                        </div>
                      </div>
                      <div class="item-after">
                        <div>
                          <div
                            class="stepper stepper-small stepper-fill stepper-round stepper-init"
                            data-min="0"
                            data-max="10"
                            data-value={cartItem.quantity}
                            onStepperChange={(e) =>
                              onStepperChange(e, cartItem)
                            }
                          >
                            <div class="stepper-button-minus" />
                            <div class="stepper-value">{cartItem.quantity}</div>
                            <div class="stepper-button-plus" />
                          </div>
                        </div>
                        <div class="cart-list-item-total">
                          ${formatPrice(cartItem.price * cartItem.quantity)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div class="block-title block-title-medium">Delivery</div>
            <form class="list inset-ios medium-inset-md cart-inputs-list">
              <ul>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Name</div>
                    <div class="item-input-wrap">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        required
                        onInput={(e) => {
                          name = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Delivery address</div>
                    <div class="item-input-wrap">
                      <input
                        type="text"
                        name="address"
                        placeholder="Delivery address"
                        required
                        onInput={(e) => {
                          address = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Phone number</div>
                    <div class="item-input-wrap">
                      <input
                        type="tel"
                        name="tel"
                        placeholder="Phone number"
                        required
                        onInput={(e) => {
                          tel = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <div class="block-title block-title-medium">Payment</div>
            <div class="list cart-payment-list inset">
              <ul>
                <li>
                  <label
                    class={`item-radio item-radio-icon-start item-content ${
                      payment.value === 'card'
                        ? 'cart-payment-list-checked'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}
                    />
                    <i class="icon icon-radio" />
                    <div class="item-media">
                      <i class="icon f7-icons ios-only">creditcard_fill</i>
                      <i class="icon material-icons md-only">credit_card</i>
                    </div>
                    <div class="item-inner">
                      <div class="item-title">Credit Card</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label
                    class={`item-radio item-radio-icon-start item-content ${
                      payment.value === 'apple'
                        ? 'cart-payment-list-checked'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="apple"
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}
                    />
                    <i class="icon icon-radio" />
                    <div class="item-media">
                      <i class="icon f7-icons">logo_apple</i>
                    </div>
                    <div class="item-inner">
                      <div class="item-title">Apple Pay</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label
                    class={`item-radio item-radio-icon-start item-content ${
                      payment.value === 'delivery'
                        ? 'cart-payment-list-checked'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="delivery"
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}
                    />
                    <i class="icon icon-radio" />
                    <div class="item-media">
                      <i class="icon f7-icons ios-only">shippingbox_fill</i>
                      <i class="icon material-icons md-only">local_shipping</i>
                    </div>
                    <div class="item-inner">
                      <div class="item-title">Pay on Delivery</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
