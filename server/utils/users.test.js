const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users = [];
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Bill',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Ted',
      room: 'Node Course'
    }];
  });

  it('should add new users', () => {
    var user = {
      id: '123',
      name: 'Tom',
      room: 'A1'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users[3]).toEqual(user);
  });

  it('should remove a user', () => {
    var user = users.removeUser('3');

    expect(users.users.length).toBe(2);
    expect(user.name).toBe('Ted');
  });

  it('should not remove invalid user', () => {
    var user = users.removeUser('5');

    expect(users.users.length).toBe(3);
    expect(user).toBeFalsy();
  });

  it('should find user', () => {
    var user = users.getUser('1');

    expect(user.name).toBe('Mike');
  });

  it('should not find invalid user', () => {
    var user = users.getUser('5');

    expect(user).toBeFalsy();
  });

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Ted']);
  });

  it('should return names for React Course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Bill']);
  });
});
