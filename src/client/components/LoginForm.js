import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from 'client/validation.js';
import { loginUser } from 'client/store/userSlice';
import { getErrorMessage } from 'client/utils/errors';
import { useToast } from './ToastContext';
import { wakeServer } from '../store/userSlice';

const initialState = {
  username: {
    value: '',
    validateOnChange: false,
    error: null
  },
  password: {
    value: '',
    validateOnChange: false,
    error: null
  }
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(initialState.username);
  const [password, setPassword] = useState(initialState.password);
  const [serverStatus, setServerStatus] = useState('loading');
  const [copiedField, setCopiedField] = useState('');
  const toast = useToast();
  useEffect(() => {
    const checkServer = async () => {
      try {
        await wakeServer();
        setServerStatus('online'); // green dot
      } catch (err) {
        console.log('Server ping failed');
        setServerStatus('error'); // red dot
      }
    };

    checkServer();
  }, []);

  const handleBlur = (validationFunc, event) => {
    const {
      target: { name }
    } = event;

    switch (name) {
      case 'username':
        if (username.validateOnChange === false) {
          setUsername((data) => ({
            ...data,
            validateOnChange: true,
            error: validationFunc(data.value)
          }));
        }
        break;
      case 'password':
        if (password.validateOnChange === false) {
          setPassword((data) => ({
            ...data,
            validateOnChange: true,
            error: validationFunc(data.value)
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (validationFunc, event) => {
    const {
      target: { name, value }
    } = event;

    switch (name) {
      case 'username':
        setUsername((data) => ({
          ...data,
          value,
          error: data.validateOnChange ? validationFunc(value) : null
        }));
        break;
      case 'password':
        setPassword((data) => ({
          ...data,
          value,
          error: data.validateOnChange ? validationFunc(value) : null
        }));
        break;
      default:
        break;
    }
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const fillSampleCredentials = () => {
    setUsername((data) => ({
      ...data,
      value: 'Admin',
      error: data.validateOnChange ? validateFields.validateUsername('Admin') : null
    }));
    setPassword((data) => ({
      ...data,
      value: '1234',
      error: data.validateOnChange ? validateFields.validatePassword('1234') : null
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usernameError = validateFields.validateUsername(username.value);
    const passwordError = validateFields.validatePassword(password.value);

    if ([usernameError, passwordError].every((e) => e === false)) {
      // no input errors, submit the form
      const data = {
        username: username.value,
        password: password.value
      };

      dispatch(loginUser(data)).catch((e) => {
        const msg = getErrorMessage(e);
        toast.error(`Login error: ${msg}`);

        const errorCode = e.response?.data?.errorCode;

        // Update state to reflect response errors
        if (errorCode) {
          switch (errorCode) {
            case 'username':
              setUsername((data) => ({
                ...data,
                validateOnChange: true,
                error: msg
              }));
              break;

            case 'password':
              setPassword((data) => ({
                ...data,
                validateOnChange: true,
                error: msg
              }));
              break;
            default:
              break;
          }
        }
      });
    } else {
      // update state with errors
      if (usernameError) {
        setUsername((data) => ({
          ...data,
          validateOnChange: true,
          error: usernameError
        }));
      }

      if (passwordError) {
        setPassword((data) => ({
          ...data,
          validateOnChange: true,
          error: passwordError
        }));
      }
    }
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const [timer, setTimer] = useState(50); // 50 seconds countdown

  useEffect(() => {
    let interval;

    if (serverStatus === 'loading') {
      setTimer(50); // reset timer when loading starts
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [serverStatus]);

  return (
    <Form>
      <div
        style={{
          display: 'flex',
          alignItems: 'space-between',
          gap: '10px',
          width: 'full'
        }}
      >
        <h4 style={{ margin: 0 }}>User Login</h4>

        <button
          type="button"
          className={`btn ${
            serverStatus === 'online' ? 'btn-success' : serverStatus === 'error' ? 'btn-danger' : 'btn-primary'
          }`}
          disabled={serverStatus === 'loading'}
        >
          {serverStatus === 'loading' && (
            <>
              <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
              Server Loading... max-{timer}s
            </>
          )}
          {serverStatus === 'online' && 'Server Online'}
          {serverStatus === 'error' && 'Server Error'}
        </button>
        <div style={{ position: 'relative' }}>
          <Button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            variant="primary"
          >
            Hover Me
          </Button>

          {showTooltip && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'black',
                color: 'white',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '18px',
                whiteSpace: 'nowrap',
                boxShadow: '0px 2px 6px rgba(0,0,0,0.3)',
                zIndex: 10
              }}
            >
              Backend is hosted with Render, may take up to 50 secs to startup
            </div>
          )}
        </div>
      </div>

      <Form.Group controlId="username">
        <Form.Label className="text-primary">Username</Form.Label>
        <Form.Control
          name="username"
          placeholder="Enter username"
          value={username.value}
          onChange={(event) => handleChange(validateFields.validateUsername, event)}
          onBlur={(event) => handleBlur(validateFields.validateUsername, event)}
        />
      </Form.Group>

      <div className="text-danger">
        <small>{username.error}</small>
      </div>

      <Form.Group controlId="password">
        <Form.Label className="text-primary">Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password"
          value={password.value}
          onChange={(event) => handleChange(validateFields.validatePassword, event)}
          onBlur={(event) => handleBlur(validateFields.validatePassword, event)}
        />
      </Form.Group>

      <div className="text-danger">
        <small>{password.error}</small>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '18px 0px' }}>
        <Button type="submit" name="login-form-btn" variant="primary" onClick={handleSubmit}>
          Login
        </Button>
      </div>
      <div>
        <span>
          New user? Please <Link to="/register">register</Link>.
        </span>
      </div>
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          fontSize: '14px',
          marginTop: '20px'
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#495057' }}>Sample Login:</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span>
              <strong>Username:</strong> Admin
            </span>
            <Button variant="primary" type="button" onClick={() => copyToClipboard('Admin', 'username')}>
              {copiedField === 'username' ? '✓' : 'Copy'}
            </Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span>
              <strong>Password:</strong> 1234
            </span>
            <Button type="button" onClick={() => copyToClipboard('1234', 'password')} className="btn btn-primary">
              {copiedField === 'password' ? '✓' : 'Copy'}
            </Button>
          </div>
        </div>

        <Button
          type="button"
          onClick={fillSampleCredentials}
          className="btn btn-success"
          style={{ width: '100%', marginTop: '8px' }}
        >
          Fill Form
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
