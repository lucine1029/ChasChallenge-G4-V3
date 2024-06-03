import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { PulseLoader } from 'react-spinners';

import '../../scss/style.scss';

interface ChatBubbleProps {
  role: string;
  content: string;
  loading?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content, loading }) => {
  return (
    <div className={`chat-bubble ${role}`}>
      {loading ? (
        <div className='loader-container'>
          <PulseLoader color={'#1A1A1A'} loading={true} size={10} />
        </div>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      )}
    </div>
  );
};

export default ChatBubble;