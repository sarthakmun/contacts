import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ContactDetailsModal.css';

const ContactDetailsModal = ({ contact, onClose, onEdit, onDelete, onToggleFavorite, onUpdateContact }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  // Prevent body scroll when avatar selector is open
  React.useEffect(() => {
    if (showAvatarSelector) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAvatarSelector]);

  const getAnimalEmoji = (name) => {
    const animals = [
      { default: '🦁', hover: '🦁' }, { default: '🐯', hover: '🐅' }, { default: '🐻', hover: '🐻‍❄️' },
      { default: '🦊', hover: '🦊' }, { default: '🐺', hover: '🐺' }, { default: '🐨', hover: '🐨' },
      { default: '🐼', hover: '🐼' }, { default: '🐸', hover: '👅' }, { default: '🐵', hover: '🙈' },
      { default: '🦄', hover: '✨' }, { default: '🐷', hover: '🐽' }, { default: '🐮', hover: '🐄' },
      { default: '🐭', hover: '🧀' }, { default: '🐹', hover: '🥜' }, { default: '🐰', hover: '🥕' },
      { default: '🦝', hover: '🗑️' }, { default: '🐶', hover: '🦴' }, { default: '🐱', hover: '🐾' },
      { default: '🐙', hover: '🌊' }, { default: '🐬', hover: '🌊' }, { default: '🦋', hover: '🌸' },
      { default: '🐝', hover: '🍯' }, { default: '🐧', hover: '🧊' }, { default: '🦉', hover: '🌙' }
    ];
    const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
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

  const animalData = getAnimalEmoji(contact.name);

  const allAnimals = [
    { default: '🦁', hover: '🦁' }, { default: '🐯', hover: '🐅' }, { default: '🐻', hover: '🐻‍❄️' },
    { default: '🦊', hover: '🦊' }, { default: '🐺', hover: '🐺' }, { default: '🐨', hover: '🐨' },
    { default: '🐼', hover: '🐼' }, { default: '🐸', hover: '👅' }, { default: '🐵', hover: '🙈' },
    { default: '🦄', hover: '✨' }, { default: '🐷', hover: '🐽' }, { default: '🐮', hover: '🐄' },
    { default: '🐭', hover: '🧀' }, { default: '🐹', hover: '🥜' }, { default: '🐰', hover: '🥕' },
    { default: '🦝', hover: '🗑️' }, { default: '🐶', hover: '🦴' }, { default: '🐱', hover: '🐾' },
    { default: '🐙', hover: '🌊' }, { default: '🐬', hover: '🌊' }, { default: '🦋', hover: '🌸' },
    { default: '🐝', hover: '🍯' }, { default: '🐧', hover: '🧊' }, { default: '🦉', hover: '🌙' }
  ];

  const handleAvatarChange = (newAnimalIndex) => {
    // Update the contact with new avatar index to force different animal
    const updatedContact = { 
      ...contact, 
      avatarIndex: newAnimalIndex // Store the selected animal index
    };
    onUpdateContact(updatedContact);
    setShowAvatarSelector(false);
  };

  // Get the correct animal based on stored index or default calculation
  const getCurrentAnimal = () => {
    if (contact.avatarIndex !== undefined) {
      return allAnimals[contact.avatarIndex];
    }
    return animalData;
  };

  const currentAnimal = getCurrentAnimal();

  const mockCallHistory = [
    { type: 'outgoing', date: '2024-10-24', time: '14:30', duration: '5:23' },
    { type: 'incoming', date: '2024-10-23', time: '09:15', duration: '12:45' },
    { type: 'missed', date: '2024-10-22', time: '18:20', duration: '0:00' },
    { type: 'outgoing', date: '2024-10-21', time: '11:05', duration: '3:12' }
  ];

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="contact-details-backdrop" onClick={handleBackdropClick}>
      <div className="contact-details-modal">
        <div className="contact-details-header">
          <div className="avatar-container-wrapper">
            <div 
              className="contact-avatar-large" 
              style={{ backgroundColor: getAvatarColor(contact.name) }}
              onClick={() => setShowAvatarSelector(true)}
            >
              {currentAnimal.default}
            </div>
            <button 
              className="change-avatar-btn"
              onClick={() => setShowAvatarSelector(true)}
              title="Change Avatar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
          <div className="contact-header-info">
            <h2 className="contact-name-large">{contact.name}</h2>
            <div className="contact-status-info">
              <span className="status-indicator"></span>
              <span>Available</span>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className={`favorite-toggle ${contact.isFavorite ? 'active' : ''}`}
              onClick={() => {
                console.log('Favorite clicked for:', contact.id, 'Current favorite:', contact.isFavorite);
                onToggleFavorite(contact.id);
              }}
              title={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {contact.isFavorite ? '⭐' : '☆'}
            </button>
            <button className="close-btn" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="quick-actions">
          <button className="quick-action-btn call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call</span>
          </button>
          <button className="quick-action-btn video">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>Video</span>
          </button>
          <button className="quick-action-btn message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Message</span>
          </button>
          <button className="quick-action-btn email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Email</span>
          </button>
        </div>

        <div className="contact-tabs">
          <button 
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Call History
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="contact-content">
          {activeTab === 'details' && (
            <div className="details-tab">
              <div className="detail-section">
                <div className="detail-item">
                  <div className="detail-icon">📱</div>
                  <div className="detail-info">
                    <span className="detail-label">Mobile</span>
                    <span className="detail-value">{contact.phone}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">📧</div>
                  <div className="detail-info">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{contact.email}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">🏠</div>
                  <div className="detail-info">
                    <span className="detail-label">Address</span>
                    <span className="detail-value">123 Main Street, City, State 12345</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">🎵</div>
                  <div className="detail-info">
                    <span className="detail-label">Ringtone</span>
                    <span className="detail-value">Default</span>
                  </div>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="action-btn edit" onClick={() => onEdit(contact)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Contact
                </button>
                <button className="action-btn add-number">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Add Number
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-tab">
              <div className="call-history">
                {mockCallHistory.map((call, index) => (
                  <div key={index} className="call-item">
                    <div className={`call-icon ${call.type}`}>
                      {call.type === 'outgoing' && '📞'}
                      {call.type === 'incoming' && '📲'}
                      {call.type === 'missed' && '📵'}
                    </div>
                    <div className="call-info">
                      <span className="call-type">{call.type.charAt(0).toUpperCase() + call.type.slice(1)}</span>
                      <span className="call-datetime">{call.date} at {call.time}</span>
                    </div>
                    <span className="call-duration">{call.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="setting-section">
                <button className="setting-btn">
                  <span>🔔</span>
                  <span>Change Ringtone</span>
                  <span className="arrow">›</span>
                </button>
                <button className="setting-btn">
                  <span>🚫</span>
                  <span>Block Contact</span>
                  <span className="arrow">›</span>
                </button>
                <button className="setting-btn danger" onClick={() => onDelete(contact.id)}>
                  <span>🗑️</span>
                  <span>Delete Contact</span>
                  <span className="arrow">›</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {showAvatarSelector && (
          <div className="avatar-selector-overlay" onClick={() => setShowAvatarSelector(false)}>
            <div className="avatar-selector" onClick={(e) => e.stopPropagation()}>
              <h3 className="avatar-selector-title">Choose Avatar</h3>
              <div className="avatar-grid">
                {allAnimals.map((animal, index) => (
                  <button
                    key={index}
                    className={`avatar-option ${contact.avatarIndex === index ? 'selected' : ''}`}
                    onClick={() => handleAvatarChange(index)}
                    style={{ backgroundColor: getAvatarColor(contact.name) }}
                  >
                    {animal.default}
                  </button>
                ))}
              </div>
              <button 
                className="avatar-selector-close"
                onClick={() => setShowAvatarSelector(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ContactDetailsModal;