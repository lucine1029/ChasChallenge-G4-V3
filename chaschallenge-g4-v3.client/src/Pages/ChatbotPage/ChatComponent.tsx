import { useState, useEffect } from 'react';
import OpenAI from 'openai';
import ChatBubble from './ChatBubbles';
import React from 'react';

import '../../scss/style.scss';

// Autenisering med api-nyckel, gör egen .env fil för att kunna använda.
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,

    //Nedanstående används ENDAST under dev, innebär att vi godkänner riskerna med client-baserade request.
    dangerouslyAllowBrowser: true,
  });

// ChatComponent renderar en chatbubbla och en input för att skicka meddelanden.
const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [userInput, setUserInput] = useState<string>('');

    //Försök till att skapa en loading state för att visa att AI:n laddar.
    const [loading, setLoading] = useState<boolean>(false);

    //Hanterar formuläret och skickar användarens input till AI:n.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputElement = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('#chat-input');
        const input = inputElement?.value || '';

        //Om användaren skrivit något, sätt användarens input i state och lägg till det i messages.
        if (input) {
            setUserInput(input);
            console.log(`User Input: ${input}`);

            const newMessage = {
                role: 'user',
                content: input
            };

            setMessages(prevMessages => [...prevMessages, newMessage]);
            setLoading(true);

            //Rensa inputfältet.
            if (inputElement) {
                inputElement.value = '';
            }
        }
    };

    //Använder useEffect för att skicka användarens input till AI:n och få ett svar.
    useEffect(() => {
        async function fetchResponse() {
            if (userInput.trim() !== '') {
                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: 'system', content: "" },
                        { role: "user", content: userInput },
                    ],
                    model: 'gpt-3.5-turbo',
                });
                console.log(completion);

                //Om AI:n svarar med något, lägg till svaret i messages och sätt loading till false.
                if (completion.choices[0].message.content !== null) {
                    const aiResponse = completion.choices[0].message.content;
                        setMessages(prevMessages => [...prevMessages, { role: 'ai', content: aiResponse }]);
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
            {/* //Renderar chatbubblor för varje meddelande i messages. */}
            <div className='ai-chat-container'>
                {messages.map((message, index) => (
                    //skickar in key, role och content som props till ChatBubble.
                    <ChatBubble key={index} role={message.role} content={message.content} loading={loading && message.role === 'ai'} />
                ))}
            </div>

            <form onSubmit={handleSubmit} action=''>
                <input type='text' id='chat-input' placeholder='Ställ en fråga..' />
                <button type='submit' id='chat-submit-btn'>Skicka</button>
            </form>
        </main>
    );
}

export default ChatComponent;