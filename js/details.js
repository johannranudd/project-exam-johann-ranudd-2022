import { getData } from './fetch.js';

const urlPar = new URLSearchParams(window.location.search);
const id = urlPar.get('id');
const urlID = Number(id);

const url = `https://johannblog.one/wp-json/wp/v2/posts/${urlID}?_embed=true`;
// const url = `https://johannblog.one/wp-json/wp/v2/posts/${urlID}?`;

const detailsContent = document.querySelector('.details-content');
const detailsHeader = document.querySelector('.details-header');
const modal = document.querySelector('.modal');

async function displaySingleData() {
  const data = await getData(url);
  console.log(data);
  const { title, excerpt, _embedded } = data;

  detailsHeader.innerHTML = title.rendered;
  detailsContent.innerHTML += `
  <div class="image-container">
    <img src="${_embedded['wp:featuredmedia'][0].source_url}" alt="${_embedded['wp:featuredmedia'][0].alt_text}" /> 
    <div class="backdrop">View image</div>
  </div>
  <div class="blog-text">
    <p>${data.content.rendered}</p>
  </div>
  `;

  const imageContainer = document.querySelector('.image-container');
  imageContainer.addEventListener('click', () => {
    modal.style.display = 'grid';
    modal.style.justifyItems = 'center';
    modal.style.marginTop = `${window.innerHeight / 2}`;
    document.body.style.overflow = 'hidden';
    console.log(window.innerHeight);
    modal.innerHTML += `
        <img src="${_embedded['wp:featuredmedia'][0].source_url}" alt="${_embedded['wp:featuredmedia'][0].alt_text}" />
    `;
  });
}

displaySingleData();
{
  /* <h1>${title.rendered}</h1>; */
}
