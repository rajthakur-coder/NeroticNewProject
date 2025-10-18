// // src/hooks/useTokenExpiryCheck.ts (TEMPORARY FIX FOR BACKEND BUG)

// import { useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../features/auth/authSlice'; 

// // Define a placeholder for RootState 
// type RootState = {
//     auth: {
//       isAuthenticated: boolean;
//       expiresAt: string | null; // This now holds "2m"
//     }
// }; 

// // Helper function to parse duration string (e.g., "2m", "1h") into milliseconds
// const parseDurationToMs = (duration: string | null): number | null => {
//     if (!duration) return null;
    
//     // Regex to match "1m", "2h", "5s", etc.
//     const matches = duration.match(/^(\d+)([smhd])$/);
//     if (!matches) return null; // Not a valid duration format

//     const value = parseInt(matches[1]);
//     const unit = matches[2];
    
//     switch (unit) {
//         case 's': return value * 1000;
//         case 'm': return value * 60 * 1000; // 2m -> 120000ms
//         case 'h': return value * 60 * 60 * 1000;
//         case 'd': return value * 24 * 60 * 60 * 1000;
//         default: return null;
//     }
// };

// export const useTokenExpiryCheck = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     
//     const expiresAt = useSelector((state: RootState) => state.auth.expiresAt); 
//     const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

//     const performLogout = useCallback(() => {
//         console.warn("Session Revoked/Expired. Redirecting to login.");
//         dispatch(logout());
//         navigate('/login', { replace: true }); 
//     }, [dispatch, navigate]);


//     useEffect(() => {
//         if (!isAuthenticated || !expiresAt) {
//             if (isAuthenticated && !expiresAt) {
//                 console.error("FATAL ERROR: Authenticated but missing expiresAt. Forcing logout.");
//                 performLogout(); 
//             }
//             return;
//         }

//         let timeUntilExpiry: number;

//         // --- 2. Intelligent Date Parsing / Duration Calculation ---
        
//         // Try parsing as a Date (Standard API response)
//         const parsedDate = new Date(expiresAt);
//         const isDateValid = !isNaN(parsedDate.getTime());

//         if (isDateValid) {
//             // Case A: Backend sent a valid date string (e.g., "2025-10-14T15:26:00+05:30")
//             const now = Date.now();
//             timeUntilExpiry = parsedDate.getTime() - now; 
            
//         } else {
//             // Case B: Backend sent an invalid string (e.g., "2m" or "1h")
//             const durationMs = parseDurationToMs(expiresAt);
            
//             if (durationMs === null) {
//                 // If it's neither a valid date nor a valid duration (e.g., "2m"), force logout
//                 console.error("TOKEN EXPIRY ERROR: Date string is invalid/unparseable:", expiresAt);
//                 performLogout(); 
//                 return;
//             }
            
//             // Calculate time until expiry based on the received duration.
//             // This is only safe immediately after login.
//             timeUntilExpiry = durationMs;
//             console.warn(`FALLBACK MODE: Using received duration (${expiresAt}) for expiry timer.`);
//         }
        
//         // --- 3. Final Check and Timer Setup ---

//         // Check if token is ALREADY expired (Handles case A only)
//         if (isDateValid && timeUntilExpiry <= 0) {
//             console.warn(`Token already expired. Logging out immediately.`);
//             performLogout(); 
//             return;
//         }
        
//         // We must have a positive timeUntilExpiry here
//         if (timeUntilExpiry <= 0) {
//             console.error("Calculated time until expiry is zero or negative. Forcing logout.");
//             performLogout(); 
//             return;
//         }

//         // 4. Set a timer for future automatic logout
//         const expirySeconds = Math.round(timeUntilExpiry / 1000);
//         console.info(`✅ TIMER SET: Token will expire in ${expirySeconds} seconds.`);
//         
//         const timer = setTimeout(() => {
//             console.log("Token timer reached zero. Automatic logout.");
//             performLogout();
//         }, timeUntilExpiry);

//         // Cleanup
//         return () => {
//             clearTimeout(timer);
//         };
//     }, [isAuthenticated, expiresAt, performLogout]);
// };
























import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice'; 
// 🚨 NEW: Assuming you will import the correct RootState type here for proper type checking
import { type RootState } from '../components/app/store'; 

// Helper function to parse duration string (e.g., "2m", "1h") into milliseconds
const parseDurationToMs = (duration: string | null): number | null => {
    if (!duration) return null;
    
    // Regex to match "1m", "2h", "5s", etc.
    const matches = duration.match(/^(\d+)([smhd])$/);
    if (!matches) return null; // Not a valid duration format

    const value = parseInt(matches[1]);
    const unit = matches[2];
    
    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60 * 1000; // 2m -> 120000ms
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        default: return null;
    }
};

export const useTokenExpiryCheck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Using RootState from your application store for accurate typing
    const expiresAt = useSelector((state: RootState) => state.auth.expiresAt); 
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const performLogout = useCallback(() => {
        console.warn("Session Revoked/Expired. Redirecting to login.");
        dispatch(logout());
        // Redirecting using useNavigate with replace: true is best practice
        navigate('/login', { replace: true }); 
    }, [dispatch, navigate]);


    useEffect(() => {
        if (!isAuthenticated || !expiresAt) {
            if (isAuthenticated && !expiresAt) {
                console.error("FATAL ERROR: Authenticated but missing expiresAt. Forcing logout.");
                performLogout(); 
            }
            return;
        }

        let timeUntilExpiry: number;

        // --- 2. Intelligent Date Parsing / Duration Calculation ---
        
        // Try parsing as a Date (Standard API response)
        const parsedDate = new Date(expiresAt);
        const isDateValid = !isNaN(parsedDate.getTime());

        if (isDateValid) {
            // Case A: Backend sent a valid date string (e.g., "2025-10-14T15:26:00+05:30")
            const now = Date.now();
            timeUntilExpiry = parsedDate.getTime() - now; 
            
        } else {
            // Case B: Backend sent an invalid string (e.g., "2m" or "1h")
            const durationMs = parseDurationToMs(expiresAt);
            
            if (durationMs === null) {
                // If it's neither a valid date nor a valid duration (e.g., "2m"), force logout
                console.error("TOKEN EXPIRY ERROR: Date string is invalid/unparseable:", expiresAt);
                performLogout(); 
                return;
            }
            
            // Calculate time until expiry based on the received duration.
            timeUntilExpiry = durationMs;
            console.warn(`FALLBACK MODE: Using received duration (${expiresAt}) for expiry timer.`);
        }
        
        // --- 3. Final Check and Timer Setup ---

        // Check if token is ALREADY expired (Handles case A only)
        if (isDateValid && timeUntilExpiry <= 0) {
            console.warn(`Token already expired. Logging out immediately.`);
            performLogout(); 
            return;
        }
        
        if (timeUntilExpiry <= 0) {
            console.error("Calculated time until expiry is zero or negative. Forcing logout.");
            performLogout(); 
            return;
        }

        // 4. Set a timer for future automatic logout
        const expirySeconds = Math.round(timeUntilExpiry / 1000);
        console.info(`✅ TIMER SET: Token will expire in ${expirySeconds} seconds.`);
        
        const timer = setTimeout(() => {
            console.log("Token timer reached zero. Automatic logout.");
            performLogout();
        }, timeUntilExpiry);

        // Cleanup
        return () => {
            clearTimeout(timer);
        };
    }, [isAuthenticated, expiresAt, performLogout]);
};