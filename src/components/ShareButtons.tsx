import React from 'react';
import { faWhatsapp, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareButtons: React.FC = () => {
  const shareUrl = 'https://www.example.com/sorteio';

  return (
    <div className="flex gap-4">
      <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6 text-green-500" />
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} className="h-6 w-6 text-blue-600" />
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} className="h-6 w-6 text-blue-400" />
      </a>
    </div>
  );
};

export default ShareButtons;
