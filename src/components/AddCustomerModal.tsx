
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import { useState } from 'react';

interface NewCustomer {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (customer: NewCustomer) => void;
}

const AddCustomerModal = ({ isOpen, onClose, onAdd }: AddCustomerModalProps) => {
  const [newCustomer, setNewCustomer] = useState<NewCustomer>({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.email) {
      onAdd(newCustomer);
      setNewCustomer({
        name: '',
        email: '',
        phone: '',
        location: ''
      });
      onClose();
    }
  };

  const updateField = (field: keyof NewCustomer, value: string) => {
    setNewCustomer(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <span>Add New Customer</span>
          </DialogTitle>
          <DialogDescription>
            Enter customer information to add them to your CRM
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer-name">Full Name *</Label>
            <Input
              id="customer-name"
              value={newCustomer.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Enter customer name"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-email" className="flex items-center">
              <Mail className="mr-1 h-4 w-4" />
              Email *
            </Label>
            <Input
              id="customer-email"
              type="email"
              value={newCustomer.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="Enter email address"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-phone" className="flex items-center">
              <Phone className="mr-1 h-4 w-4" />
              Phone
            </Label>
            <Input
              id="customer-phone"
              value={newCustomer.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="Enter phone number"
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-location" className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Location
            </Label>
            <Input
              id="customer-location"
              value={newCustomer.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="Enter location"
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <DialogFooter className="space-x-2 pt-4">
            <Button 
              type="button"
              variant="outline" 
              onClick={onClose}
              className="transition-all duration-200 hover:scale-105"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
            >
              Add Customer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerModal;
