import { useEffect } from 'react';


export default function useAuth() {
useEffect(() => {
const refresh = setInterval(() => {
const token = localStorage.getItem('token');
if (token) {
localStorage.setItem('token', 'refreshed-token');
}
}, 30000);
return () => clearInterval(refresh);
}, []);
}