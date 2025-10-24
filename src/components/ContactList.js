import React from 'react';
import ContactCard from './ContactCard';
import './ContactList.css';

const ContactList = ({ contacts, onToggleFavorite, onContactClick }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact, index) => (
        <ContactCard 
          key={contact.id} 
          contact={contact} 
          index={index}
          onToggleFavorite={onToggleFavorite}
          onContactClick={onContactClick}
        />
      ))}
    </div>
  );
};

export default ContactList;