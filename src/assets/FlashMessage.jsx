// FlashMessage.js
import React, { useEffect } from 'react';

const FlashMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Message disappears after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`flash-message ${type}`}>
      {message}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default FlashMessage;
