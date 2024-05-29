import { useState, useEffect, useContext } from 'react';
import OpenAI from 'openai';
import ChatBubble from './ChatBubbles';
import React from 'react';
import { AuthContext } from '../../ResusableComponents/AuthContext';
import { getUser } from '../../ResusableComponents/Requests/userRequest';

import '../../scss/style.scss';

// Authentication with API key, create your own .env file to use.
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true, // Only used during dev, accept the risks of client-based requests.
});

const ChatComponent: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [children, setChildren] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the user's children data
    const fetchChild = async () => {
      if (authContext?.userId) {
        try {
          const data = await getUser(authContext.userId);
          console.log('ChatComponent-getUser all kids:', data.children);
          console.log('ChatComponent-getUser specific kid:', data.children[0].name);

          if (data && data.children) {
            setChildren(data.children);
            console.log('Children:', data.children);
          } else {
            console.log('No child found in the response');
          }
        } catch (error) {
          console.error('Error fetching child data', error);
        }
      }
    };

    fetchChild();
  }, [authContext]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputElement = (event.target as HTMLFormElement).querySelector<HTMLInputElement>(
      '#chat-input'
    );
    const input = inputElement?.value || '';

    if (input) {
      setUserInput(input);
      console.log(`User Input: ${input}`);

      const newMessage = {
        role: 'user',
        content: input,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setLoading(true);

      if (inputElement) {
        inputElement.value = '';
      }
    }
  };

  useEffect(() => {
    async function fetchResponse() {
      if (userInput.trim() !== '') {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: '' },
            { role: 'user', content: userInput },
          ],
          model: 'gpt-3.5-turbo',
        });
        console.log(completion);

        if (completion.choices[0].message.content !== null) {
          const aiResponse = completion.choices[0].message.content;
          setMessages((prevMessages) => [...prevMessages, { role: 'ai', content: aiResponse }]);
          setLoading(false);
        }
      }
    }

    if (loading) {
      fetchResponse();
    }
  }, [loading, userInput]);

  return (
    <main>
      <div className='ai-chat-container'>
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            role={message.role}
            content={message.content}
            loading={loading && message.role === 'ai'}
          />
        ))}
      </div>

      <div className='children-container'>
        {/* <div > */}
        {/* <h2>Barn:</h2> */}
        {children.length > 0 ? (
          <ul className='ul'>
            {children.map((child, index) => (
              <li key={index} className='child-card' style={{ listStyle: 'none' }}>
                <p>{child.name}</p>
                {/* Uncomment and use these lines if you want to display more information about the child */}
                {/* <p>Smeknamn: {child.nickName}</p>
          <p>Kön: {child.gender}</p>
          <p>Födelsedatum: {new Date(child.birthdate).toLocaleDateString()}</p>
          <p className="allergies">
            Allergier: {child.allergies.map((allergy: { name: string }, allergyIndex: number) => (
              <span key={allergyIndex}>
                {allergy.name}{allergyIndex < child.allergies.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No child found</p>
        )}
      </div>

      <form className='user-input-container' onSubmit={handleSubmit} action=''>
        <input type='text' id='chat-input' placeholder='Ställ en fråga..' />
        <button type='submit' id='chat-submit-btn'>
          Skicka
        </button>
      </form>
    </main>
  );
};

export default ChatComponent;
