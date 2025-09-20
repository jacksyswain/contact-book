import Contact from "../models/contactModels.js";

// Add contact
export const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!/^[0-9]{10}$/.test(phone)) return res.status(400).json({ message: "Phone must be 10 digits" });
    if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ message: "Invalid email" });

    const contact = await Contact.create({ name, email, phone });
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get contacts (paginated)
export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find().skip(skip).limit(limit);
    const total = await Contact.countDocuments();

    res.json({ contacts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
