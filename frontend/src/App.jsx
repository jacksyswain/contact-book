import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { fetchContacts, addContact, deleteContact } from "./api";
import "./App.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadContacts = async (pageNum = 1) => {
    const data = await fetchContacts(pageNum);
    setContacts(data.contacts);
    setTotalPages(data.pages);
    setPage(data.page);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleAdd = async (newContact) => {
    await addContact(newContact);
    loadContacts(page);
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    loadContacts(page);
  };

  return (
    <div className="container">
      <h1>Contact Book</h1>
      <ContactForm onAdd={handleAdd} />
      <ContactList contacts={contacts} onDelete={handleDelete} />
      <div className="pagination">
        <button disabled={page === 1} onClick={() => loadContacts(page - 1)}>Prev</button>
        <span>Page {page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => loadContacts(page + 1)}>Next</button>
      </div>
    </div>
  );
}
