import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const MobileMenu = ({ isOpen, onClose, children }) => {
  const isMobile = useMediaQuery('(max-width: 575px)');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className={`mobile-menu-overlay ${isAnimating ? 'active' : ''}`}
          onClick={onClose}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
        />
      )}

      {/* Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>FlixRadar</h2>
          <button 
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <nav className="mobile-menu-nav">
          {children}
        </nav>
      </div>
    </>
  );
};

export const MobileMenuTrigger = ({ onClick, isOpen }) => {
  const isMobile = useMediaQuery('(max-width: 575px)');
  
  if (!isMobile) {
    return null;
  }

  return (
    <button 
      className={`mobile-menu-trigger ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
    </button>
  );
};

export const MobileMenuItem = ({ href, onClick, children, isActive }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a 
      href={href}
      className={`mobile-menu-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default MobileMenu;