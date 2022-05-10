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

// form
const form = document.querySelector('.contact-form');
const section = document.querySelector('.section-center');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  //   expressions
  const nameRegEx = /^[a-zA-Z \Wæøå]+$/;
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   inputs
  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const subject = form.querySelector('#subject');
  const message = form.querySelector('#message');

  let nameValidated = false;
  let emailValidated = false;
  let subjectValidated = false;
  let messageValidated = false;

  //   validation
  if (!nameRegEx.test(name.value) || name.value.length <= 5) {
    displayWarning(name, 'must be more than 5 characters');
  } else {
    nameValidated = true;
  }
  if (!emailRegEx.test(email.value)) {
    displayWarning(email, 'email must be a valid email address');
  } else {
    emailValidated = true;
  }
  if (subject.value.length <= 15) {
    displayWarning(subject, 'subject must be more than 15 characters');
  } else {
    subjectValidated = true;
  }
  if (message.value.length <= 25) {
    displayWarning(message, 'message must be more than 25 characters');
  } else {
    messageValidated = true;
  }

  if (nameValidated && emailValidated && subjectValidated && messageValidated) {
    section.innerHTML = `<div>
    <h1>Thank you for your message</h1>
    <a href="./">Back to homepage</a>
    </div>`;
  }
});

function displayWarning(name, message) {
  const label = name.previousElementSibling;
  label.classList.add('danger');
  label.innerHTML = `${name.id} ${message}`;
  setTimeout(() => {
    label.innerHTML = name.id;
    label.classList.remove('danger');
  }, 5000);
}
