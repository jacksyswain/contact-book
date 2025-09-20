export default function ContactList({ contacts, onDelete }) {
  return (
    <div className="contact-list">
      {contacts.map(c => (
        <div key={c._id} className="contact-item">
          <div>
            <p><b>{c.name}</b></p>
            <p>{c.email} | {c.phone}</p>
          </div>
          <button onClick={() => onDelete(c._id)} className="delete">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
