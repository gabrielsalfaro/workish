import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [passwordMessage, setPasswordMessage] = useState('');


  // give me demo data
  const generateRandomString = (length = 3) => {
    return Math.random().toString(36).substring(2, 2 + length);
  };

  const handleDemoSignup = () => {
    const random = generateRandomString();
    setEmail(`demo_${random}@demo.io`);
    setUsername(`demo_${random}`);
    setFirstName(`Demo_${random}`);
    setLastName('User');
    setPassword('password');
    setConfirmPassword('password');
    setPasswordMessage('( password: password )');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      return setErrors({ email: "Please enter a valid email address" });
    }

    if (!firstNameRegex.test(firstName)) {
      return setErrors({ firstName: "First name must contain only letters" });
    }
    
    if (!lastNameRegex.test(lastName)) {
      return setErrors({ lastName: "Last name must contain only letters" });
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Password does not match",
      });
    }

    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  // email regex
  const emailRegex = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

  // name regex, no numbers in names
  const firstNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  const lastNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;


  const emptyFields = (
    !email.trim() ||
    // !emailRegex.test(email) ||
    !username.trim() || (username.trim().length < 4) ||
    !firstName.trim() ||
    !lastName.trim() ||
    !password.trim() || (password.trim().length < 6) ||
    !confirmPassword.trim()
  )

  return (
    <>
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">Sign Up</h1>

        <center>
          <button
            type="button"
            className="demo-fill-button"
            onClick={handleDemoSignup}
            style={{ padding: '10px 0' }}
          >
            Demo Fill Data
          </button>
        </center>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <div className="signup-label-title">
              Email
              {errors.email && <span className="error-message"> {errors.email}</span>}
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            <div className="signup-label-title">
              Username
              {errors.username && <span className="error-message"> {errors.username}</span>}
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            <div className="signup-label-title">
              First Name
              {errors.firstName && <span className="error-message"> {errors.firstName}</span>}
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>

          <label>
            <div className="signup-label-title">
              Last Name
              {errors.lastName && <span className="error-message"> {errors.lastName}</span>}
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>

          <label>
            <div className="signup-label-title">
              Password
              {errors.password && <span className="error-message"> {errors.password}</span>}
            </div>
            {passwordMessage && (
              <span style={{ padding: '5px 0', color: 'gray' }} className="demo-message">
                {passwordMessage}
              </span>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            <div className="signup-label-title">
              Confirm Password
              {errors.confirmPassword && (
                <span className="error-message"> {errors.confirmPassword}</span>
              )}
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <center>
            <button
              type="submit"
              className="login-button"
              disabled={emptyFields}
            >
              Sign Up
            </button>
          </center>
        </form>
      </div>
    </div>
    </>
  );
}

export default SignupFormModal;