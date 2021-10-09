import { $, $input } from './Dom';
import { Observer } from './Observer';
import { products, ProductFactory } from './Storage';
import { has, getData, setData, activateBlock } from './Utils';

class Products {
   constructor() {
      this.product = new ProductFactory();
   }

   init() {
      this.loadProducts();
      this.render();
      this.add();
      this.delete();
      this.change();
   }

   loadProducts() {
      if (!has('productList')) {
         setData('productList', products);
      }
   }

   delete() {
      $('#productList').on('click', (event) => {
         let target = $(event.target);
         let action = target.getAttr('data-action');
         if (action == 'delete') {
            let item = target.closest('[data-type="product"]');
            let index = $(item).getAttr('data-index');
            let productList = getData('productList');
            productList.splice(index, 1);
            setData('productList', productList);
            observer.notify('change');
         }
      });
   }


   add() {
      $('#addProduct').on('click', (event) => {
         event.preventDefault();

         let productList = getData('productList');
         let lastIndex = productList[productList.length - 1].productCode;

         let type = $input('#addType');
         let price = $input('#addPrice');
         let discount = $input('#addDiscount');
         let description = $input('#addDescription');
         let typeValue = type.content();
         let priceValue = +price.content();
         let discountValue = +discount.content();
         let descriptionValue = description.content();

         if (!!typeValue) {
            let productList = getData('productList');
            productList.push(this.product.create({
               productCode: lastIndex + 1,
               price: priceValue,
               discount: discountValue,
               type: typeValue,
               description: descriptionValue
            }));
            setData('productList', productList);
            type.clear();
            price.clear();
            discount.clear();
            description.clear();
            observer.notify('change');
         }
         else {
            alert('You need to specify the type of product!');
         }
      });
   }

   change() {
      $('#productList').on('click', (event) => {
         let target = $(event.target);
         let action = target.getAttr('data-action');
         if (action == 'change') {
            let item = target.closest('[data-type="product"]');
            let index = $(item).getAttr('data-index');
            activateBlock('#changeBlock');
            this.save(index);
         }
      });
   }

   save(index) {
      $('#close').on('click', activateChanging, { once: true });
      $('#save').on('click', (event) => {
         event.preventDefault();
         let type = $input('#changeType');
         let price = $input('#changePrice');
         let discount = $input('#changeDiscount');
         let description = $input('#changeDescription');
         let typeValue = type.content();
         let priceValue = +price.content();
         let discountValue = +discount.content();
         let descriptionValue = description.content();

         if (!!typeValue) {
            let productList = getData('productList');
            let product = productList[index];
            product.price = priceValue;
            product.discount = discountValue;
            product.type = typeValue;
            product.descriptio = descriptionValue;
            productList[index] = product;

            setData('productList', productList);
            type.clear();
            price.clear();
            discount.clear();
            description.clear();
            observer.notify('change');
            activateBlock('#changeBlock');
         }
         else {
            alert('You need to specify the type of product!');
         }
      }, { once: true });
   }

   render() {
      let list = $('#productList');
      let productList = getData('productList');
      list.clear();
      productList.forEach((product, index) => {
         list.add(`

         <tr data-type="product" data-index="${index}">
            <td>
               <img src="images/${product.image}" alt="product">
            </td>
            <td>${product.type}</td>
            <td>${product.price}</td>
            <td>${product.productCode}</td>
            <td>${product.discount}</td>
            <td>
               <button class="form-control btn btn-primary" data-action="change">Change</button>
            </td>
            <td>
               <button class="form-control btn btn-danger" data-action="delete">Delete</button>
            </td>
			</tr>
         `);
      });
   }

}


let productList = new Products();
let observer = new Observer();
productList.init();

observer.subscribe('change', productList.render.bind(productList));
