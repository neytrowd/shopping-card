import { $, $input } from './Dom';
import { Observer } from './Observer';
import { users, UserFactory } from './Users';
import { activateBlock, has, getData, setData, loader } from './Utils';

class Users {
   constructor() {
      this.user = new UserFactory();
   }

   init() {
      this.loadUsers();
      this.render();
      this.add();
      this.delete();
      this.change();
   }

   loadUsers() {
      if (!has('users')) {
         setData('users', users);
      }
   }

   delete() {
      $('#userList').on('click', (event) => {
         let target = $(event.target);
         let action = target.getAttr('data-action');

         if (action == 'delete') {
            let item = target.closest('[data-type="user"]');
            let index = $(item).getAttr('data-index');
            let usersList = getData('users', users);
            usersList.splice(index, 1);
            setData('users', usersList);
            observer.notify('change');
         }
      });
   }


   change() {
      $('#userList').on('click', (event) => {
         let target = $(event.target);
         let action = target.getAttr('data-action');
         if (action == 'change') {
            let item = target.closest('[data-type="user"]');
            let index = $(item).getAttr('data-index');
            activateBlock('#changeBlock');
            this.save(index);
         }
      });
   }

   save(index) {
      $('#close').on('click', () => {
         activateBlock('activateBlock');
      }, { once: true });
      $('#save').on('click', (event) => {
         event.preventDefault();
         let password = $input('#changePassword');
         let confirm = $input('#changeConfirm');
         let passwordValue = password.content();
         let confirmValue = confirm.content();

         if (!!passwordValue && passwordValue == confirmValue) {
            let usersList = getData('users');
            let user = usersList[index];
            user.password = passwordValue;
            usersList[index] = user;

            setData('users', usersList);
            password.clear();
            confirm.clear();
            observer.notify('change');
            activateBlock('#changeBlock');
         }
         else {
            alert('Passwords must match!');
         }
      }, { once: true });
   }


   add() {
      $('#register').on('click', (event) => {
         event.preventDefault();
         let login = $input('#login');
         let password = $input('#password');
         let confirm = $input('#confirm');
         let loginValue = login.content();
         let passwordValue = password.content();
         let confirmValue = confirm.content();

         if (passwordValue == confirmValue) {
            let usersList = getData('users', users);
            usersList.push(this.user.create(loginValue, passwordValue));
            setData('users', usersList);
            observer.notify('change');
            login.clear();
            password.clear();
            confirm.clear();
         }
         else {
            alert('Passwords must match!');
         }
      });
   }

   render() {
      let list = $('#userList');
      let usersList = getData('users');
      list.clear();
      usersList.forEach((user, index) => {
         list.add(`
         <tr data-type="user" data-index="${index}">
            <td><img src="images/user.jpg" alt=""></td>
            <td>${user.login}</td>
            <td>${user.password}</td>
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


let user = new Users();
let observer = new Observer();
user.init();

observer.subscribe('change', user.render.bind(user));
