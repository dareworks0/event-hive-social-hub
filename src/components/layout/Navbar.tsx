
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = () => {
    if (!user) return 'U';
    
    const email = user.email || '';
    return email.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-eventhub-primary to-eventhub-secondary flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-eventhub-primary to-eventhub-secondary bg-clip-text text-transparent">
                EventHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/explore" className="text-gray-600 hover:text-eventhub-primary transition-colors">
              Explore
            </Link>
            <Link to="/news" className="text-gray-600 hover:text-eventhub-primary transition-colors">
              News
            </Link>
            {user && (
              <Link to="/create" className="text-gray-600 hover:text-eventhub-primary transition-colors">
                Create Event
              </Link>
            )}

            {/* Authentication Links */}
            <div className="flex items-center space-x-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage src="" alt={user.email || ''} />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="border-eventhub-primary text-eventhub-primary hover:bg-eventhub-primary hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-eventhub-primary text-white hover:bg-eventhub-secondary">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-3 py-3">
              <Link to="/explore" className="text-gray-600 hover:text-eventhub-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">
                Explore
              </Link>
              <Link to="/news" className="text-gray-600 hover:text-eventhub-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">
                News
              </Link>
              {user && (
                <Link to="/create" className="text-gray-600 hover:text-eventhub-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">
                  Create Event
                </Link>
              )}
              
              {user ? (
                <>
                  <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-eventhub-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-gray-600 hover:text-eventhub-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50 w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center space-x-2 text-gray-600 hover:text-eventhub-primary transition-colors px-3 py-2 rounded-md hover:bg-gray-50">
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-eventhub-primary text-white hover:bg-eventhub-secondary">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
