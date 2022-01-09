import * as React from 'react';

export const UserContext = React.createContext({
    activeDoc:{}, // aku pake doc soal e isa dapet id e ,
    setDoc :()=>{}, // doc login
    userActive: {}, // row dari firebase untuk state setelah login
    setUser: () => {}, // set UserActive
    room:{}, // semua room yang dimiliki user yang logi
    setRoom:() => {},
    searchResultRoom:{}, //  room hasil search chat
    setSearchResultRoom:()=>{},
    activeRoom: {}, // room chat yang sedang ditampilkan
    setActiveRoom: {}
});