class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var i = this.users.findIndex((user) => user.id === id);
    if (i === -1) {
      return false;
    }
    var user = this.users.splice(i, 1).pop();
    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var userList = users.map((user) => user.name);
    return userList;
  }
}

module.exports = {Users};

// ES6 classes

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }

// var me = new Person('James', 45);
// console.log(me.getUserDescription());
