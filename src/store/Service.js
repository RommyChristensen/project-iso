import { getFirestore, collection, getDocs, addDoc,where,query, orderBy } from 'firebase/firestore/lite';
import { fire } from '../config/firebase';


  //dapetin semua room
  async function getRoom(user){
    const room = [];
    const q = query(collection(fire, 'room'),orderBy('chats.sent_time','desc'));
    const data =  await getDocs(q);
    await data.forEach(async function  (doc) {
        // doc.data() is never undefined for query doc snapshots
        if(doc.data().user1==user || doc.data().user2==user){
           room.push(doc.data());
        }
        (await room).forEach(async function (item) {
            var user_id;
            // doc.data() is never undefined for query doc snapshots
            if(item.user1==user){
              user_id = item.user2;
            }
            else if(item.user2==user){
              user_id = item.user1;
            }
            const data_user = await getDocs(query(collection(fire, 'user'),where('username','==',user_id)));
            (await data_user).forEach(function(item2) {
              console.log(item2.data());
              item["fname"]=item2.data().firstname;
              item["lname"]=item2.data().lastname;
            });
        });
    });
    
    return room;
  }
  export default getRoom;