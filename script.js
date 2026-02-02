// 🔥 Replace with your Firebase config
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function sendMessage() {
  var username = document.getElementById("username").value;
  var message = document.getElementById("messageInput").value;

  if (username === "" || message === "") return;

  database.ref("messages").push({
    user: username,
    text: message
  });

  document.getElementById("messageInput").value = "";
}

database.ref("messages").on("child_added", function(snapshot) {
  var msg = snapshot.val();
  var messagesDiv = document.getElementById("messages");

  var messageElement = document.createElement("div");
  messageElement.textContent = msg.user + ": " + msg.text;

  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
