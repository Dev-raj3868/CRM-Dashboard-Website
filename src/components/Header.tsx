
import { useAppDispatch, useAppSelector } from '../hooks/useAppSelector';
import { logoutUser } from '../store/slices/authSlice';
import { Button } from './ui/button';
import { LogOut, User } from 'lucide-react';
import NotificationBox from './NotificationBox';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">CRM Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationBox />
          
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-700">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
