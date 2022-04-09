const searchbar = document.querySelector(".users .search input"),
  searchBtn = document.querySelector(".users .search button"),
  usersList = document.querySelector(".users .users-list");
searchBtn.onclick = () => {
  searchbar.classList.toggle("active");
  searchbar.focus();
  searchBtn.classList.toggle("active");
}
//Toggling the class means if there is no class name assigned to the element, 
//then a class name can be assigned to it dynamically or
// if a certain class is already present, then it can be removed dynamically by just using the toggle()
searchbar.onkeyup = () => {
  let searchTerm = searchbar.value;
  if (searchTerm != "") {
    searchbar.classList.add("active");
  }
  else {
    searchbar.classList.remove("active");
  }
  if (searchbar.value == "") {
    searchBtn.classList.toggle("active");
  }
  if (searchTerm != "") {
    let x = new XMLHttpRequest();//creating xml object
    x.open("POST", "php/search.php", true);
    x.onload = () => {
      if (x.readyState === XMLHttpRequest.DONE) {
        if (x.status === 200) {
          let data = x.response;
          console.log(data);
          usersList.innerHTML = data;
        }
      }
    }
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //the keys and values are encoded in key-value tuples separated by '&', with a '=' between the key and the value. Non-alphanumeric characters in both keys and values are percent encoded:
    //this is the reason why this type is not suitable to use with binary data (use multipart/form-data instead)
    //If a header with the specified name has already been specified, 
    //the new value for that header is the previously specified value, plus a comma, a space, 
    //and the value specified in this call.
    x.send("searchTerm=" + searchTerm);
  }
}

setInterval(() => {
  let x = new XMLHttpRequest();//creating xml object
  x.open("GET", "php/users.php", true);
  x.onload = () => {
    if (x.readyState === XMLHttpRequest.DONE) {
      if (x.status === 200) {
        let data = x.response;
        console.log(data);
        if (!searchbar.classList.contains("active")) {//to prevent from run to ajax responce at same time
          usersList.innerHTML = data;                 //(1) from search and 2) from users.php
        }                                             //if searchbar not using, then add this data
      }
    }
  }
  x.send()
}, 500);//run fter every .5s