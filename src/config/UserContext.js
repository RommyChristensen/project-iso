import * as React from 'react';

export const UserContext = React.createContext({
    userActive: {},
    setUser: () => {},
    room:{},
    setRoom:() => {},
});