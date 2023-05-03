class Person {
  constructor(lastName, firstName, phone, birthYear) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.phone = phone;
    this.birthYear = birthYear;
  }

  getFullName() {
    return this.lastName + ", " + this.firstName;
  }
  getAge() {
    return Number(new Date().getFullYear()) - Number(this.birthYear);
  }
}

let PhoneBook = {
  allFriends: [],

  getNumberOfFriends: function () {
    return this.allFriends.length;
  },
  getAverageAge: function () {
    let sumOfAge = 0;
    for (let i = 0; i < this.allFriends.length; i++) {
      sumOfAge += this.allFriends[i].getAge();
    }
    return Math.round(sumOfAge / this.allFriends.length);
  },
  addNewFriend: function (newFriend) {
    this.allFriends.push(newFriend);
  },
  removeFriend: function (index) {
    this.allFriends.splice(index, 1);
  },
};

let editFlag = false;

function standart() {
  document.querySelector("#last_name").value = "Jobs";
  document.querySelector("#first_name").value = "Steve";
  document.querySelector("#phone").value = "+12346789090";
  document.querySelector("#birthYear").value = 1955;
}

function clearInput() {
  document.querySelector("#last_name").value = "";
  document.querySelector("#first_name").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#birthYear").value = "";
  editFlag = false;
}

function save() {
  if (checkFilled()) {
    if (editFlag) {
      saveEdited();
    } else {
      let Friend = new Person();
      Friend.lastName = document.querySelector("#last_name").value;
      Friend.firstName = document.querySelector("#first_name").value;
      Friend.phone = document.querySelector("#phone").value;
      Friend.birthYear = document.querySelector("#birthYear").value;
      PhoneBook.addNewFriend(Friend);
      updateContacts();
      clearInput();
    }
  }
}

function showThisContact(index) {
  document.querySelector("#indexOfFriend").innerHTML = index;
  document.querySelector("#names").innerHTML =
    PhoneBook.allFriends[index].getFullName();
  document.querySelector("#phoneFriend").innerHTML =
    PhoneBook.allFriends[index].phone;
  document.querySelector("#birthYearFriend").innerHTML =
    PhoneBook.allFriends[index].birthYear;
  document.querySelector("#AgeFriend").innerHTML =
    PhoneBook.allFriends[index].getAge();
}

function updateContacts() {
  let contactList = PhoneBook.allFriends;
  let contactsContainer = document.querySelector(".contacts");
  contactsContainer.innerHTML = "";
  for (let i = 0; i < contactList.length; i++) {
    let newContactElement = document.createElement("p");
    newContactElement.innerHTML = contactList[i].getFullName();
    let newContactContainer = document.createElement("div");
    newContactContainer.classList.add("contact");
    newContactContainer.appendChild(newContactElement);
    newContactContainer.addEventListener(
      "click",
      function () {
        showThisContact(i);
      },
      false
    );
    contactsContainer.appendChild(newContactContainer);
  }
  document.querySelector("#average").innerHTML = PhoneBook.getAverageAge();
  document.querySelector("#friendCounter").innerHTML =
    PhoneBook.getNumberOfFriends();
}

function remove() {
  let index = document.querySelector("#indexOfFriend").innerHTML;
  if (index >= 0) {
    PhoneBook.removeFriend(index);
    document.querySelector("#indexOfFriend").innerHTML = -1;
    document.querySelector("#names").innerHTML = null;
    document.querySelector("#phoneFriend").innerHTML = null;
    document.querySelector("#birthYearFriend").innerHTML = null;
    document.querySelector("#AgeFriend").innerHTML = null;
    updateContacts();
    clearInput();
    editFlag = false;
  }
}

function edit() {
  let index = document.querySelector("#indexOfFriend").innerHTML;
  if (index >= 0) {
    editFlag = true;
    document.querySelector("#last_name").value =
      PhoneBook.allFriends[index].lastName;
    document.querySelector("#first_name").value =
      PhoneBook.allFriends[index].firstName;
    document.querySelector("#phone").value = PhoneBook.allFriends[index].phone;
    document.querySelector("#birthYear").value =
      PhoneBook.allFriends[index].birthYear;
  }
}

function saveEdited() {
  let index = document.querySelector("#indexOfFriend").innerHTML;
  PhoneBook.allFriends[index].lastName =
    document.querySelector("#last_name").value;
  PhoneBook.allFriends[index].firstName =
    document.querySelector("#first_name").value;
  PhoneBook.allFriends[index].phone = document.querySelector("#phone").value;
  PhoneBook.allFriends[index].birthYear =
    document.querySelector("#birthYear").value;
  updateContacts();
  showThisContact(index);
  editFlag = false;
}

function checkFilled() {
  if (document.querySelector("#last_name").value == "") {
    alert("Fill last name");
    return false;
  } else if (document.querySelector("#first_name").value == "") {
    alert("Fill first name");
    return false;
  } else if (document.querySelector("#phone").value == "") {
    alert("Fill phone");
    return false;
  } else if (document.querySelector("#birthYear").value == "") {
    alert("Fill birth year");
    return false;
  }
  return true;
}
