const API = "https://contact-book-9yyp.onrender.com/contacts";

export const fetchContacts = async (page=1) => {
  const res = await fetch(`${API}?page=${page}&limit=5`);
  return res.json();
};

export const addContact = async (contact) => {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });
};

export const deleteContact = async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
};
