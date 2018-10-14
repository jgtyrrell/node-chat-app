const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    let from = 'Bill';
    let lat = 51.4;
    let lng = -2.6;
    let message = generateLocationMessage(from, lat, lng);

    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('url', `https://www.google.com/maps?q=${lat},${lng}`);
    expect(typeof message.createdAt).toBe('number');
  });
});
