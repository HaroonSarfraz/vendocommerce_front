import Planning from '@/src/components/inventory-management/planning';
import dynamic from 'next/dynamic';

const DashboardLayout = dynamic(() => import('@/src/layouts/DashboardLayout'), {
  ssr: false
});
export default function Products() {
  return (
    <DashboardLayout>
      <Planning />
    </DashboardLayout>
  );
}
