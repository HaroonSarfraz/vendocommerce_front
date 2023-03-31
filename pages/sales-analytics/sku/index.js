import TopBarFilterSku from '@/src/components/sales-analytics/sales by sku/top-bar-filter';
import dynamic from 'next/dynamic';
const DashboardLayout = dynamic(() => import('@/src/layouts/DashboardLayout'), {
  ssr: false
});

export default function SalesBySku() {
  return (
    <DashboardLayout>
      <TopBarFilterSku />
    </DashboardLayout>
  );
}
