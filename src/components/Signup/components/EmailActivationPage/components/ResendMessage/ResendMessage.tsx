import React from 'react';
import './ResendMessage.scss';

interface ResendMessageProps {
  content: string
}

const ResendMessage = ({ content }: ResendMessageProps) => (
  <div className="info">
    {content}
  </div>
);

export default ResendMessage;
