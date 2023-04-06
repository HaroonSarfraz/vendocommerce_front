import Month from '@/src/components/sales-analytics/month';
import dynamic from 'next/dynamic';

const DashboardLayout = dynamic(() => import('@/src/layouts/DashboardLayout'), {
  ssr: false
});
export default function Products() {
  return (
    <DashboardLayout>
      <Month />
    </DashboardLayout>
  );
}
