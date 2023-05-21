import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container } from './App.styled';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  const onSubmit = data => {
    if (contacts.find(({ name }) => name === data.name)) {
      return alert(`${data.name} is already in contacts`);
    }
    setContacts([data, ...contacts]);
  };

  useEffect(() => {
    const data = localStorage.getItem('contacts');
    if (data) {
      setContacts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = () => {
    if (filter) {
      const normalizedFilter = filter.toLowerCase();
      return contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const removeContact = idx => {
    const contactsWithoutRemovedContact = contacts.filter(
      contact => contact.id !== idx
    );
    setContacts(contactsWithoutRemovedContact);
  };
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmit} />

      <h1>Contacts</h1>
      <Filter filter={filter} onChange={handleChangeFilter} />
      <ContactList contacts={filteredContacts()} onRemove={removeContact} />
    </Container>
  );
}
