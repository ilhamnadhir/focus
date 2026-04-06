import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem('focusUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signInWithGoogle = async () => {
        // Mock Google sign-in
        const mockUser = {
            uid: 'demo-user-' + Date.now(),
            email: 'demo@focus.app',
            displayName: 'Demo User',
            photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
            totalFocusTime: 0,
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem('focusUser', JSON.stringify(mockUser));
        setUser(mockUser);
    };

    const signOut = async () => {
        localStorage.removeItem('focusUser');
        localStorage.removeItem('focusTasks');
        localStorage.removeItem('focusSessions');
        setUser(null);
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
