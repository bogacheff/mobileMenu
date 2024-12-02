import './CategoriesFilter.less';

export default function CategoriesFilter(props, ctx) {
  const { $store } = ctx;
  const { categories, filterCategoryId } = $store.getters;

  const toggleFilterCategory = (id) => {
    if (filterCategoryId.value === id) {
      $store.dispatch('setFilterCategoryId', null);
    } else {
      $store.dispatch('setFilterCategoryId', id);
    }
  };

  return () => (
    <div class="block categories-filter">
      {categories.value.map((category) => (
        <a
          href="#"
          class={`link ${
            filterCategoryId.value === category.id ? 'category-active' : ''
          }`}
          onClick={() => toggleFilterCategory(category.id)}
        >
          <img src={category.image} />
          <span>{category.title}</span>
        </a>
      ))}
    </div>
  );
}
