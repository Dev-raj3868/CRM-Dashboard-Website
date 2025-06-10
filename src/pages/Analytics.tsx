
import { useEffect } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../store/slices/productSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package } from 'lucide-react';

const Analytics = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 100 }));
  }, [dispatch]);

  // Calculate analytics data
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const avgPrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
  const topCategories = Object.entries(
    products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const priceRanges = [
    { range: '$0-50', count: products.filter(p => p.price <= 50).length },
    { range: '$51-100', count: products.filter(p => p.price > 50 && p.price <= 100).length },
    { range: '$101-500', count: products.filter(p => p.price > 100 && p.price <= 500).length },
    { range: '$500+', count: products.filter(p => p.price > 500).length },
  ];

  const scatterData = products.slice(0, 30).map(product => ({
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    name: product.title.slice(0, 15) + '...',
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgPrice.toFixed(2)}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.stock < 10).length}
            </div>
            <div className="text-xs text-muted-foreground">
              Requires attention
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topCategories.length}</div>
            <div className="text-xs text-muted-foreground">
              Active categories
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Price Distribution</CardTitle>
            <CardDescription>Products grouped by price ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={priceRanges}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Price vs Rating</CardTitle>
            <CardDescription>Correlation between product price and customer rating</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="price" name="Price" />
                <YAxis dataKey="rating" name="Rating" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter dataKey="rating" fill="#06B6D4" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Most popular product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map(([category, count], index) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{category}</span>
                    <span className="text-sm text-muted-foreground">{count} products</span>
                  </div>
                  <Progress 
                    value={(count / Math.max(...topCategories.map(c => c[1]))) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Inventory Insights</CardTitle>
            <CardDescription>Key inventory metrics and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">High-performing products</p>
                  <p className="text-xs text-muted-foreground">Rating {`>`} 4.5</p>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {products.filter(p => p.rating > 4.5).length}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Well-stocked items</p>
                  <p className="text-xs text-muted-foreground">Stock {`>`} 50</p>
                </div>
                <div className="text-lg font-bold text-green-600">
                  {products.filter(p => p.stock > 50).length}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Premium products</p>
                  <p className="text-xs text-muted-foreground">Price {`>`} $100</p>
                </div>
                <div className="text-lg font-bold text-orange-600">
                  {products.filter(p => p.price > 100).length}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Needs restocking</p>
                  <p className="text-xs text-muted-foreground">Stock {`<`} 5</p>
                </div>
                <div className="text-lg font-bold text-red-600">
                  {products.filter(p => p.stock < 5).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
