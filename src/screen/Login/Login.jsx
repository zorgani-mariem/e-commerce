// Login.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { login } from '../../redux/slice/loginSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid.';
    if (!password) errors.password = 'Password is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Réinitialiser les erreurs

    try {
      // Essayer de se connecter avec les informations fournies
      const resultAction = await dispatch(login({ email, password }));
      
      if (login.fulfilled.match(resultAction)) {
        // Si la connexion réussit, naviguer vers la page d'accueil
        navigate('/');
        Swal.fire({
            title: "WELCOME TO OUR SHOP",
            icon: "success",
            iconHtml: "",
            customClass: {
                confirmButton: 'primary-btn w-full'
            }

          });
      } else {
        // En cas d'échec, afficher une alerte
        console.error('Login failed:', resultAction.payload);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Check your login information and try again",
            customClass: {
                confirmButton: 'primary-btn w-full'
            }
        });
      }
    } catch (error) {
      // Gérer les erreurs qui ne sont pas couvertes par les rejectWithValue
      console.error('Unexpected error:', error);
      alert('Une erreur inattendue est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mt-16 w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>
          <button type="submit" className='primary-btn w-full'>Login</button>
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">Don't have an account? <NavLink to="/register" className="text-blue-500 hover:underline">Register</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
