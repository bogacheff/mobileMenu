// Асинхронная функция для загрузки данных
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return []; // Возвращаем пустой массив при ошибке
  }
}

// Загружаем категории
export const categories = await fetchData('https://applantis.io/menudata/categories.json');

// Загружаем блюда
export const items = await fetchData('https://applantis.io/menudata/items.json');
