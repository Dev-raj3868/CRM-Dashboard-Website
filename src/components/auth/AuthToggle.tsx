
import React from 'react';

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthToggle = ({ isLogin, onToggle }: AuthToggleProps) => {
  return (
    <div className="mt-6 text-center animate-fade-in delay-600">
      <p className="text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </p>
      <button
        type="button"
        onClick={onToggle}
        className="mt-2 font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
      >
        {isLogin ? 'Create an account' : 'Sign in instead'}
      </button>
    </div>
  );
};

export default AuthToggle;
