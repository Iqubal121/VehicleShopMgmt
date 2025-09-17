// SignOut.jsx
import React from 'react';
import { useState } from 'react';


const SignOut = () => {
    const[message, setMessage] = useState('');
    const handleSignOut = async () => {
        const token = localStorage.getItem('access_token');
        
        try {
            const response = await fetch('http://localhost:5000/api/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {                
                
                 setMessage('Sign-out successful!');
                window.location.href = '/login';
            } else {
               setMessage('Signed out error!!');
            }
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <>
            <button onClick={handleSignOut}>Sign Out</button>
            {message && <p>{message}</p>}
        </>

    );
};

export default SignOut;