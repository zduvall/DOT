import { useState } from 'react';

// import components
import UserInfo from './UserInfo/index.js';
import Clients from './Clients';

export default function Dashboard() {
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  return (
    <div>
      <div className='site__page'>
        <h1 className='primary-title'>Dashboard</h1>
        <UserInfo
          showUpdateUser={showUpdateUser}
          setShowUpdateUser={setShowUpdateUser}
        />
        <Clients />
      </div>
      <div className='one1rem-ht'/>
    </div>
  );
}
