
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  isLogin: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const AuthForm = ({
  isLogin,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isLoading,
  onSubmit,
}: AuthFormProps) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* Name fields for signup */}
      {!isLogin && (
        <div className="grid grid-cols-2 gap-4 animate-slide-in-from-left">
          <div className="relative">
            <Input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
              placeholder="First Name"
            />
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
              placeholder="Last Name"
            />
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Phone for signup */}
      {!isLogin && (
        <div className="relative animate-slide-in-from-left delay-100">
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
            placeholder="Phone Number (optional)"
          />
          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      )}
      
      {/* Email */}
      <div className="relative animate-slide-in-from-left delay-200">
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
          placeholder="Email address"
        />
        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
      </div>
      
      {/* Password */}
      <div className="relative animate-slide-in-from-left delay-300">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete={isLogin ? "current-password" : "new-password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
          placeholder="Password"
        />
        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {/* Confirm Password for signup */}
      {!isLogin && (
        <div className="relative animate-slide-in-from-left delay-400">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
            placeholder="Confirm Password"
          />
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 animate-slide-in-from-left delay-500"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {isLogin ? 'Signing in...' : 'Creating account...'}
          </div>
        ) : (
          <span className="flex items-center justify-center">
            {isLogin ? 'Sign In' : 'Create Account'}
          </span>
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
