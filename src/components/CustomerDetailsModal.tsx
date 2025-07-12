
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Mail, Phone, MapPin, Star, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  rating: number;
  status: string;
  avatar: string;
}

interface CustomerDetailsModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  onDelete?: (customerId: number) => void;
  mode: 'view' | 'edit';
}

const CustomerDetailsModal = ({ customer, isOpen, onClose, onSave, onDelete, mode }: CustomerDetailsModalProps) => {
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState(mode === 'edit');

  useEffect(() => {
    if (customer) {
      setEditedCustomer({ ...customer });
    }
    setIsEditing(mode === 'edit');
  }, [customer, mode]);

  const handleSave = () => {
    if (editedCustomer) {
      onSave(editedCustomer);
      setIsEditing(false);
      onClose();
    }
  };

  const handleDelete = () => {
    if (editedCustomer && onDelete) {
      onDelete(editedCustomer.id);
      onClose();
    }
  };

  const updateCustomer = (field: keyof Customer, value: any) => {
    if (editedCustomer) {
      setEditedCustomer({ ...editedCustomer, [field]: value });
    }
  };

  if (!customer && !editedCustomer) return null;

  const displayCustomer = editedCustomer || customer;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 transition-transform duration-200 hover:scale-110">
                <AvatarImage src={displayCustomer?.avatar} alt={displayCustomer?.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {displayCustomer?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{displayCustomer?.name}</h3>
                <Badge variant={displayCustomer?.status === 'active' ? 'default' : 'secondary'}>
                  {displayCustomer?.status}
                </Badge>
              </div>
            </div>
            {onDelete && !isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Edit customer information' : 'View customer details'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={displayCustomer?.name || ''}
                  onChange={(e) => updateCustomer('name', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="font-medium">{displayCustomer?.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              {isEditing ? (
                <select
                  className="w-full p-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  value={displayCustomer?.status || 'active'}
                  onChange={(e) => updateCustomer('status', e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              ) : (
                <Badge variant={displayCustomer?.status === 'active' ? 'default' : 'secondary'}>
                  {displayCustomer?.status}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                Email
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={displayCustomer?.email || ''}
                  onChange={(e) => updateCustomer('email', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{displayCustomer?.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="mr-1 h-4 w-4" />
                Phone
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={displayCustomer?.phone || ''}
                  onChange={(e) => updateCustomer('phone', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p>{displayCustomer?.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Location
            </Label>
            {isEditing ? (
              <Input
                id="location"
                value={displayCustomer?.location || ''}
                onChange={(e) => updateCustomer('location', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p>{displayCustomer?.location}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg transition-all duration-200 hover:bg-blue-100">
              <div className="text-2xl font-bold text-blue-600">{displayCustomer?.orders}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg transition-all duration-200 hover:bg-green-100">
              <div className="text-2xl font-bold text-green-600">${displayCustomer?.totalSpent.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg transition-all duration-200 hover:bg-yellow-100">
              <div className="flex items-center justify-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-600">{displayCustomer?.rating}</span>
              </div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {!isEditing && (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="transition-all duration-200 hover:scale-105"
              >
                Edit Customer
              </Button>
            )}
          </div>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="transition-all duration-200 hover:scale-105"
            >
              Cancel
            </Button>
            {isEditing && (
              <Button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
              >
                Save Changes
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;
