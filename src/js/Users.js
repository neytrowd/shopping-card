export let users = [
   {
      login: 'aaaa',
      password: 'aaaa'
   },
   {
      login: 'bbbb',
      password: 'bbbb'
   },
   {
      login: 'cccc',
      password: 'cccc'
   },
];


export class User {
   constructor(login, password) {
      this.login = login;
      this.password = password;
   }
}

export class UserFactory {
   create(login, password) {
      return new User(login, password);
   }
}