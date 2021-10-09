import { $, $input } from './Dom';
import { Observer } from './Observer';
import { Mask } from './Mask';
import { showState, activateBlock, cartItem, has, getData, setData } from './Utils';

export class Cart {
   constructor() {
      if (Cart.instance) {
         return Cart.instance;
      }
      Cart.instance = this;
      return Cart.instance;
   }

   init() {
      this.loadData();
      this.render();
      this.clearCart();
      this.deleteItem();
      this.changeCount();
      this.buy();
   }

   loadData() {
      this.cartItems = getData('cartItems') || {};
      this.boughtProducts = getData('boughtProducts') || {};
      this.boughtUsers = getData('boughtUsers') || {};
      setData('boughtProducts', this.boughtProducts);
      setData('boughtUsers', this.boughtUsers);
   }

   productCount(count) {
      $('#headerCounter').content(`${count}`);
   }

   buy() {
      let name = $input('#name');
      let phone = $input('#phone');
      $('#headerBuy').on('click', () => {
         let userIndex = getData('currentUser');
         let cartItems = getData('cartItems');
         let hasProduct = cartItems[userIndex].length != 0;
         if (hasProduct) {
            activateBlock('#buySave');
         }
      });
      $('#buyClose').on('click', (event) => {
         event.preventDefault();
         activateBlock('#buySave');
      });
      $('#buyAccept').on('click', (event) => {
         event.preventDefault();
         let hasContent = !!name.content() && !!phone.content();
         if (hasContent) {
            let userIndex = getData('currentUser');
            let cartItems = getData('cartItems');
            let boughtProducts = getData('boughtProducts');
            let boughtUsers = getData('boughtUsers');
            boughtProducts[userIndex] = boughtProducts[userIndex] || [];
            boughtProducts[userIndex].push(...cartItems[userIndex]);
            boughtUsers[userIndex] = {
               name: name.content(),
               phone: phone.content(),
               done: false
            };
            setData('boughtUsers', boughtUsers);
            setData('boughtProducts', boughtProducts);
            activateBlock('#buySave');
            showState('Thank you for your purchase');
            this.clear();
            return;
         }
         alert('Information should not be empty');
      });
   }


   clearCart() {
      this.clear = function () {
         let userIndex = getData('currentUser');
         if (userIndex != undefined) {
            this.cartItems[userIndex] = [];
            setData('cartItems', this.cartItems);
            observer.notify('changeCartState');
         }
      };

      $('#headerClear').on('click', () => {
         this.clear();
      });
   }

   showItems(products) {
      let list = $('#headerItems');
      list.clear();
      products.forEach((product, index) => {
         list.add(cartItem(product, index));
      });
   }

   setCharacter(product, character) {
      product.count = character.count || 1;
      product.color = character.color || 'black';
      product.size = character.size || 'XL';
      return product;
   }

   addToCart(index, character = {}) {
      let productItems = getData('productList');
      let userIndex = getData('currentUser');
      let userProducts = this.cartItems[userIndex] || [];
      let exists = userProducts.some(product => {
         return product.productCode == productItems[index].productCode;
      });

      if (has('currentUser')) {
         if (!exists) {
            let product = this.setCharacter(productItems[index], character);
            userProducts.push(product);
            this.cartItems[userIndex] = userProducts;
            setData('cartItems', this.cartItems);
            showState('Product added');
            observer.notify('changeCartState');
         }
         else alert('Product is already exists in to cart!');
      }
   }

   deleteItem() {
      let list = $('#headerItems');
      list.on('click', (event) => {
         let target = $(event.target)
         let action = target.getAttr('data-action');
         if (action == 'delete') {
            let item = target.closest('[data-type="cartItem"]');
            let index = $(item).getAttr('data-index');
            let userIndex = getData('currentUser');
            this.cartItems[userIndex].splice(index, 1);
            setData('cartItems', this.cartItems);
            observer.notify('changeCartState');
         }
      });
   }

   changeCount() {
      let list = $('#headerItems');
      list.on('click', (event) => {
         let target = $input(event.target);
         let action = target.getAttr('data-action');
         if (action == 'counter') {
            let item = target.closest('[data-type="cartItem"]');
            let index = $(item).getAttr('data-index');
            let userIndex = getData('currentUser');
            let count = +target.content();
            if (count < 1) { count = 1; target.content(1); }
            this.cartItems[userIndex][index].count = count;
            setData('cartItems', this.cartItems);
            observer.notify('changeCartState');
         }
      });
   }

   calcPrice(products) {
      let price = 0;
      let total = $('#headerTotal');
      products.forEach(product => {
         price += product.price * product.count;
      });
      total.content(price);
   }

   render() {
      if (has('currentUser')) {
         if (has('cartItems')) {
            let cartItems = getData('cartItems');
            let userIndex = getData('currentUser');
            let userProducts = cartItems[userIndex] || [];
            this.productCount(userProducts.length);
            this.showItems(userProducts);
            this.calcPrice(userProducts);
         }
      }
   }
}


let cart = new Cart();
cart.init();

let observer = new Observer();
observer.subscribe('changeCartState', cart.render.bind(cart));

let tel = new Mask('#phone');