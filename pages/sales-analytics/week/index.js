import Week from '@/src/components/sales-analytics/week';
import dynamic from 'next/dynamic';

const DashboardLayout = dynamic(() => import('@/src/layouts/DashboardLayout'), {
  ssr: false
});
export default function Products() {
  return (
    <DashboardLayout>
      <Week />
    </DashboardLayout>
  );
}
