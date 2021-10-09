import { $ } from './Dom';
import { Observer } from './Observer';
import { localStore } from './Storage';
import { Cart } from "./Cart";
import { loader, infoItem, locationItem } from './Utils';

class LocalStore {
   constructor() {
      this.current = 0;
   }

   init() {
      this.render();
      this.show();
      this.selectLocation();
   }

   show() {
      $('#location').content(locationItem(localStore[this.current]));
   }

   render() {
      let list = $('#infoItems');
      list.clear();
      localStore.forEach((info, index) => {
         list.add(infoItem(info, index));
      });
   }

   selectLocation() {
      $('#infoItems').on('click', (event) => {
         event.preventDefault();
         let btn = $(event.target)
         let action = btn.getAttr('data-action');
         if (action == 'view') {
            let block = btn.closest('.info-item')
            this.current = +$(block).getAttr('data-index');
            observer.notify('changeLocation');
         }
      });
   }

}

loader();
let store = new LocalStore();
store.init();

let observer = new Observer();
observer.subscribe('changeLocation', store.show.bind(store));

// let cart = new Cart();
// cart.init();
// observer.subscribe('changeCartState', cart.render.bind(cart));