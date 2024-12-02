import './Onboarding.less';

export default function Onboarding(
  props,
  { $f7, $el, $onMounted, $onBeforeUnmount },
) {
  const enabled = !localStorage.onboardingFinished;
  let popup;

  const createPopup = () => {
    popup = $f7.popup.create({
      el: $el.value,
      opened: true,
    });
    popup.open(false);
  };
  const destroyPopup = () => {
    if (popup) popup.destroy();
  };
  $onMounted(() => {
    if (!enabled) return;
    createPopup();
  });
  $onBeforeUnmount(() => {
    destroyPopup();
  });

  const slideNext = () => {
    document.querySelector('swiper-container').swiper.slideNext();
  };

  const closeOnboarding = () => {
    $f7.popup.close('.popup-onboarding', true);
    localStorage.onboardingFinished = true;
  };

  // Return empty div when onboarding is disabled
  return () =>
    !enabled ? (
      <div />
    ) : (
      <div class="popup popup-onboarding onboarding popup-tablet-fullscreen modal-in">
        <swiper-container
          observe-parents="true"
          speed="600"
          resistance-ratio="0"
          parallax="true"
          pagination="true"
        >
          <swiper-slide>
            <div class="onboarding-images">
              <img
                data-swiper-parallax-x="-300"
                src="images/pizza/diablo.png"
              />
              <img
                data-swiper-parallax-x="-150"
                src="images/burgers/big-tasty.png"
              />
              <img
                data-swiper-parallax-x="0"
                src="images/desserts/apple-pie.png"
              />
            </div>
            <div class="onboarding-content">
              <div class="onboarding-title">
                Best food delivery service in the world!
              </div>
              <div class="onboarding-text">
                The best and fresh products, amazing flavors, 5-star reviews.
              </div>
              <div class="onboarding-next">
                <a
                  href="#"
                  class="button button-large button-round button-fill"
                  onClick={slideNext}
                >
                  Next
                </a>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="onboarding-images">
              <img
                data-swiper-parallax-x="-300"
                src="images/pizza/pepperoni.png"
              />
              <img
                data-swiper-parallax-x="-150"
                src="images/burgers/bigmac.png"
              />
              <img data-swiper-parallax-x="0" src="images/drinks/pepsi.png" />
            </div>
            <div class="onboarding-content">
              <div class="onboarding-title">
                Discover our award winning dishes
              </div>
              <div class="onboarding-text">
                Burgers, pizza, drinks and bakery.
              </div>
              <div class="onboarding-next">
                <a
                  href="#"
                  class="button button-large button-round button-fill"
                  onClick={closeOnboarding}
                >
                  Get Started!
                </a>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    );
}
