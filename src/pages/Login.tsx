
import { useState, useEffect } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { loginUser, signupUser, clearError, initializeAuth } from '../store/slices/authSlice';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Attempting ${isSignup ? 'signup' : 'login'} with:`, { email });
    
    if (isSignup) {
      dispatch(signupUser({ email, password }));
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  const loadDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4 animate-fade-in">
      <Card className="w-full max-w-md transition-all duration-300 hover:shadow-xl animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-transform duration-300 hover:scale-110 animate-pulse">
            {isSignup ? 
              <Mail className="h-6 w-6 text-blue-600" /> : 
              <Lock className="h-6 w-6 text-blue-600" />
            }
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 transition-colors duration-200 hover:text-blue-600">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="transition-colors duration-200 hover:text-blue-600">
            {isSignup ? 'Sign up for your CRM account' : 'Sign in to your CRM account'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="animate-shake">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-[1.02]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-[1.02]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignup ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                isSignup ? 'Sign Up' : 'Sign In'
              )}
            </Button>
            
            <div className="text-center space-y-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsSignup(!isSignup)}
                className="text-sm text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105"
              >
                {isSignup 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </Button>
              
              {!isSignup && (
                <div className="text-sm text-gray-600 animate-fade-in">
                  <p>Demo credentials for testing:</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={loadDemoCredentials}
                    className="mt-2 transition-all duration-300 hover:bg-blue-50 hover:border-blue-300 hover:scale-105"
                  >
                    Load Demo Credentials
                  </Button>
                  <div className="text-xs text-gray-500 mt-1">
                    <p>Email: demo@example.com | Password: password123</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
