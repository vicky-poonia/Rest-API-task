const ul = document.getElementById("item");

let table1 = document.getElementById("table1-list");
let table2 = document.getElementById("table2-list");
let table3 = document.getElementById("table3-list");

// !Event listeners
ul.addEventListener("click", removeItem);
window.addEventListener("DOMContentLoaded", fetchDetails);

ul.addEventListener("click", handleItemClick);  // Change event listener

function handleItemClick(event) {
  if (event.target.classList.contains("delete")) {
    removeItem(event);
  } else if (event.target.classList.contains("edit")) {
    editItem(event);
  }
}

// fetch details function
async function fetchDetails() {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/5e3b0712cabb48a7bdaaa571e790e8ef/restaurant"
    );
    console.log("get successful on load");
    response.data.forEach((user) => {
      showUserDetail(user);
    });
  } catch (error) {
    console.log(error);
  }
}

//! add data function
async function addData(event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";

  const editBtn = document.createElement("button"); // Add an Edit button
  editBtn.className = "edit";
  editBtn.textContent = "Edit";

  const li = document.createElement("li");
  li.textContent = amount + " @ " + description + " -> " + category;
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  if (category === "Table 1") {
    table1.appendChild(li);
  } else if (category === "Table 2") {
    table2.appendChild(li);
  } else {
    table3.appendChild(li);
  }

  let myObj = {
    amount: amount,
    description: description,
    category: category,
  };

  console.log(myObj, "myObj");

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/5e3b0712cabb48a7bdaaa571e790e8ef/restaurant",
      myObj
    );
    console.log(response, "response");
    // const idd = li.id = response.data._id;
    // console.log(idd, idd);
  } catch (error) {
    console.log(error);
  }
}

function showUserDetail(user) {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";

  const editBtn = document.createElement("button"); // Add an Edit button
  editBtn.className = "edit";
  editBtn.textContent = "Edit";

  const li = document.createElement("li");
  li.textContent =
    user.amount + " @ " + user.description + " -> " + user.category;
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  li.id = user._id;

  if (user.category === "Table 1") {
    table1.appendChild(li);
  } else if (user.category === "Table 2") {
    table2.appendChild(li);
  } else {
    table3.appendChild(li);
  }
}

async function removeItem(event) {
  if (event.target.classList.contains("delete")) {
    const li = event.target.parentElement;
    const liParent = li.parentElement;
    liParent.removeChild(li);

    const id = li.id;
    try {
      const response = await axios.delete(
        `https://crudcrud.com/api/5e3b0712cabb48a7bdaaa571e790e8ef/restaurant/${id}`
      );
      console.log("delete successful", response);
    } catch (error) {
      console.log(error);
    }
  }
}

async function editItem(event) {
  const li = event.target.parentElement;
  const id = li.id;
  
  try {
    const response = await axios.get(
      `https://crudcrud.com/api/5e3b0712cabb48a7bdaaa571e790e8ef/restaurant/${id}`
    );

    const data = response.data;
    // console.log(data);
    document.getElementById("amount").value = data.amount;
    document.getElementById("description").value = data.description;
    document.getElementById("category").value = data.category;
    document.getElementById("itemId").value = id;
  } catch (error) {
    console.log(error);
  }
}

async function updateData(event) {
  // console.log("jerbaifberdz");
  const li = event.target.parentElement;
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  console.log(amount, "amount");

  const id = document.getElementById("itemId").value;
  console.log(id,"id");

  const myObj = {
    amount: amount,
    description: description,
    category: category,
  };
  console.log(myObj, "myObj");

  try {
    const response = await axios.put(
      `https://crudcrud.com/api/5e3b0712cabb48a7bdaaa571e790e8ef/restaurant/${id}`,
      myObj
    );
    
    console.log("Data updated successfully");
  } catch (error) {
    console.log(error);
  }
}

