console.log("script is connected");
function handleAddContact() {
  const name = document.getElementById("nameInput").value;
  const role = document.getElementById("roleInput").value;

  if (!name || !role) return;

  addContact(name, role);

  document.getElementById("nameInput").value = "";
  document.getElementById("roleInput").value = "";
}// Array to store contacts
let contacts = [];

// Load contacts from localStorage (if any exist)
function loadContacts() {
  const saved = localStorage.getItem("contacts");
  if (saved) {
    contacts = JSON.parse(saved);
  }
  renderContacts();
}

// Save contacts to localStorage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Add a new contact
function addContact(name, role) {
  const newContact = {
    id: Date.now(),
    name: name,
    role: role
  };

  contacts.push(newContact);
  saveContacts();
  renderContacts();
}

// Delete a contact
function deleteContact(id) {
  contacts = contacts.filter(contact => contact.id !== id);
  saveContacts();
  renderContacts();
}

// Display contacts on the page
function renderContacts() {
  const container = document.getElementById("contactsList");
  container.innerHTML = "";

  contacts.forEach(contact => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p><strong>${contact.name}</strong> - ${contact.role}</p>
      <button onclick="deleteContact(${contact.id})">Delete</button>
    `;

    container.appendChild(div);
  });
}

// Run on page load
loadContacts();
