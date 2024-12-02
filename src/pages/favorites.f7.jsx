import ItemCard from '../components/ItemCard.f7.jsx';
import ItemCards from '../components/ItemCards.f7.jsx';

export default (props, ctx) => {
  const { $store } = ctx;
  const { favoriteItems } = $store.getters;

  return () => (
    <div class="page">
      <div class="navbar navbar-transparent">
        <div class="navbar-bg" />
        <div class="navbar-inner sliding">
          <div class="title">Favorites</div>
        </div>
      </div>

      <div class="page-content">
        <div class="page-title">Favorites</div>

        {favoriteItems.value.length > 0 ? (
          <ItemCards>
            {favoriteItems.value.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </ItemCards>
        ) : (
          <div class="block">
            <p>
              <b>You don't have any favorites yet</b>
            </p>
            <p>
              When viewing an item, press the favorite icon{' '}
              <i class="icon f7-icons ios-only text-color-primary">heart</i>
              <i class="icon material-icons md-only text-color-primary">
                favorite_border
              </i>{' '}
              to add it
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
