import { getFirestore } from "redux-firestore";
import app from "../../config/firebase";

export const addChat = () => {
    const firestore = getFirestore(app);
    const collection = collection
    console.log(firestore);
    firestore.collection('chat').add({message: "berhasil insert"})
    .then(() => {
        console.log("add chat berhasil");
    })
    .catch(err => {
        console.log(err);
    })
}