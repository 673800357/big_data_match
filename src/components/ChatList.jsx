import React from 'react'
const ChatItem = ({item}) =>{
    const {message,role} = item;
    if (role === 'doctor'){
        return (
        <div style={{overflow:'hidden'}}>
        <div className='item1'>
                <img src={require('../static/head1.jpg')} className='head'  alt='hhh'/>
                <span className='answer_message'>{message}</span>
            </div>
            </div>
            )
    }
    else {
        return (
        <div style={{overflow:'hidden'}}> 
        <div className='item2'>
            <span className='ask_message'>{message}</span>
            <img src={require('../static/head2.jpg')} className='head' alt='hhh'/>
            
            </div>
            </div>)
    }
}



const ChatList = ({message_list}) => {
    return(
        <div className='container_chat'>
            {message_list.map((item,index) => <ChatItem key={index} item = {item}/>)}
        </div>
    )
}

export default ChatList