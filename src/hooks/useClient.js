import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

export const useClient = ({ apiKey, userData, tokenOrProvider }) => {
    const [client, setClient] = useState(null);
  
    useEffect(() => {
      const newClient = new StreamChat(apiKey);
      // prevents application from setting stale client (user changed, for example)
      let didUserConnectInterrupt = false;
  
      const connectionPromise = newClient.connectUser(userData, tokenOrProvider).then(() => {
        if (!didUserConnectInterrupt) setClient(newClient);
      });
  
      return () => {
        didUserConnectInterrupt = true;
        setClient(null);
        // wait for connection to finish before initiating closing sequence
        connectionPromise
          .then(() => newClient.disconnectUser())
          .then(() => {
            console.log('connection closed');
          });
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiKey, userData.id, tokenOrProvider]); 
  
    return client;
  };
