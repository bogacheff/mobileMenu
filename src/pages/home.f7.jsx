import ItemCards from '../components/ItemCards.f7.jsx';
import ItemCard from '../components/ItemCard.f7.jsx';
import CategoriesFilter from '../components/CategoriesFilter.f7.jsx';
import HomeSlider from '../components/HomeSlider.f7.jsx';

export default (props, ctx) => {
  const { $store, $ref, $onMounted, $onBeforeUnmount, $f7 } = ctx;
  const {
    filterCategoryId,
    filteredItems,
    recentItems,
    searchState,
    searchResults,
    popularItems,
    trendingItems,
    categories,
    items,
  } = $store.getters;
  let searchbar;
  const searchEnabled = $ref(false);

  const createSearchbar = () => {
    searchbar = $f7.searchbar.create({
      el: '.page-home .searchbar',
      customSearch: true,
      backdrop: false,
      on: {
        enable() {
          searchEnabled.value = true;
        },
        disable() {
          searchEnabled.value = false;
        },
        search(sb, query) {
          $store.dispatch('search', query);
        },
      },
    });
  };
  const destroySearchbar = () => {
    searchbar.destroy();
  };

  $onMounted(() => {
    createSearchbar();
  });
  $onBeforeUnmount(() => {
    destroySearchbar();
  });

  return () => (
    <div class="page page-home">
      <div class="navbar navbar-transparent">
        <div class="navbar-bg" />
        <div class="navbar-inner sliding">
          <div class="title">LA Burger</div>
        </div>
      </div>

      <div class="page-content">
        <div class="page-title">LA2 Burger</div>
        <form class="searchbar">
          <div class="searchbar-inner">
            <div class="searchbar-input-wrap">
              <input type="search" placeholder="Search" />
              <i class="searchbar-icon" />
              <span class="input-clear-button" />
            </div>
            <span class="searchbar-disable-button">Cancel</span>
          </div>
        </form>

        {/* Empty search results */}
        {searchEnabled.value && searchState.value === 'empty' && (
          <div class="block">Sorry, we have found no items</div>
        )}

        {/* Search results */}
        {searchEnabled && searchResults.value.length > 0 && (
          <ItemCards key="search-results">
            {searchResults.value.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </ItemCards>
        )}

        {!searchEnabled.value && (
          <>
            <HomeSlider />

            <div class="block-title block-title-medium">Categories</div>

            <CategoriesFilter />

            {filterCategoryId.value === null && (
              <>
                <div class="block-title block-title-medium">Items by Category</div>
                {categories.value
                  .filter((category) => items.value.some((item) => item.categoryId === category.id)) // Фильтруем только категории с товарами
                  .map((category) => (
                  <div key={category.id}>
                    <div class="block-title block-title-small">{category.title}</div>
                    <ItemCards key={`category-${category.id}`} scrollable>
                      {items.value
                        .filter((item) => item.categoryId === category.id)
                        .map((item) => (
                          <ItemCard key={item.id} item={item} />
                        ))}
                    </ItemCards>
                  </div>
                ))}

                <div class="block-title block-title-medium">Popular Now</div>
                <ItemCards key="popular-items" scrollable>
                  {popularItems.value.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </ItemCards>

                <div class="block-title block-title-medium">
                  Top of the week
                </div>
                <ItemCards key="top-items" scrollable>
                  {trendingItems.value.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </ItemCards>

                <div class="block-title block-title-medium">
                  Recently viewed
                </div>
                {recentItems.value.length ? (
                  <ItemCards key="recent-items" scrollable>
                    {recentItems.value.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </ItemCards>
                ) : (
                  <div class="block">
                    <p>
                      You didn't check any items yet. Last few items you viewed
                      will appear here.
                    </p>
                  </div>
                )}
              </>
            )}

            {filterCategoryId.value !== null && (
              <>
                <div class="block-title block-title-medium">
                  {categories.value.find((category) => category.id === filterCategoryId.value)?.title}
                </div>
                <ItemCards key={`category-${filterCategoryId.value}`} scrollable>
                  {filteredItems.value.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </ItemCards>
              </>
            )}

          </>
        )}
      </div>
    </div>
  );
};
