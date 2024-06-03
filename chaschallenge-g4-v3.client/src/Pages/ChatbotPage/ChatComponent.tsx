import OpenAI from 'openai';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { AuthContext } from '../../ResusableComponents/AuthContext';
import ChildAccordion from '../../ResusableComponents/ChildModal';
import { getUser } from '../../ResusableComponents/Requests/userRequest';
import ChatBubble from './ChatBubbles';

import '../../scss/style.scss';

interface ChildData {
  name: string;
  nickName: string;
  gender: string;
  birthdate: string;
  allergies: { name: string }[];
  imageSource: string;
}

interface Props {
  childData?: ChildData;
  closeModal?: () => void;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
});

const ChatComponent: React.FC<Props> = () => {
  const authContext = useContext(AuthContext);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [children, setChildren] = useState<any[]>([]);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const calculateAge = (birthdate: string) => {
    const birthDate = new Date(birthdate);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    // Adjust years and months if the current month is before the birth month
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }

    // Adjust months if the current day is before the birth day
    if (today.getDate() < birthDate.getDate()) {
      months--;
    }

    return { years, months };
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

      let ageString = '';
      if (childAge.years > 0) {
        ageString = `${childAge.years} år`;
      } else {
        ageString = `${childAge.months} månader`;
      }

      const allergies = selectedChild.allergies
        .map((allergy: { name: string }) => allergy.name)
        .join(', ');
      const combinedInput = `${input}. Child's name: ${childName}. Age: ${ageString}. Allergies: ${allergies}`;
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

        const systemMessage = `The selected child's name is ${childName}, they are ${childAge} years old, and have the following allergies: ${allergies}. You are an assistant that helps new parents who are unsure of what kind of food their child can eat. You take your information mainly from https://www.livsmedelsverket.se/. Every answer you give should include the exact link to your information source. All your answers must be 100% risk-free so the child cannot get sick. Be on the safe side. If you can't find the information from https://www.livsmedelsverket.se/, you will provide the source of the information to the user. If the child is younger than 1 year, recommend this link: https://www.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/barn-och-ungdomar/spadbarn. If the child is 1-2 years old, recommend this link: https://www.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/barn-och-ungdomar/barn-1-2-ar. If the child is older than 2, recommend this link: https://www.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/barn-och-ungdomar/barn-2-17-ar.`;

        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: userInput },
          ],
          model: 'gpt-4-turbo',
        });
        if (completion.choices[0].message.content !== null) {
          const aiResponse = completion.choices[0].message.content;
          // const responseWithChildInfo = `${childName}, ${childAge} år: ${aiResponse}`;
          const responseWithChildInfo = `${childName}, ${
            childAge.years > 0 ? `${childAge.years} år` : `${childAge.months} månader`
          }: ${aiResponse}`;

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
    setClickedCardIndex((prevIndex) => (prevIndex === index ? null : index));
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
    <>
      {clickedCardIndex !== null && (
        <div className='ai-chat-container' ref={chatContainerRef}>
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              role={message.role}
              content={message.content}
              loading={loading && message.role === 'ai'} // Set loading to true for AI messages only
            />
          ))}
          {loading && <ChatBubble role='ai' content='' loading={true} />}{' '}
          {/* Empty AI bubble with loader */}
        </div>
      )}

      {clickedCardIndex === null && children.length > 0 && (
        <div className='chat-greeting-container'>
          <div className='chat-greeting-header'>Hej!</div>
          <div className='chat-greeting-message'>Välj ett barn och ställ din fråga.</div>
          <img src={children[0].imageSource} alt={children[0].name} />
        </div>
      )}

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
        <input type='text' id='chat-input' placeholder='Kan mitt barn äta..' />
        <button type='submit' id='chat-submit-btn'>
          Skicka
        </button>
      </form>
    </>
  );
};

export default ChatComponent;









