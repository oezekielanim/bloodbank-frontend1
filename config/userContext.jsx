import { getDocs, query, where } from "firebase/firestore";
import { Children, createContext, useContext, useState } from "react";
import { UserRef } from "./firebase";

const UserContext = createContext(null);
export const useUserContext = ()=>{
    return useContext(UserContext)
}


export const  UserContextProvider = ({children})=>{
 const [currentUser,setCurrentUser]= useState({})
 const [loading,setLoading]= useState(false)

 const fecthUserData = async (email)=>{
   try {
    const q= query(UserRef,where("email","==",email)) 
    const snapshot = await getDocs(q);
   const user= snapshot.docs[0].data()
   console.log(user)
   setCurrentUser(user)
   } catch (error) {
    console.log(error)
   }

 }

 return <UserContext.Provider value={{currentUser,setCurrentUser,fecthUserData,loading,setLoading}}>{children}</UserContext.Provider>
}