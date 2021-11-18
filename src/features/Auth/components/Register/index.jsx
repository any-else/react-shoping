import React from 'react';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

Register.propTypes = {
  closeDialog: PropTypes.func,
};
function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (values) => {
    try {
      //auto set username
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log('New user', user);

      //close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      //show message successfully
      enqueueSnackbar('Register successfully!!✅', { variant: 'success' });
    } catch (error) {
      console.log('Failed to register !!❌', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleOnSubmit} />
    </div>
  );
}

export default Register;
