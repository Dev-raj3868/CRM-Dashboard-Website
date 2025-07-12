
import { useEffect } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchProducts } from '../store/slices/productSlice';
import StatsCards from '../components/dashboard/StatsCards';
import DashboardCharts from '../components/dashboard/DashboardCharts';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 30 }));
  }, [dispatch]);

  // Process data for charts
  const categoryData = products.reduce((acc, product) => {
    const category = product.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count,
  }));

  const priceData = products.slice(0, 10).map((product) => ({
    name: product.title.slice(0, 15) + '...',
    price: product.price,
    rating: product.rating,
  }));

  const pieData = Object.entries(categoryData).slice(0, 5).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  const totalRevenue = products.reduce((sum, product) => sum + product.price, 0);
  const totalProducts = products.length;
  const avgRating = products.reduce((sum, product) => sum + product.rating, 0) / products.length;

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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
      </div>

      <StatsCards 
        totalRevenue={totalRevenue}
        totalProducts={totalProducts}
        avgRating={avgRating}
      />

      <DashboardCharts 
        chartData={chartData}
        priceData={priceData}
        pieData={pieData}
      />
    </div>
  );
};

export default Dashboard;
