// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errs.email = 'Enter a valid email address';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ general: err.message || 'Invalid credentials. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__overlay"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <div className="login-card">
              <div className="login-card__body">
                {/* Logo & Title */}
                <div className="login-brand text-center">
                  <div className="login-brand__logo">
                    <i className="bi bi-building" aria-hidden="true"></i>
                  </div>
                  <h3 className="login-brand__title">Welcome Back</h3>
                  <p className="login-brand__subtitle">
                    Sign in to your HRMS account
                  </p>
                </div>

                {errors.general && (
                  <div className="alert alert-danger py-2 small" role="alert">
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="login-label">
                      Email Address
                    </label>
                    <div className="input-group login-input-group">
                      <span className="input-group-text login-input-icon">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control login-input ${
                          errors.email ? 'is-invalid' : ''
                        }`}
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <div className="text-danger small mt-1">{errors.email}</div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="login-label">
                      Password
                    </label>
                    <div className="input-group login-input-group">
                      <span className="input-group-text login-input-icon">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className={`form-control login-input ${
                          errors.password ? 'is-invalid' : ''
                        }`}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="input-group-text login-input-icon login-input-toggle"
                        onClick={() => setShowPassword((s) => !s)}
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                      >
                        <i
                          className={`bi ${
                            showPassword ? 'bi-eye-slash' : 'bi-eye'
                          }`}
                        ></i>
                      </button>
                    </div>
                    {errors.password && (
                      <div className="text-danger small mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Remember & Forgot */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        className="form-check-input login-checkbox"
                        checked={formData.remember}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="remember"
                        className="form-check-label small"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="/forgot-password" className="login-forgot">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn login-submit w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In <i className="bi bi-arrow-right ms-1"></i>
                      </>
                    )}
                  </button>
                </form>

                <p className="login-footer-text">
                  Don't have an account?{' '}
                  <a href="/signup" className="login-link">
                    Contact Admin
                  </a>
                </p>
              </div>
            </div>

            <p className="login-copyright">
              © {new Date().getFullYear()} HRMS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
