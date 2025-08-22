import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };


  const handleDemoLogin = () => {
    dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .then(() => {
        closeModal();
        // if (onLoginSuccess) onLoginSuccess();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const isDisabled = credential.length < 4 || password.length < 6;


  return (
    <>
      <div className="modal-container" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h1 className="modal-title">Log In</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <div className="signup-label-title">
                Username or Email
                {errors.credential && (<span className="error-message"> {errors.credential}</span>)}
              </div>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              <div className="signup-label-title">Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {/* {errors.credential && (<p>{errors.credential}</p>)} */}

            <center>
              <button 
                type="submit" 
                className="login-button"
                disabled={isDisabled} 
              >Log In</button>
            </center>

            <div className="demo-user-container">
              <a
                href="#"
                className="demo-user"
                onClick={(e) => {
                  e.preventDefault();
                  handleDemoLogin();
                }}
              >
                <center>Demo User</center>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;