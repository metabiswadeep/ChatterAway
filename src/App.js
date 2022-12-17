import React, { useState } from 'react';
import {Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window} from 'stream-chat-react';

import { useClient } from './hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

        
const App = () => {
  
const [id, setId] = useState('');
const [details, setDetails] = useState('');

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmlzd2FkZWVwIn0.99jiV_ffAvLstcAWx3yU0B3EOMmWHyt4cNg_Sa5UhWY';
const user = {
  id: 'biswadeep',
  name: 'Biswadeep Purkayastha',
  image: 'https://getstream.io/random_svg/?name=Biswadeep',
};

  const client = useClient({ apiKey: 'xweyehq2qrnt', userData: user, tokenOrProvider: userToken });


  if (!client) return null;

  const channel1 = client.channel('messaging', 'basic', {
    image: 'https://getstream.io/random_svg/?name=Messages',
    name: 'Basic Messages',
  });
  
  const channel2 = client.channel('messaging', 'python', {
    name: 'All about Python',
    image: 'https://getstream.io/random_svg/?name=Python',
  });
  const channel3 = client.channel('messaging', 'datascience', {
      name: 'Data Science Lovers',
      image: 'https://getstream.io/random_svg/?name=Data',
  });
  const channel4 = client.channel('messaging', 'travell', {
      name: 'Travelling',
      image: 'https://getstream.io/random_svg/?name=Travel',
  });
  const channel5 = client.channel('messaging', 'jokes', {
      name: 'Jokes : Wanna laugh?',
      image: 'https://getstream.io/random_svg/?name=Jokes',
  });


  const addChannel = ({ id,details }) => {
    
    const channel = client.channel('messaging', id, {
        name: details,
        image: 'https://getstream.io/random_svg/?name={details}',
    });
  
    const createChannel = async () => {
  
        await channel.create();
    };
    createChannel();
  };

  const removeChannel = ({ id,details }) => {
    const channel = client.channel('messaging', id, {
        name: details,
        image: 'https://getstream.io/random_svg/?name={details}',
    });
  
    const deleteChannel = async () => {
  
        await channel.delete();
    };
    deleteChannel();
  };


const createChannels = async () => {
  await channel1.create();
  await channel2.create();
  await channel3.create();
  await channel4.create();
  await channel5.create();
}

createChannels();


const handleChange = event => {
  setId(event.target.value);
}
const handleotherChange = event => {
  setDetails(event.target.value);
}


if (!client) {
  return <LoadingIndicator />;
}
  
  return (
    <Chat client={client} theme='str-chat__theme-dark'>
      <ChannelList filters={filters} sort={sort} options={options}/>
      <Channel>
        <Window>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <input type="text" id="id" name="id" placeholder='ID' onChange={handleChange} value={id} />
            <input type="text" id="details" name="details" placeholder='Channel Name' onChange={handleotherChange} value={details} />
            <button class="button-15" role="button" onClick={() => {addChannel({id:id, details:details})}}>Add new channel</button>
            <button class="button-15" role="button" onClick={() => {removeChannel({id:id, details:details})}}>Delete channel</button>
          </div>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
  };

export default App