import { Cart } from './Cart';
import { $, $input } from './Dom';
import { zoom } from './Zoomer';
import { Observer } from './Observer';
import { products } from './Storage';
import { productPhoto, productCharacters, counter, has, getData, setData, loader, calcDiscount } from './Utils';


class Product {
   constructor() {
      this.cart = new Cart();
   }

   init() {
      this.load();
      this.addToCart();
   }

   load() {
      let productList = getData('productList');
      let itemIndex = getData('selected');
      let product = productList[itemIndex];
      let productBlock = $('#productCharacter');
      let productImage = $('#productPhoto');

      product.sum = calcDiscount(product);
      product.advantages =
         product.advantages.map(item => `<li>${item}</li>`).join('');

      productBlock.clear();
      productImage.clear();
      productImage.content(productPhoto(product));
      productBlock.content(productCharacters(product));
   }


   addToCart() {
      $('#productAddCart').on('click', (event) => {
         event.preventDefault();
         let itemIndex = getData('selected');
         let productCount = +$input('#productCount').content();
         this.cart.addToCart(itemIndex, { count: productCount });
      });
   }
}

let product = new Product();
product.init();
counter();


document.addEventListener('DOMContentLoaded', function () {
   let block = block = document.querySelectorAll('.splide__slide');
   zoom(block[0]);
   zoom(block[1]);
});