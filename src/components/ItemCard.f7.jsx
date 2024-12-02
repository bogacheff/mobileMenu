import { formatPrice } from '../js/format-price.js';
import './ItemCard.less';

export default function ItemCard(props) {
  return () => (
    <a href={`/item/${props.item.id}/`} class="item-card">
      <img class="item-card-image" src={props.item.image} />
      <div class="item-card-content">
        <div class="item-card-title">{props.item.title}</div>
        {props.item.subtitle && (
          <div class="item-card-subtitle">{props.item.subtitle}</div>
        )}
        <div class="item-card-price">
          <span>$</span>
          {formatPrice(
            props.item.prices ? props.item.prices[0].value : props.item.price,
          )}
        </div>
      </div>
    </a>
  );
}
