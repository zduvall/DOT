import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import telephone input packages
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

// import thunks
import { updateUser } from '../../../store/session';

// import css
import '../Dashboard.css';

export default function UserInfo({ setShowUpdateUser }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState(sessionUser.firstName);
  const [lastName, setLastName] = useState(sessionUser.lastName);
  const [email, setEmail] = useState(sessionUser.email);
  const [lic, setLic] = useState(sessionUser.lic || '');
  const [pxName, setPxName] = useState(sessionUser.pxName || '');
  const [phone, setPhone] = useState(sessionUser.phone || '');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validEmail = /^[A-Za-z0-9_.]+@\w+.\w+.\w?/;
    if (!validEmail.test(email)) {
      setErrors((prevErrors) => [
        ...prevErrors,
        'Please ensure email is valid!!!!.',
      ]);
    }

    const user = await dispatch(
      updateUser(sessionUser.id, firstName, lastName, email, lic, pxName, phone)
    );
    if (!user.errors) {
      console.log('updated');
      setShowUpdateUser(false);
    } else {
      setErrors(user.errors);
    }
  };

  return (
    <div className='form-container user_info'>
      <form className='form user_info__form' onSubmit={onSubmit}>
        <div className='user_info__data'>
          <div className='errors-container'>
            {errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <div className='form__row'>
            <input
              name='firstName'
              type='text'
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className='form__input user_info__input'
            ></input>
            <input
              name='lastName'
              type='text'
              placeholder='Last Name'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className='form__input user_info__input'
            ></input>
            <input
              name='lic'
              type='text'
              placeholder='License'
              onChange={(e) => setLic(e.target.value)}
              value={lic}
              className='form__input user_info__input'
            ></input>
          </div>
          <div className='form__row'>
            <input
              name='pxName'
              type='text'
              placeholder='PxName'
              onChange={(e) => setPxName(e.target.value)}
              value={pxName}
              className='form__input user_info__input'
            ></input>
          </div>
          <div className='form__row'>
            <PhoneInput
              name='phone'
              // type='text'
              placeholder='Phone number'
              onChange={setPhone}
              value={phone}
              className='form__input user_info__input'
              defaultCountry='US'
            ></PhoneInput>
            <input
              name='email'
              type='text'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='form__input user_info__input'
            ></input>
          </div>
        </div>
        <div className='form__row user_info__buttons'>
          <button
            className='primary-button form__button user_info__button'
            type='submit'
          >
            Update
          </button>
          <button
            className='secondary-button form__button user_info__button'
            type='button'
            onClick={() => setShowUpdateUser(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
