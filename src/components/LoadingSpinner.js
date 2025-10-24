import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h2 className="loading-title">Loading Contacts</h2>
        <p className="loading-subtitle">Just a moment while we fetch your contacts...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;