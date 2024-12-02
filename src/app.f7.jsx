import Onboarding from './components/Onboarding.f7.jsx';
import SideTabs from './components/SideTabs.f7.jsx';

export default () => {
  return () => (
    <div id="app">
      <SideTabs />
      <div class="views tabs safe-areas">
        <div class="toolbar tabbar toolbar-bottom">
          <div class="toolbar-inner">
            <a href="#home" class="tab-link tab-link-active">
              <i class="icon f7-icons if-ios">house_alt_fill</i>
              <i class="icon material-icons if-md">home</i>
            </a>
            <a href="#favorites" class="tab-link">
              <i class="icon f7-icons if-ios">heart_fill</i>
              <i class="icon material-icons if-md">favorite</i>
            </a>
            <a href="#cart" class="tab-link">
              <i class="icon f7-icons if-ios">cart_fill</i>
              <i class="icon material-icons if-md">shopping_cart</i>
            </a>
          </div>
        </div>
        <div
          id="home"
          class="view view-main view-init tab tab-active"
          data-url="/"
        />
        <div id="favorites" class="view view-init tab" data-url="/favorites/" />
        <div id="cart" class="view view-init tab" data-url="/cart/" />
      </div>
      <Onboarding />
    </div>
  );
};
