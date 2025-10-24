import React, { useState } from 'react';
import './ContactCard.css';

const ContactCard = ({ contact, index, onToggleFavorite, onContactClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getAnimalEmoji = (contact) => {
    const animals = [
      { default: '🦁', hover: '🦁' }, // Lion roaring
      { default: '🐯', hover: '🐅' }, // Tiger prowling
      { default: '🐻', hover: '🐻‍❄️' }, // Bear dancing
      { default: '🦊', hover: '🦊' }, // Fox cunning
      { default: '🐺', hover: '🐺' }, // Wolf howling
      { default: '🐨', hover: '🐨' }, // Koala climbing
      { default: '🐼', hover: '🐼' }, // Panda eating
      { default: '🐸', hover: '👅' }, // Frog showing tongue
      { default: '🐵', hover: '🙈' }, // Monkey see no evil
      { default: '🦄', hover: '✨' }, // Unicorn sparkling
      { default: '🐷', hover: '🐽' }, // Pig snorting
      { default: '🐮', hover: '🐄' }, // Cow mooing
      { default: '🐭', hover: '🧀' }, // Mouse with cheese
      { default: '🐹', hover: '🥜' }, // Hamster with nut
      { default: '🐰', hover: '🥕' }, // Rabbit with carrot
      { default: '🦝', hover: '🗑️' }, // Raccoon with trash
      { default: '🐶', hover: '🦴' }, // Dog with bone
      { default: '🐱', hover: '🐾' }, // Cat with paws
      { default: '🐙', hover: '🌊' }, // Octopus swimming
      { default: '🐬', hover: '🌊' }, // Dolphin in ocean
      { default: '🦋', hover: '🌸' }, // Butterfly on flower
      { default: '🐝', hover: '🍯' }, // Bee with honey
      { default: '🐧', hover: '🧊' }, // Penguin on ice
      { default: '🦉', hover: '🌙' }  // Owl at night
    ];
    
    // Use stored avatar index if available, otherwise calculate from name
    if (contact.avatarIndex !== undefined) {
      return animals[contact.avatarIndex];
    }
    
    const charCode = contact.name.charCodeAt(0) + contact.name.charCodeAt(contact.name.length - 1);
    return animals[charCode % animals.length];
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#ff6b35', '#f7931e', '#ff8c42', '#ff7f50',
      '#ffa500', '#ffb347', '#ffd700', '#ff6347',
      '#e74c3c', '#9b59b6', '#3498db', '#1abc9c'
    ];
    const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    return colors[charCode % colors.length];
  };

  const handleFavoriteClick = () => {
    setIsAnimating(true);
    onToggleFavorite(contact.id);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const animalData = getAnimalEmoji(contact);

  const handleCardClick = (e) => {
    // Don't trigger card click if clicking on action buttons
    if (e.target.closest('.contact-action-btn')) {
      return;
    }
    onContactClick(contact);
  };

  return (
    <div 
      className={`contact-card ${contact.isFavorite ? 'favorite' : ''}`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Favorite button moved to contact details modal */}
      
      <div className="contact-avatar-container">
        <div 
          className={`contact-avatar ${isHovered ? 'hovered' : ''}`}
          style={{ backgroundColor: getAvatarColor(contact.name) }}
        >
          <span className="avatar-emoji">
            {isHovered ? animalData.hover : animalData.default}
          </span>
        </div>
      </div>
      
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <div className="contact-details">
          <div className="contact-detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>{contact.email}</span>
          </div>
          <div className="contact-detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>{contact.phone}</span>
          </div>
        </div>
      </div>

      <div className="contact-actions">
        <button className="contact-action-btn call-btn" title="Call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </button>
        <button className="contact-action-btn video-btn" title="Video Call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        </button>
        <button className="contact-action-btn email-btn" title="Email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </button>
        <button className="contact-action-btn message-btn" title="Message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactCard;