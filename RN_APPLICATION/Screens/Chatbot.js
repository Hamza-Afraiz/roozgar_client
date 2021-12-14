import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { BaseUrl } from "../Constants/baseUrl.js";
import logo from '../assets/rglogo.png';
export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [value,setValue] = useState(false);
  const [intent,setIntent]= useState("Default Fallback Intent");
  const intentValue=(value)=>{
      console.log("value issssss",value);
      setIntent(value);

  }
  const getResponse=(id)=>{
     
    
        const user={id,intent}
    fetch(`${BaseUrl.wifi}/api/v1/chatbot/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("span count is ",data.lifespanCount)
        
          if(data.lifespanCount == "1"){
              console.log("span count insideeeeeeeeeeeeeee ",data.lifespanCount)
              setValue(true)
              setIntent("Default Fallback Intent")
          }
            //   setIntent(data.intent);
            
           else{
            intentValue(data.intent)

           }
          
        
            
            console.log("response data is  ",data)
           // console.log("messages u=in fetch is ",messages)
            var user2={"_id": data.responseId, "createdAt": "2021-12-01T16:26:19.427Z", "text": data.fulfillmentText, "user": {"_id": 2}}
            setMessages(previousMessages => GiftedChat.append(previousMessages, user2))
        //      setMessages(prevItems => [...prevItems, {
        //              _id: id,
        // text: data.fulfillmentText,
        // createdAt: new Date(),
        // user: {
        //   _id: 2,
        //   name: 'React Native',
        //   avatar: 'https://placeimg.com/140/140/any',
        // },
        //             }]);
         
           // setData(data);
            //setOngoingData(data);
        
            //const value=AsyncStorage.getItem('jwt')
           //console.log("token value is ",value)
          // logoutUser(dispatch)
           

        
    })
    .catch((err) => {
       alert("incorrect details.Check your details again")
       console.log(err)
    
        
    });
   // console.log("messages outside fetch is  ",messages)
  }
  useEffect(() => {
      console.log("useEffect againnnnnnnnnnnnnnnnnnnnnnn ")
      
    setMessages([
      {
        _id: 1,
        text: 'Hello Dear Client! Wellcome To Online Help',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        //   avatar: 'https://placeimg.com/140/140/any',
        avatar:logo
        },
      },
      
    ])
  }, [])
  const onRecieve = (messages) => {
    console.log("intent is ",intent)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      getResponse(messages[0].text)

  }
 
  const onSend = useCallback((messages = []) => {
    //  console.log("intent is ",intent)
     // console.log("whole message is ",messages)
     // console.log("messages is",messages[0].text)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    
  }, [])
 
  return (
    <GiftedChat
      messages={messages}
      disableComposer = {false}
      onSend={messages => onRecieve(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}