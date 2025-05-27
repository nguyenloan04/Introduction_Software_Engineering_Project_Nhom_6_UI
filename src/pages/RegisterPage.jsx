import React from 'react';
import RegisterForm from '../components/register/RegisterForm';
import { Header } from '../components/ui/Header.jsx';
import { Footer } from '../components/ui/Footer.jsx';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Header />
      <div className="content-container">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
