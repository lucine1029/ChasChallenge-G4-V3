import OpenAI from 'openai';
import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { AuthContext } from '../../ResusableComponents/AuthContext';
import ChildAccordion from '../../ResusableComponents/ChildModal';
import { getUser } from '../../ResusableComponents/Requests/userRequest';
import ChatBubble from './ChatBubbles';

import '../../scss/style.scss';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
});

const ChatComponent: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [children, setChildren] = useState<any[]>([]);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);

  useEffect(() => {
    const fetchChild = async () => {
      if (authContext?.userId) {
        try {
          const data = await getUser(authContext.userId);
          if (data && data.children) {
            setChildren(data.children);
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

  const calculateAge = (birthdate: string) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputElement = (event.target as HTMLFormElement).querySelector<HTMLInputElement>(
      '#chat-input'
    );
    const input = inputElement?.value || '';
    if (input && clickedCardIndex !== null) {
      const selectedChild = children[clickedCardIndex];
      const childName = selectedChild.name;
      const childAge = calculateAge(selectedChild.birthdate);
      const allergies = selectedChild.allergies
        .map((allergy: { name: string }) => allergy.name)
        .join(', ');
      const combinedInput = `${input}. Child's name: ${childName}. Age: ${childAge}. Allergies: ${allergies}`;
      const displayMessage = {
        role: 'user',
        content: input,
      };
      setMessages((prevMessages) => [...prevMessages, displayMessage]);
      setUserInput(combinedInput);
      setLoading(true);
      if (inputElement) {
        inputElement.value = '';
      }
    }
  };

  useEffect(() => {
    async function fetchResponse() {
      if (userInput.trim() !== '' && clickedCardIndex !== null) {
        const selectedChild = children[clickedCardIndex];
        const childName = selectedChild.name;
        const childAge = calculateAge(selectedChild.birthdate);
        const allergies = selectedChild.allergies
          .map((allergy: { name: string }) => allergy.name)
          .join(', ');
        const systemMessage = `The selected child's name is ${childName}, they are ${childAge} years old, and have the following allergies: ${allergies}.`;
        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: userInput },
          ],
          model: 'gpt-3.5-turbo',
        });
        if (completion.choices[0].message.content !== null) {
          const aiResponse = completion.choices[0].message.content;
          const responseWithChildInfo = `${childName}, ${childAge} år: ${aiResponse}`;
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'ai', content: responseWithChildInfo },
          ]);
          setLoading(false);
        }
      }
    }
    if (loading) {
      fetchResponse();
    }
  }, [loading, userInput, children, clickedCardIndex]);

  const handleCardClick = (index: number) => {
    setClickedCardIndex(index);
    console.log('Selected child name:', children[index].name);
    console.log('Selected child id:', children[index].id);
  };

  const openModal = (child: any) => {
    setSelectedChild(child);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
        {children.length > 0 ? (
          <ul className='ul'>
            {children.map((child, index) => (
              <li
                key={index}
                className={`child-card ${index === clickedCardIndex ? 'clicked' : ''} `}
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onClick={() => handleCardClick(index)}
              >
                <p>{child.name}</p>
                <button className='accordion-button' onClick={() => openModal(child)}>
                  <IoIosArrowDown style={{ color: 'white' }} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No child found</p>
        )}
      </div>

      {showModal && selectedChild && (
        <ChildAccordion childData={selectedChild} closeModal={closeModal} />
      )}

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
