import React from 'react'
import ChatBot from 'react-simple-chatbot';

export default function chatbot() {
  return (
    <div>

      <ChatBot
        botAvatar="https://static.wixstatic.com/media/618c8c_b185b378c6c24542b51061fcc4e9874f~mv2.png"
        userAvatar= "https://static.wixstatic.com/media/618c8c_5f176f88792f40609c74309e7f6f2eb2~mv2.png"
        enableMobileAutoFocus 
       
        headerTitle="Chat with us"
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
            component: (
              <div> <img src="https://scontent-lhr8-1.xx.fbcdn.net/v/t1.6435-9/72250327_871224639941733_7036015368472625152_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6MQUL9JrGU0AX98e088&tn=kP3xHg4BR0fN_o3g&_nc_ht=scontent-lhr8-1.xx&oh=00_AfDG61kjgSlgK8Qnz990QOyGCUTmIL8xA8nC8rXYgle_iQ&oe=63EE187B" style={{ borderRadius: '15px', width: '200px', height: "300px" }} className=" shadow" alt="..." /> </div>
            ),
            trigger: '5',

          },
          {
            id: '5',
            message: 'What brings you here ?',
            trigger: '6',
          },
          {
            id: '6',
            options: [
              { value: 1, label: 'Order Inquiries!', trigger: '7' },
              { value: 2, label: 'Give Feedback!', trigger: '8' },
              { value: 3, label: 'Track your orders!', trigger: '9' },
            ],
          },
          {
            id: '7',
            message: 'තාම ඒක හදලා නෑ බං',
            end: true,
          },
          {
            id: '8',
            component: (
               <a href='/feedback'>Click here!</a>
            ),
            end: true,
          },
          {
            id: '9',
            message: 'තාම ඒක හදලා නෑ බං',
            end: true,
          },


        ]}
      />




    </div>
  )
}
