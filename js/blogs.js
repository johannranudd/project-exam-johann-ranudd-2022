import { getData } from './utils.js';
const listOfBlogs = document.querySelector('.list-of-blogs');
const spinner = document.querySelector('.spinner');
const loadMoreBtn = document.querySelector('.load-more-btn');
const sortByBtns = document.querySelector('.sort-by-buttons');
// mobile menu variables and functionality
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

let totalData = [];

async function displayTenFirstBlogs() {
  const data = await getData(url);
  totalData = data;
  if (data) {
    spinner.remove();
    mapData(totalData);
    loadMoreBtn.addEventListener('click', loadeMoreFunction);
  }
}
displayTenFirstBlogs();

// MAP DATA
function mapData(data) {
  listOfBlogs.innerHTML = '';
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
  sortByBtns.addEventListener('click', (e) => sortByFunction(e));
}

// LOAD MORE
let offset = 10;
async function loadeMoreFunction() {
  const offsetURL = `https://www.johannblog.one/wp-json/wp/v2/posts?_embed=true&offset=${offset}&per_page=2`;
  const moreData = await getData(offsetURL);
  if (moreData.length > 0) {
    offset += moreData.length;
    moreData.map((item) => {
      totalData.push(item);
    });
    mapData(totalData);
  } else {
    return;
  }
}

function sortByFunction(e) {
  const id = e.target.dataset.id;
  if (id === 'latest') {
    const latest = totalData.sort((a, b) => {
      if (Date.parse(a.date) < Date.parse(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });
    mapData(latest);
  }
  if (id === 'oldest') {
    const oldest = totalData.sort((a, b) => {
      if (Date.parse(a.date) > Date.parse(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });
    mapData(oldest);
  }
}
