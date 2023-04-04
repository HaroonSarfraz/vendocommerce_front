import Product from '@/src/components/sales-analytics/product';
import dynamic from 'next/dynamic';

const DashboardLayout = dynamic(() => import('@/src/layouts/DashboardLayout'), {
  ssr: false
});
export default function Products() {
  return (
    <DashboardLayout>
      <Product />;
    </DashboardLayout>
  );
}
