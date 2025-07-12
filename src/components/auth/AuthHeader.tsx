
import React from 'react';
import { User } from 'lucide-react';

interface AuthHeaderProps {
  isLogin: boolean;
}

const AuthHeader = ({ isLogin }: AuthHeaderProps) => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 animate-bounce">
        <User className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      <p className="mt-2 text-gray-600">
        {isLogin ? 'Sign in to your account' : 'Join us today'}
      </p>
    </div>
  );
};

export default AuthHeader;
