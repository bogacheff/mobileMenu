import './HomeSlider.less';

export default function HomeSlider() {
  return () => (
    <div class="block home-slider">
      <a href="/item/1/" class="home-slider-slide">
        <img src="images/slide-1.jpg" />
      </a>
      <a href="/item/15/" class="home-slider-slide">
        <img src="images/slide-2.jpg" />
      </a>
      <a href="/item/10/" class="home-slider-slide">
        <img src="images/slide-3.jpg" />
      </a>
    </div>
  );
}
