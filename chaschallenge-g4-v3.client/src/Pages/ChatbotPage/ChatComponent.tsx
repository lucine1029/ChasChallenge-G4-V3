

import { useState, useEffect, useContext } from 'react';
import OpenAI from 'openai';
import ChatBubble from './ChatBubbles';
import React from 'react';
import { AuthContext } from '../../ResusableComponents/AuthContext';
import { getUsersChildren } from '../../ResusableComponents/Requests/childRequest';

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
  const [child, setChild] = useState<any>(null);

  useEffect(() => {
    // Fetch the user's children data
    const fetchChild = async () => {
      if (authContext?.userId) {
        try {
          const data = await getUsersChildren(authContext.userId);
          console.log('Fetched data:', data);

          if (data) {
            setChild(data);
            console.log('Child:', data);
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
  }, [loading, openai, userInput]);

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

      <form className='user-input-container' onSubmit={handleSubmit} action=''>
        <input type='text' id='chat-input' placeholder='Ställ en fråga..' />
        <button type='submit' id='chat-submit-btn'>
          Skicka
        </button>
      </form>

      <div className='children-container'>
        <h2>Barn:</h2>
        {child ? (
          <ul>
            <li>Namn: {child.name}</li>
            <li>Smeknamn: {child.nickName}</li>
            <li>Kön: {child.gender}</li>
            <li>Födelsedatum: {child.birthdate}</li>
            <li>Allergier: {child.allergies.map((allergy: { name: string }, index: number) => (
              <span key={index}>{allergy.name}{index < child.allergies.length - 1 ? ', ' : ''}</span>
            ))}</li>
          </ul>
        ) : (
          <p>No child found</p>
        )}
      </div>
    </main>
  );
};

export default ChatComponent;
