import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api'; // Importa  api;

interface SignInCredentials {
    email: string;
    password: string;
}
interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>; // Toda vez que transformamos o metodo em async ele retorna uma Promise, por isso a tipagem vira uma promise<void>
    signOut(): void;

}
interface AuthState {
    token: string;
    user: object;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:token');

        if( token && user) {
            return { token, user: JSON.parse(user)} // retorn o token e o user tornando ele em objeto novamente.
        }

        return {} as AuthState; // se não atender as condições acima, retornaremos o objeto vazio.
    });
    const signIn = useCallback( async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password,
        });

        
        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user)); // Como o user é um objeto temos que converter em string.

        setData({token, user}); // seta as informações no estado.
    },[]);
    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:token');
        setData({} as AuthState);
    }, []);
    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}