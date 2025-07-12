import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Search, Plus, Mail, Phone, MapPin, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CustomerDetailsModal from '../components/CustomerDetailsModal';
import AddCustomerModal from '../components/AddCustomerModal';
import { toast } from 'sonner';

// Mock customer data
const initialMockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    orders: 12,
    totalSpent: 1250.50,
    rating: 4.8,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Los Angeles, CA',
    orders: 8,
    totalSpent: 890.25,
    rating: 4.9,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    orders: 15,
    totalSpent: 2100.75,
    rating: 4.7,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '+1 (555) 789-0123',
    location: 'Miami, FL',
    orders: 5,
    totalSpent: 450.00,
    rating: 4.6,
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b524?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Seattle, WA',
    orders: 20,
    totalSpent: 3200.90,
    rating: 4.9,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState(initialMockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailsMode, setDetailsMode] = useState<'view' | 'edit'>('view');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.orders, 0);

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setDetailsMode('view');
    setIsDetailsModalOpen(true);
  };

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setDetailsMode('edit');
    setIsDetailsModalOpen(true);
  };

  const handleSaveCustomer = (updatedCustomer: any) => {
    setCustomers(prev => 
      prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c)
    );
    setIsDetailsModalOpen(false);
    toast.success('Customer updated successfully!');
  };

  const handleDeleteCustomer = (customerId: number) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
    setIsDetailsModalOpen(false);
    toast.success('Customer deleted successfully!');
  };

  const handleAddCustomer = (newCustomerData: any) => {
    const newCustomer = {
      ...newCustomerData,
      id: Math.max(...customers.map(c => c.id)) + 1,
      orders: 0,
      totalSpent: 0,
      rating: 0,
      status: 'active',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCustomerData.name)}&background=3b82f6&color=ffffff`
    };
    setCustomers(prev => [...prev, newCustomer]);
    toast.success('Customer added successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 animate-slide-in-from-left">Customer Management</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-from-right"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <div className="h-4 w-4 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <div className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="h-2 w-2 bg-green-600 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">{((activeCustomers/totalCustomers)*100).toFixed(1)}% active rate</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-4 w-4 bg-purple-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <div className="h-4 w-4 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="h-2 w-2 bg-orange-600 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <CardHeader>
          <CardTitle>Search Customers</CardTitle>
          <CardDescription>Find customers by name, email, or location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground transition-colors duration-200" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-[1.02]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
          <CardDescription>Manage your customer relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow 
                    key={customer.id} 
                    className="hover:bg-muted/50 transition-all duration-200 animate-fade-in"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 transition-transform duration-200 hover:scale-110">
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium hover:text-blue-600 transition-colors duration-200">{customer.name}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {customer.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm hover:text-blue-600 transition-colors duration-200">
                          <Mail className="mr-1 h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground hover:text-gray-700 transition-colors duration-200">
                          <Phone className="mr-1 h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{customer.orders}</TableCell>
                    <TableCell className="font-medium text-green-600">${customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-transform duration-200 hover:scale-110" />
                        <span>{customer.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={customer.status === 'active' ? 'default' : 'secondary'}
                        className="transition-all duration-200 hover:scale-105"
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewCustomer(customer)}
                          className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditCustomer(customer)}
                          className="transition-all duration-200 hover:scale-105 hover:shadow-md hover:border-blue-500"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="transition-all duration-200 hover:scale-105 hover:shadow-md hover:border-red-500 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSave={handleSaveCustomer}
        onDelete={handleDeleteCustomer}
        mode={detailsMode}
      />

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCustomer}
      />
    </div>
  );
};

export default Customers;
