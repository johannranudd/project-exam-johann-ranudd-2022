import { getData } from './fetch.js';
const listOfBlogs = document.querySelector('.list-of-blogs');
const spinner = document.querySelector('.spinner');
const loadMoreBtn = document.querySelector('.load-more-btn');

let offset = 5;

const url = `https://www.johannblog.one/wp-json/wp/v2/posts?_embed=true&per_page=5`;
// const url2 = `https://www.johannblog.one/wp-json/wp/v2/posts?per_page=12&_fields[]=id&_fields[]=title`;

async function displayTenFirstBlogs() {
  const data = await getData(url);
  if (data) {
    spinner.remove();
  }
}
displayTenFirstBlogs();

loadMoreBtn.addEventListener('click', loadeMoreFunction);

async function loadeMoreFunction(data) {
  const offsetURL = `https://www.johannblog.one/wp-json/wp/v2/posts?_embed=true&offset=${offset}&per_page=2`;
  const moreData = await getData(offsetURL);
  console.log(moreData);
  if (moreData.length) {
    console.log('has data');
  } else {
    console.log('out of data');
  }
  offset += 2;
}
