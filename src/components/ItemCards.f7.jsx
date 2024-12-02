import './ItemCards.less';

export default function ItemCards(props) {
  return () => (
    <div
      class={`block item-cards ${
        props.scrollable ? 'item-cards-scrollable' : ''
      }`}
    >
      <slot />
    </div>
  );
}
