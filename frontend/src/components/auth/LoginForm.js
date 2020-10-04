import React, { useContext } from "react";
import axios from 'axios';

import { useHistory } from "react-router-dom";
import globalContext from '../../context/globalContext'
import { backendUrl }  from '../../static/js/const';
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit, watch } = useForm();

  const userName = watch("username", "");
  const userPassword = watch("password", "");
  const { login } = useContext(globalContext);
  const history = useHistory();

  const onSubmit = async (data) => {
      const url = `${backendUrl}/token/`;
      try {
        const res = await axios.post(url, data);
        login(res.data);
        history.push('/');
      }
      catch (err) {
        if (err.response?.status === 401){
            console.log('Invalid Credentials');
        }
      }
  }

  return (
  <div className="login">
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="login-fieldset">
        <input
          className="sidebar-input border--gray border--onHoverBlue"
          type="text"
          name="username"
          placeholder="Username"
          ref={register({ required: true })}
        />
        <input
          className="sidebar-input border--gray border--onHoverBlue"
          type="password"
          name="password"
          placeholder="Password"
          ref={register({ required: true })}
        />
        {
          userName.trim() !== '' && userPassword.trim() !== '' ?  
            <button className="btn" type="submit"> Login </button>:
            <button className="btn btn--disabled" disabled> Login </button>
        }
      </fieldset>
    </form>
  </div>
  );
};

export default LoginForm;