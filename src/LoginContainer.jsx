import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';

import { changeLoginFields, requestLogin } from './actions';
import { get } from './utils';

export default function LoginContainer() {
  const dispatch = useDispatch();

  const { email, password } = useSelector(get('loginFields'));
  const accessToken = useSelector(get('accessToken'));

  function handleChange({ value, name }) {
    dispatch(changeLoginFields({ value, name }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(requestLogin());
  }

  return (
    <>
      {accessToken ? (
        <div>
          <button type="button">Log Out</button>
        </div>
      ) : (
        <LoginForm
          email={email}
          password={password}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
