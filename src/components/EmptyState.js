import React from 'react';
import './EmptyState.css';

const EmptyState = ({ title, subtitle, onAddContact, showAddButton = true }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-subtitle">{subtitle}</p>
      {showAddButton && (
        <button 
          className="empty-state-btn"
          onClick={onAddContact}
        >
          <span className="add-icon">+</span>
          Add Your First Contact
        </button>
      )}
    </div>
  );
};

export default EmptyState;