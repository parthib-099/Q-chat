import { createContext, useEffect, useState  } from "react";
import axios from "axios";
import toast, { ToastBar } from "react-hot-toast";  
import { io } from "socket.io-client";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [OnlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
//check if user is authenticated and if so, set the user data and connect the socket
  const checkAuth = async () => {
    try {
        const {data} =await axios.get('/api/auth/check');
            if(data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
               
            }
        
    } catch (error) {
        toast.error(error.message);
        
    }
  }
//login user to handle user authentication and socket connection
const login=async (state,credentials) => {
    try {
        const {data} = await axios.post(`/api/auth/${state}`, credentials);
        if(data.success) {
            
            setAuthUser(data.userData);
            connectSocket(data.user);
            axios.defaults.headers.common["token"] = data.token;
            setToken("token",data.token);
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
       
        
    } catch (error) {
        toast.error(error.message)
        
    }
}
//Logout user to handle user logout and disconnect the socket
const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully");
    socket.disconnect();
}

//update profile function to handle user profile updates
const updateProfile = async (body) => {
    try {
        const {data} = await axios.put('/api/auth/update-profile', body);
        if(data.success) {
            setAuthUser(data.user);
            toast.success("Profile updated successfully");
        } 
    } catch (error) {
        toast.error(error.message);
    }
};






  //connect to socket function to handle socket connection and online user updates
  const connectSocket=()=>{
    if(!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
        query:{
            userId:userData
        }
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers",()=>{
        setOnlineUsers(userida);
    }) 
  }
  useEffect(() => {
    if(token){
        axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  },[])

    const value={
        axios,
        authUser,
        OnlineUsers,
        socket,
        login,
        logout,
        updateProfile

    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
