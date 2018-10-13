const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Bill';
    let text = 'foo bar';
    let message = generateMessage(from, text);

    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
    expect(typeof message.createdAt).toBe('number');
  });
});
