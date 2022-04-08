const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");
const { v4 } = require("uuid");

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await getAllContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const allContacts = await getAllContacts();
  const idx = allContacts.findIndex((item) => item.id === contactId);
  if (idx === -1) null;
  const removeContact = allContacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const allContacts = await getAllContacts();
  const newContact = allContacts.concat({ name, email, phone, id: v4() });
  await fs.writeFile(contactsPath, JSON.stringify(newContact));
  return newContact;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
};
