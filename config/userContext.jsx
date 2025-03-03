import { getDocs, query, where } from "firebase/firestore";
import { Children, createContext, useContext, useState } from "react";
import { UserRef } from "./firebase";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const UserContext = createContext(null);
export const useUserContext = ()=>{
    return useContext(UserContext)
}


export const  UserContextProvider = ({children})=>{
 const [currentUser,setCurrentUser]= useState({})
 const [loading,setLoading]= useState(false)
 const { getItem, setItem, removeItem } = useAsyncStorage("Fullname");

 const updateUser = (newData) => {
  setCurrentUser(prevState => ({ ...prevState, ...newData }));
};

 const fecthUserData = async (email)=>{
   try {
    const q= query(UserRef,where("email","==",email)) 
    const snapshot = await getDocs(q);
   const user= snapshot.docs[0].data()
   console.log(user)
   setCurrentUser(user)
   await setItem(user.FullName)
   } catch (error) {
    console.log(error)
   }

 }

 return <UserContext.Provider value={{currentUser,setCurrentUser,fecthUserData,loading,setLoading,updateUser}}>{children}</UserContext.Provider>
}