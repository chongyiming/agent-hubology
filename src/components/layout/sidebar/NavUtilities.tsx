
import React from 'react';
import { Settings, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NotificationBell from '../NotificationBell';

const NavUtilities: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 pb-1">
      <NotificationBell />
      
      <Link to="/settings">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default NavUtilities;
