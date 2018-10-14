var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  $('#messages').append(html);
});

$('#message-form').on('submit', function (event) {
  event.preventDefault();
  var messageTextBox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'Bill',
    text: messageTextBox.val()
  }, function (acknowledgement) {
    // console.log(acknowledgement);
    messageTextBox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationButton.prop('disabled', true).text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    locationButton.prop('disabled', false).text('Send location');
  }, function () {
    alert('Unable to fetch location');
    locationButton.prop('disabled', false).text('Send location');
  });
});
