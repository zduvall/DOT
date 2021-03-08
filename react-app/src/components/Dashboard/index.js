import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import thunks
import { getClients } from '../../store/clients';

// import components
import UserInfo from './UserInfo/index.js';
import Clients from './Clients';

export default function Dashboard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  useEffect(() => {
    dispatch(getClients(sessionUser.id));
  }, [dispatch, sessionUser]);

  return (
    <div>
      <div className='dashboard'>
        <h1 className='primary-title'>Dashboard</h1>
        <UserInfo
          showUpdateUser={showUpdateUser}
          setShowUpdateUser={setShowUpdateUser}
        />
        <Clients />
      </div>
      <div className='One1rem-height'></div>
    </div>
  );
}
