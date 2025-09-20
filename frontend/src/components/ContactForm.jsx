import { useState } from "react";

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !/\S+@\S+\.\S+/.test(form.email) || !/^[0-9]{10}$/.test(form.phone)) {
      alert("Invalid input");
      return;
    }
    onAdd(form);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (10 digits)" />
      <button type="submit" className="add">Add Contact</button>
    </form>
  );
}
