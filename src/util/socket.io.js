import React, {useEffect, useRef, useState} from 'react';
import socketIOClient, {io} from 'socket.io-client';
import path from './path_confige';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
export const SocketContext = React.createContext(null);
export const useSocket = () => {
  return React.useContext(SocketContext);
};
import {Status} from '../Redux_Toolkit/Reducer/status.User';
export const SocketProvider = ({children}) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const user = useSelector(state => state.auth.value);
  useEffect(() => {
    const connectToSocketServer = async () => {
      if (user) {
        try {
          const userToken = await AsyncStorage.getItem('user');
          const accessToken = JSON.parse(userToken)?.accessToken;
          const iduser = JSON.parse(userToken)?._id;
            console.log(accessToken);
          if (!accessToken) {
            throw new Error('JWT token not found');
          }

          const newSocket = socketIOClient(path, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
            auth: {
              token: accessToken,
              userId: iduser,
            },
          });
          newSocket.on('connect', () =>
            console.log('Connected to Socket.IO server'),
          );
          newSocket.on('connect_error', error => {
            console.error('Socket.IO connection error:', error);
          });
          newSocket.on('UserOnline', userId => {
            dispatch(Status(userId));
          });
          newSocket.on('server-send-when-has-user-online', userId => {
            dispatch(Status(userId));

          });

          setSocket(newSocket);
        } catch (error) {
          console.error('Error connecting to Socket.IO server:', error);
        }
      }
    };
    connectToSocketServer().then();

    return () => {
      // socket.io.opts.reconnection = false; // Tắt auto-reconnect
      socket?.disconnect();
      socket?.removeAllListeners();
      socket?.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
