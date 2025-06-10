
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Package, DollarSign, Hash } from 'lucide-react';
import { useState } from 'react';

interface NewProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: NewProduct) => void;
}

const AddProductModal = ({ isOpen, onClose, onAdd }: AddProductModalProps) => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    brand: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.title && newProduct.price > 0) {
      onAdd(newProduct);
      setNewProduct({
        title: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        brand: ''
      });
      onClose();
    }
  };

  const updateField = (field: keyof NewProduct, value: string | number) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span>Add New Product</span>
          </DialogTitle>
          <DialogDescription>
            Enter product information to add it to your inventory
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-title">Product Title *</Label>
              <Input
                id="product-title"
                value={newProduct.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Enter product title"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-brand">Brand</Label>
              <Input
                id="product-brand"
                value={newProduct.brand}
                onChange={(e) => updateField('brand', e.target.value)}
                placeholder="Enter brand name"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={newProduct.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Enter product description"
              rows={3}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-price" className="flex items-center">
                <DollarSign className="mr-1 h-4 w-4" />
                Price *
              </Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                min="0"
                value={newProduct.price || ''}
                onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-stock" className="flex items-center">
                <Hash className="mr-1 h-4 w-4" />
                Stock
              </Label>
              <Input
                id="product-stock"
                type="number"
                min="0"
                value={newProduct.stock || ''}
                onChange={(e) => updateField('stock', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-category">Category</Label>
              <Input
                id="product-category"
                value={newProduct.category}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="Enter category"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
