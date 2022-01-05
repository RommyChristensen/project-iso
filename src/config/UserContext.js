import * as React from 'react';

export const UserContext = React.createContext({
    activeDoc:{}, // aku pake doc soal e isa dapet id e ,
    setDoc :()=>{},
    userActive: {},
    setUser: () => {},
    room:{},
    setRoom:() => {},
});