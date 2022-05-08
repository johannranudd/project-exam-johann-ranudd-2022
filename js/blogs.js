import { getData } from './fetch.js';
const listOfBlogs = document.querySelector('.list-of-blogs');
const spinner = document.querySelector('.spinner');
const loadMoreBtn = document.querySelector('.load-more-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('show-menu');
  menuBtn.classList.toggle('menu-is-open');
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && mobileMenu.className.includes('show-menu')) {
    mobileMenu.classList.remove('show-menu');
    menuBtn.classList.remove('menu-is-open');
  }
});

const url = `https://www.johannblog.one/wp-json/wp/v2/posts?_embed=true&per_page=10`;

async function displayTenFirstBlogs() {
  const data = await getData(url);
  if (data) {
    spinner.remove();
    mapData(data);
    loadMoreBtn.addEventListener('click', loadeMoreFunction);
  }
}
displayTenFirstBlogs();

// MAP DATA
function mapData(data) {
  data.map((item) => {
    const imageUrl = item._embedded['wp:featuredmedia'][0].source_url;
    const altText = item._embedded['wp:featuredmedia'][0].alt_text;
    listOfBlogs.innerHTML += `
    <li>
        <img src="${imageUrl}" alt="${altText}"/>
        <div>
          ${item.content.rendered.substring(0, 200)} <br/>
          <a href="./details.html?id=${item.id}">Read more</a>
        </div>
      </li>
  `;
  });
}

// LOAD MORE
let offset = 10;
async function loadeMoreFunction() {
  const offsetURL = `https://www.johannblog.one/wp-json/wp/v2/posts?_embed=true&offset=${offset}&per_page=2`;
  const moreData = await getData(offsetURL);
  if (moreData.length > 0) {
    offset += moreData.length;
    mapData(moreData);
  } else {
    return;
  }
}
