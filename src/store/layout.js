function GetActive() {
    //yang dibutuhkan username dan harus unique
    useEffect(async() => {
        const q = query(collection(fire, 'user'), where('username',"==", 'denny'));
        const data =  await getDocs(q);
        data.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUserActive(doc.data());
        });
    },[])
  }
  export default GetActive;