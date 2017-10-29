import React from 'react'
import head2 from '../static/head2.jpg';
const ChatItem = ({item, doctor}) => {
    const {message, role} = item;
   // console.log(doctor)
    if (role === 'doctor') {
        //console.log(window.doctor)
        return (
            <div style={{
                overflow: 'hidden'
            }}>
                <div className='item1'>
                    <img
                        src={`${process.env.PUBLIC_URL}/doctor${window.doctor}.jpg`}
                        className='head'
                        alt='hhh'/>
                    <span className='answer_message'>{message}</span>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{
                overflow: 'hidden'
            }}>
                <div className='item2'>
                    <span className='ask_message'>{message}</span>
                    <img src={head2} className='head' alt='hhh'/>

                </div>
            </div>
        )
    }
}

const ChatList = ({message_list}) => {
    return (
        <div className='container_chat'>
            {message_list.map((item, index) => <ChatItem key={index} item={item}/>)}
        </div>
    )
}

export default ChatList