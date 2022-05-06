const url = `http://www.johannblog.one/wp-json/wp/v2/posts?_embed=true&per_page=12`;

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function displayData() {
  const data = await getData(url);
  console.log(data);
}
window.addEventListener('load', displayData);
