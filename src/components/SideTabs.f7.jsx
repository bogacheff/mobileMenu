import './SideTabs.less';

export default function SideTabs(props, ctx) {
  const { $ref, $f7, $f7ready } = ctx;
  const activeTab = $ref('home');
  const setActiveTab = (tab) => {
    activeTab.value = tab;
    $f7.tab.show(`#${tab}`);
  };
  $f7ready(() => {
    $f7.on('tabShow', (tabEl) => {
      activeTab.value = tabEl.id;
    });
  });

  return () => (
    <div
      class="panel panel-left panel-init panel-cover side-tabs-panel"
      data-visible-breakpoint="768"
    >
      <div class="side-tab-links">
        <a
          href="#"
          class={`side-tab-link ${
            activeTab.value === 'home' ? 'side-tab-link-active' : ''
          }`}
          onClick={() => setActiveTab('home')}
        >
          <svg
            width="9"
            height="64"
            viewBox="0 0 9 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-2.64842e-05 61.982C-2.73021e-05 64.2205 -2.8595e-05 64.5383 -3.05176e-05 62C-3.05176e-05 61.994 -2.91773e-05 61.988 -2.64842e-05 61.982C-2.31245e-05 52.7865 -2.77805e-05 11.1798 -2.97298e-05 2.00794C-3.0255e-05 2.00529 -3.05176e-05 2.00264 -3.05176e-05 1.99999C-3.05176e-05 -0.534521 -3.02037e-05 -0.221455 -2.97298e-05 2.00794C0.00304393 17.5014 9 21.5018 9 32C9 42.4959 0.0069261 46.4969 -2.64842e-05 61.982Z" />
            <path d="M-2.97298e-05 2.00794C-3.02037e-05 -0.221455 -3.05176e-05 -0.534521 -3.05176e-05 1.99999C-3.05176e-05 2.00264 -3.0255e-05 2.00529 -2.97298e-05 2.00794Z" />
          </svg>
          <i class="icon f7-icons if-ios">house_alt_fill</i>
          <i class="icon material-icons if-md">home</i>
        </a>
        <a
          href="#"
          class={`side-tab-link ${
            activeTab.value === 'favorites' ? 'side-tab-link-active' : ''
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          <svg
            width="9"
            height="64"
            viewBox="0 0 9 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-2.64842e-05 61.982C-2.73021e-05 64.2205 -2.8595e-05 64.5383 -3.05176e-05 62C-3.05176e-05 61.994 -2.91773e-05 61.988 -2.64842e-05 61.982C-2.31245e-05 52.7865 -2.77805e-05 11.1798 -2.97298e-05 2.00794C-3.0255e-05 2.00529 -3.05176e-05 2.00264 -3.05176e-05 1.99999C-3.05176e-05 -0.534521 -3.02037e-05 -0.221455 -2.97298e-05 2.00794C0.00304393 17.5014 9 21.5018 9 32C9 42.4959 0.0069261 46.4969 -2.64842e-05 61.982Z" />
            <path d="M-2.97298e-05 2.00794C-3.02037e-05 -0.221455 -3.05176e-05 -0.534521 -3.05176e-05 1.99999C-3.05176e-05 2.00264 -3.0255e-05 2.00529 -2.97298e-05 2.00794Z" />
          </svg>
          <i class="icon f7-icons if-ios">heart_fill</i>
          <i class="icon material-icons if-md">favorite</i>
        </a>
        <a
          href="#"
          class={`side-tab-link ${
            activeTab.value === 'cart' ? 'side-tab-link-active' : ''
          }`}
          onClick={() => setActiveTab('cart')}
        >
          <svg
            width="9"
            height="64"
            viewBox="0 0 9 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-2.64842e-05 61.982C-2.73021e-05 64.2205 -2.8595e-05 64.5383 -3.05176e-05 62C-3.05176e-05 61.994 -2.91773e-05 61.988 -2.64842e-05 61.982C-2.31245e-05 52.7865 -2.77805e-05 11.1798 -2.97298e-05 2.00794C-3.0255e-05 2.00529 -3.05176e-05 2.00264 -3.05176e-05 1.99999C-3.05176e-05 -0.534521 -3.02037e-05 -0.221455 -2.97298e-05 2.00794C0.00304393 17.5014 9 21.5018 9 32C9 42.4959 0.0069261 46.4969 -2.64842e-05 61.982Z" />
            <path d="M-2.97298e-05 2.00794C-3.02037e-05 -0.221455 -3.05176e-05 -0.534521 -3.05176e-05 1.99999C-3.05176e-05 2.00264 -3.0255e-05 2.00529 -2.97298e-05 2.00794Z" />
          </svg>
          <i class="icon f7-icons if-ios">cart_fill</i>
          <i class="icon material-icons if-md">shopping_cart</i>
        </a>
      </div>
    </div>
  );
}
