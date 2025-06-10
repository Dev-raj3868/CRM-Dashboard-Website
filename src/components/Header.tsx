
import { LogOut, User } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logout } from '../store/slices/authSlice';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 animate-slide-in-from-top">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-600 transition-all duration-300 hover:scale-105 hover:text-blue-700">
            CRM Dashboard
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-10 w-10 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg"
              >
                <Avatar className="h-10 w-10 transition-transform duration-200 hover:scale-105">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 animate-scale-in bg-white shadow-xl border-gray-200" 
              align="end" 
              forceMount
            >
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium transition-colors duration-200 hover:text-blue-600">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
                </p>
                <p className="text-xs text-muted-foreground transition-colors duration-200 hover:text-gray-700">
                  {user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 focus:bg-red-50" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
