import { $input } from './Dom';
import { Observer } from './Observer';
import { Cart } from './Cart';
import { users, UserFactory } from './Users';
import { redirect, has, getData, setData, loader } from './Utils';

class Auth {
   signIn() {
      let login = $input('#loginEmail');
      let password = $input('#loginPassword');

      $input('#loginSub').on('click', (event) => {
         event.preventDefault();
         let users = getData('users');
         let loginValue = login.content().toLowerCase();
         let passwordValue = password.content().toLowerCase();
         let userFound = users.some((user, index) => {
            let log = user.login == loginValue;
            let pass = user.password == passwordValue;
            if (log && pass) {
               setData('currentUser', index);
               redirect('index');
               return true;
            }
         });
         if (!userFound) alert('Invalid login or password');
      });
   }

   register() {
      let login = $input('#registerEmail');
      let password = $input('#registerPassword');
      let confirm = $input('#registerConfirm');
      let userFactory = new UserFactory();

      $input('#registerSub').on('click', (event) => {
         event.preventDefault();
         let users = getData('users');
         let loginValue = login.content().toLowerCase();
         let passwordValue = password.content().toLowerCase();
         let confirmValue = confirm.content().toLowerCase();
         let matchPassword = passwordValue === confirmValue;
         let userFound = users.some(user => {
            if (user.login == loginValue) return true;
         });

         if (!userFound) {
            if (matchPassword) {
               users.push(userFactory.create(loginValue, passwordValue));
               setData('users', users);
               redirect('index');
            }
            else alert('Password must match');
         }
         else alert('User is already exists');
      });
   }
}

class AuthUsers extends Auth {
   init() {
      this.loadUsers();
      this.signIn();
      this.register();
   }

   loadUsers() {
      if (!has('users')) {
         setData('users', users);
      }
   }
}

loader();
let auth = new AuthUsers();
auth.init();

// let cart = new Cart();
// cart.init();
// let observer = new Observer();
// observer.subscribe('changeCartState', cart.render.bind(cart));