//
// import {over} from 'stompjs';
// import SockJS from 'sockjs-client'
//
// export function websocket(){
//
//     let stompClient = null;
//     const sendAcc = JSON.parse(localStorage.getItem("sendAcc"))
//     const connect=()=>{
//         let Sock = new SockJS('http://localhost:8080/ws')
//         stompClient = over(Sock)
//         stompClient.connect({},onConnected, onError);
//     }
//     const onConnected = () => {
//         stompClient.subscribe('/user/'+sendAcc.name+sendAcc.id +'/private', onPrivateMessage);
//     }
//     const onPrivateMessage = (payload)=>{
//         console.log(payload);
//         let payloadData = JSON.parse(payload.body);
//         if (payloadData.sendAcc.id !== sendAcc.id){
//             setChats(chats =>[...chats, payloadData]);
//         }
//     }
//     const onError = (err) => {
//         console.log(err);
//     }
//
//     const handleMessage=(message)=>{
//         setData({...data,"message":message})
//     }
//
//     const handledSend=()=>{
//         if (stompClient) {
//             var chatMessage = {
//                 sendAcc: {
//                     id: sendAcc.id,
//                     name: sendAcc.name
//                 },
//                 receiverAcc:{
//                     id:tab.id,
//                     name: tab.name
//                 },
//                 message: data.message
//             };
//             if(data.sendAcc.id !== tab){
//                 chats.push(chatMessage);
//                 setChats(chats =>[...chats]);
//             }
//             console.log(chatMessage);
//             stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//             setData({...data,"message": ""});
//         }
//     }
// }