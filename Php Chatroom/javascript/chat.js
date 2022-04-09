const form = document.querySelector('.typing-area'),
  inputfield = form.querySelector('.input-field'),
  sendbtn = form.querySelector('button'),
  chatbox = document.querySelector('.chat-box');

form.onsubmit = (e) => {
  e.preventDefault();
}

sendbtn.onclick = () => {
  let x = new XMLHttpRequest();//creating xml object
  x.open("Post", "php/insert-chat.php", true);
  x.onload = () => {
    if (x.readyState === XMLHttpRequest.DONE) {
      if (x.status === 200) {
        inputfield.value = "";//once send, make it blank
      }
    }
  }
  let formData = new FormData(form);
  x.send(formData);
}

chatbox.onmouseenter = () => {
  chatbox.classList.add("active");
}

chatbox.onmouseleave = () => {
  chatbox.classList.remove("active");
}

setInterval(() => {
  let x = new XMLHttpRequest();//creating xml object
  x.open("POST", "php/get-chat.php", true);

  x.onload = () => {
    if (x.readyState === XMLHttpRequest.DONE) {
      if (x.status === 200) {
        let data = x.response;
        //prompt(data);
        chatbox.innerHTML = data;
        if (!chatbox.classList.contains("active")) {
          scrollToBottom();
        }
      }
    }
  }
  let formData = new FormData(form);
  x.send(formData);
}, 500);//run fter every .5s

function scrollToBottom() {
  chatbox.scrollTop = chatbox.scrollHeight;
}