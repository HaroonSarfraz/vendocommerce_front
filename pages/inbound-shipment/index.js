import dynamic from 'next/dynamic';
import Shipment from '@/src/components/inbound-shipment';

const DashboardLayout = dynamic(() => import('@/src/layouts/DashboardLayout'), {
  ssr: false
});
export default function Products() {
  return (
    <DashboardLayout>
      <Shipment />
    </DashboardLayout>
  );
}
