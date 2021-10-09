import { $ } from './Dom';
import { Cart } from './Cart';
import { Observer } from './Observer';
import { products } from './Storage';
import { productItem, checkCurrentUser, has, getData, setData, loader } from './Utils';

class ProductList {
   constructor() {
      this.cart = new Cart();
   }

   init() {
      this.load();
      this.render();
      this.add();
      this.select();
   }

   load() {
      if (!has('productList')) {
         setData('productList', products);
      }
   }

   render() {
      let list = $('#productList');
      list.clear();
      getData('productList').forEach((product, index) => {
         list.add(productItem(product, index));
      });
   }

   select() {
      let list = $('#productList');
      list.on('click', (event) => {
         let target = $(event.target).closest('[data-type="product"]');
         let index = $(target).getAttr('data-index');
         setData('selected', index);
      });
   }

   add() {
      $('#productList').on('click', (event) => {
         let btn = $(event.target).closest(`[data-action="addToCart"]`);
         if (!!btn) {
            let product = btn.closest(`[data-type="product"]`);
            let productIndex = $(product).getAttr('data-index');
            observer.notify('addToCart');
            this.cart.addToCart(productIndex);
         }
      });
   }

}

loader();
let observer = new Observer();
let productList = new ProductList();

productList.init();
observer.subscribe('addToCart', checkCurrentUser);
