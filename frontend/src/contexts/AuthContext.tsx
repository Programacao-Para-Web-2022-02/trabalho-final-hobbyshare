import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";
import React from 'react';
import axios from "axios";

type User = {
    id: string;
    name: string | null;
    avatar: string | null;
}
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider (props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            const { displayName, photoURL, uid } = user;
            if (!displayName) {
              // Redirecionar pra página de escolher nome
            }
            if (!photoURL) {
              // Colocar profile-picture.png
            }
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
        })
    
        return () => {
          unsubscribe();
        }
      }, [])
    
      async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const result = await auth.signInWithPopup(provider);
    
        
        if (result.user) {
          const { displayName, photoURL, uid } = result.user;
          if (!displayName) {
            // Redirecionar pra página de escolher nome
          }
          if (!photoURL) {
            // Colocar profile-picture.png
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      }
    

    return (
        <AuthContext.Provider value = {{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}