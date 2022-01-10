import { getFirestore, collection, getDocs, addDoc,where,query, orderBy } from 'firebase/firestore/lite';
import { fire } from '../config/firebase';


  //dapetin semua room
  async function getRoom(user){
    const room = [];
    const q = query(collection(fire, 'room'));
    const data =  await getDocs(q);
    await data.forEach(async function  (doc) {
        // doc.data() is never undefined for query doc snapshots
        if(doc.data().user1==user || doc.data().user2==user){
          const temp = {
            id: doc.id,
            chats: doc.data().chats,
            fname: doc.data().fname,
            lname: doc.data().lname,
            user1: doc.data().user1,
            user2: doc.data().user2
          }
          room.push(temp);
        }
        
    });
    SortingData(room);
    return room;
  }
  function SortingData(data) {
    for (let i = 0; i < data.length-1; i++) {
      for (let j = i+1; j < data.length; j++) {
        if(data[i].chats[data[i].chats.length-1].sent_time<=data[j].chats[data[j].chats.length-1].sent_time){
          var dt = data[i];
          data[i] = data[j];
          data[j] = dt;
        }
      }
    }
    return data;
  }
  export default getRoom;