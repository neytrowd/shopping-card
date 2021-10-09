import { $ } from './Dom';
import { Observer } from './Observer';
import { showState, activateBlock, getData, setData } from './Utils';

class Orders {

   init() {
      this.render();
      this.showOrders();
      this.execute();
      this.closeOrders();
   }

   showOrders() {
      $('#clientList').on('click', (event) => {
         let target = $(event.target);
         let type = target.getAttr('data-action');

         if (type == 'show') {
            let block = target.closest('[data-type="user"]');
            let index = $(block).getAttr('data-index');
            let boughtProducts = getData('boughtProducts');
            let ordersList = $('#ordersList');
            ordersList.clear();
            activateBlock('#ordersBlock');
            if (!boughtProducts[index]) return;
            boughtProducts[index].forEach(product => {
               ordersList.add(`
               <tr>
                  <td><img src="images/${product.image}" alt=""></td>
                  <td>${product.type}</td>
                  <td>${product.price}</td>
                  <td>${product.productCode}</td>
                  <td>${product.count}</td>
                  <td>${product.discount}</td>
               </tr>
               `);
            });
         }
      });
   }

   closeOrders() {
      $('#ordersClose').on('click', () => {
         activateBlock('#ordersBlock');
      });
   }

   execute() {
      $('#clientList').on('click', (event) => {
         let target = $(event.target);
         let type = target.getAttr('data-action');
         if (type == 'execute') {
            let block = target.closest('[data-type="user"]');
            let index = $(block).getAttr('data-index');
            let boughtUsers = getData('boughtUsers');
            boughtUsers[index].done = true;
            setData('boughtUsers', boughtUsers);
            observer.notify('changeState');
         }
      });
   }

   render() {
      let boughtUsers = getData('boughtUsers');
      if (!!boughtUsers) {
         let clientList = $('#clientList');
         clientList.clear();
         Object.keys(boughtUsers).forEach(key => {
            let stateBtn = boughtUsers[key].done
               ? `<button class="form-control btn btn-success" disabled>Done</button>`
               : `<button class="form-control btn btn-danger" data-action="execute">Execute</button>`;
            clientList.add(`
            <tr class="row" data-type="user" data-index="${key}">
               <td class="col-4">${boughtUsers[key].name}</td>
               <td class="col-4">${boughtUsers[key].phone}</td>
               <td class="col-2">
                  <button class="form-control btn btn-primary" data-action="show">Show</button>
               </td>
               <td class="col-2">${stateBtn}</td>
            </tr>
            `);
         });
      }
   }

}


let orders = new Orders();
orders.init();

let observer = new Observer();
observer.subscribe('changeState', orders.render.bind(orders));