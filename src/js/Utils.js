import { products } from "./Storage";

export function productPhoto(product) {
   return `
   <li class="splide__slide">
      <img src="images/${product.image}" alt="product">
   </li>
   <li class="splide__slide">
      <img src="images/${product.image}" alt="product">
   </li>
   `;
}

export function productCharacters(product) {
   return `
   <div class="product-character__title">${product.type}</div>
   <div class="product-character__box">
      <div class="product-character__rating">
         <input class="product-character__star fa" type="radio" name="rating">
         <input class="product-character__star fa" type="radio" name="rating" checked>
         <input class="product-character__star fa" type="radio" name="rating">
         <input class="product-character__star fa" type="radio" name="rating">
         <input class="product-character__star fa" type="radio" name="rating">
      </div>
      <div class="product-character__count">3 Review(s)</div>
      <div class="product-character__review"><a href="#">Add a Review</a></div>
      <div class="product-character__social">
         <span>Share:</span>
         <ul class="product-character__links">
            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
            <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
            <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram-square"></i></a></li>
            <li><a href="#"><i class="far fa-envelope"></i></a></li>
         </ul>
      </div>
   </div>
   <div class="product-character__price">
      <span><sup>£</sup>${product.price}</span>
      <span><sup>£</sup>${product.sum}</span>
   </div>
   <div class="product-character__info">
      <p>Availability: <span>${product.availability}</span></p>
      <p>Product Code: <span>${product.productCode}</span></p>
      <p>Tags: <span><a href="#">${product.tags}</a></span></p>
   </div>
   <div class="product-character__description">
      <p>${product.description}</p>
      <ul>${product.advantages}</ul>
   </div>
   `;
}

export function locationItem(data) {
   return `
   <div class="location-frame">
      <iframe src="${data.location}" width="100%" height="100%" frameborder="0" 
      style="border:0;" allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>
   </div>
   <div class="location-info">
      <p>${data.city}</p>
      <p>${data.street}</p>
      <p>${data.description}</p>
      <ul>
         <li><i class="fas fa-map-marker-alt"></i><span>${data.street}</span></li>
         <li><i class="fas fa-phone-alt"></i><span>${data.tel}</span></li>
         <li><i class="fas fa-link"></i><span>${data.link}</span></li>
         <li><i class="far fa-envelope"></i><span>${data.email}</span></li>
         <li><i class="far fa-clock"></i><span>${data.time}</span></li>
      </ul>
      <ul>
         <li><a href="#"><img src="images/facebook.png" alt="facebook"></a></li>
         <li><a href="#"><img src="images/twitter.png" alt="twitter"></a></li>
         <li><a href="#"><img src="images/instagram.png" alt="instagram"></a></li>
         <li><a href="#"><img src="images/pinterest.png" alt="pinterest"></a></li>
      </ul>
   </div>
   `;
}

export function infoItem(item, index) {
   return `
   <div class="info-item" data-index="${index}">
      <p>${item.city}</p>
      <p>${item.street}</p>
      <p>${item.description}</p>
      <a href="#" data-action="view">view details</a>
   </div>
   `;
}

export function cartItem(item, index) {
   return `
   <div class="header-block__product" data-type="cartItem" data-index="${index}">
      <div class="header-block__product-photo">
         <img src="images/${item.image}" alt="product">
      </div>
      <div class="header-block__product-name">
         ${item.type}
      </div>
      <input type="number" value="${item.count}" data-action="counter" class="header-block__product-count">
      <button class="header-block__product-delete" data-action="delete">Delete</button>
   </div>
   `;
}

export function productItem(product, index) {
   return `
   <div class="fashion-item" data-index="${index}" data-type="product">
      <div class="fashion-block">
         <div class="fashion-photo">
            <a href="product.html"></a>
            <img src="images/${product.image}" alt="shirt">
         </div>
         <div class="fashion-price">
            <span>£${product.price}</span>
         </div>
         <div class="fashion-character">
            <p>${product.type}</p>
            <p>${product.advantages.join(' . ')}</p>
            <div>
               <button class="fashion__addCart" data-action="addToCart">
                  <i class="fas fa-shopping-cart"></i>
               </button>
               <button class="fashion__addLike" data-action="addToLike">
                  <i class="far fa-heart"></i>
               </button>
               <button class="fashion__addCompare" data-action="addToCompare">
                  <i class="fas fa-compress-alt"></i>
               </button>
            </div>
         </div>
      </div>
   </div>
   `;
}

export function activateBlock(id) {
   document.documentElement.classList.toggle('noscroll');
   document.body.classList.toggle('noscroll');
   let block = document.querySelector(`${id}`);
   block.classList.toggle('hidden');
}

export function calcDiscount(product) {
   return product.price - product.price / 100 * product.discount;
}

export function counter() {
   let counters = document.querySelectorAll('input[type="number"]');
   counters.forEach(counter => {
      counter.value = 1;
      counter.addEventListener('click', () => {
         if (counter.value < 1) {
            counter.value = 1;
         }
      });
   });
}

export function checkCurrentUser() {
   if (!has('currentUser')) {
      redirect('signUp');
   }
}

export function redirect(page) {
   setTimeout(() => {
      window.location.href = `${page}.html`;
   }, 0);
}

export function clearData(key) {
   localStorage.removeItem(key);
}

export function has(key) {
   if (localStorage.getItem(key) != undefined) return true;
   else return false;
}

export function getData(key) {
   return JSON.parse(localStorage.getItem(key));
}

export function setData(key, data) {
   localStorage.setItem(key, JSON.stringify(data));
}

export function loader() {
   let wrap = document.querySelector('#wrapper');
   let loader = document.createElement('div');
   loader.classList.add('loader')
   loader.innerHTML = `<div class="lds-hourglass"></div>`;
   wrap.append(loader);
   setTimeout(() => {
      loader.remove();
   }, 2000);
}

export function showState(message) {
   let wrap = document.querySelector('#wrapper');
   let block = document.createElement('div');
   wrap.append(block);
   block.innerHTML = message;
   block.style.cssText = `
      z-index: 3;
      top: 35px;
      padding: 10px;
      right: -300px;
      font-size: 18px;
      color:  #4ec2e7;
      position: fixed;
      background: #fff;
      min-width: 150px;
      max-width: 200px;
      text-align: center;
      transition: 0.5s all linear;
      box-shadow: 0 0 5px 0 rgb(160, 159, 159);
      font-family: Arial, Helvetica, sans-serif;
   `;

   setTimeout(() => {
      block.style.right = '30px';
   }, 300);

   setTimeout(() => {
      block.style.right = '-300px';
   }, 2200);

   setTimeout(() => {
      block.remove();
   }, 2500);
}
