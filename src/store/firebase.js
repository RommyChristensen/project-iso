import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

export const store = (collection,data) => {
    const db = collection(collection, data);
    addDoc(db,chat);
}
export default store;