import React from 'react';
import '../../scss/style.scss';

//Här skapas ett interface för ChatBubbleProps som tar in en roll, innehåll och laddning som props.
interface ChatBubbleProps {
  role: string;
  content: string;
  loading: boolean;
}

//Gör en chatbubbla som tar in en roll och innehåll som props och renderar en div med rätt klass och innehåll beroende på roll.
const Chatbubble: React.FC<ChatBubbleProps> = ({ role, content, loading }) => {
  return (
    // Om rollen är user, rendera en chatbubbla med klassen user och innehållet från props.
    <div className={`chat-bubble ${role} ${role === 'ai' && loading && 'loading'}`}>
      <h4>{role}</h4>
      <p>{content}</p>
    </div>
  );
};

export default Chatbubble;
