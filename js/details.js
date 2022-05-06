import { getData } from './fetch.js';

const urlPar = new URLSearchParams(window.location.search);
const id = urlPar.get('id');
const urlID = Number(id);

const url = `https://johannblog.one/wp-json/wp/v2/posts/${urlID}?_embed=true`;

const detailsContent = document.querySelector('.details-content');

async function displaySingleData() {
  const data = await getData(url);
  console.log(data);
  const { title, excerpt, _embedded } = data;

  detailsContent.innerHTML = `
  <img src="${_embedded['wp:featuredmedia'][0].source_url}" alt="${_embedded['wp:featuredmedia'][0].alt_text}" /> 
  <div class="blog-text">
  <h1>${title.rendered}</h1>
  <p>${excerpt.rendered}</p>
  </div>
  `;
}

displaySingleData();
