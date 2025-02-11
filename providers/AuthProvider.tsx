
import { onAuthStateChanged, User } from 'firebase/auth';
import React, {  createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

type AuthProps = {
    loading : boolean;
    user : User |null;
}

const AuthUserContext = createContext<AuthProps>({
  loading : true, 
  user : null
})

const AuthProvider = ({children} : PropsWithChildren) => {
  const [loading, setLoading] = useState<boolean>(true)
  const[user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    })
    return () => unsubscribe();
  }, []);
  return (
    <AuthUserContext.Provider value={{loading, user}}>
      {children}
    </AuthUserContext.Provider>
  )
}
  
export const useUserContext = () => useContext(AuthUserContext)

export default AuthProvider
