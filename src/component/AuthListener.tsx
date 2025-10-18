// // src/components/AuthListener.tsx (Final Updated)

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/auth/authSlice'; 
// import { useTokenExpiryCheck } from '../component/useTokenExpiryCheck'; 
// import { type RootState } from '../components/app/store'; // Adjust path as needed

// // This listener component must be rendered INSIDE the <Router> component in App.tsx.

// const AuthListener = () => {
//   const dispatch = useDispatch();
//   
//   // Check authentication status to decide whether to run listeners
//   const isAuthenticated = useSelector(
//       (state: RootState) => state.auth.isAuthenticated
//   );
  
//   // 1. 🚀 TOKEN EXPIRY CHECK: This must run inside the Router context to use useNavigate.
//   useTokenExpiryCheck();


//   // 2. 🌐 STORAGE EVENT LISTENER (For multi-tab logout sync)
//   useEffect(() => {
//     // Only set up the storage listener if the user is authenticated in this tab
//     if (!isAuthenticated) return;

//     const handleStorageChange = (event: StorageEvent) => {
//         // If 'logout' key is set in storage by another tab
//         if (event.key === 'logout' && event.newValue) {
//             console.log("Storage event detected: Logging out this tab.");
            
//             // 1. Immediately dispatch logout to clear Redux/Cookies
//             dispatch(logout()); 
            
//             // 2. Clean up the storage key
//             localStorage.removeItem('logout');
            
//             // 3. Redirect to login
//             window.location.href = '/login'; 
//         }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [dispatch, isAuthenticated]); 


//   return null; 
// };

// export default AuthListener;



















import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 🚨 NEW: Import useNavigate
import { logout } from '../features/auth/authSlice'; 
import { useTokenExpiryCheck } from '../component/useTokenExpiryCheck'; 
import { type RootState } from '../components/app/store'; // Adjust path as needed

// This listener component must be rendered INSIDE the <Router> component in App.tsx.

const AuthListener = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 🚨 NEW: Initialize useNavigate
    
    // Check authentication status to decide whether to run listeners
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    
    // 1. 🚀 TOKEN EXPIRY CHECK: This must run inside the Router context to use useNavigate.
    useTokenExpiryCheck();


    // 2. 🌐 STORAGE EVENT LISTENER (For multi-tab logout sync)
    useEffect(() => {
        // Only set up the storage listener if the user is authenticated in this tab
        if (!isAuthenticated) return;

        const handleStorageChange = (event: StorageEvent) => {
            // If 'logout' key is set in storage by another tab
            if (event.key === 'logout' && event.newValue) {
                console.log("Storage event detected: Logging out this tab.");
                
                // 1. Immediately dispatch logout to clear Redux/Cookies
                dispatch(logout()); 
                
                // 2. Clean up the storage key
                localStorage.removeItem('logout');
                
                // 3. Redirect to login using navigate
                navigate('/login', { replace: true }); // 🚨 UPDATED: Using navigate
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch, isAuthenticated, navigate]); // navigate added to dependency array


    return null; 
};

export default AuthListener;