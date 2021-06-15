import { useDispatch, useSelector } from 'react-redux';

import { requestLogin, setForm } from './actions';
import LoginForm from './LoginForm';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { email, password } = useSelector((state) => state.form);

  function handleChange({ name, value }) {
    dispatch(setForm({ name, value }));
  }
  function handleSubmit() {
    dispatch(requestLogin());
  }

  return (
    <LoginForm
      form={{ email, password }}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
