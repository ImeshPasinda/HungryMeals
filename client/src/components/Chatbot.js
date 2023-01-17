import React from 'react'
import ChatBot from 'react-simple-chatbot';

export default function chatbot() {
  return (
    <div>

      <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you! I am Binuka Putha',
            trigger: '4',
          },
          {
            id: '4',
            message: 'What do you want me to do?',
            end: true,
            
          },
         
         
        ]}
      />
      
      
      

    </div>
  )
}
