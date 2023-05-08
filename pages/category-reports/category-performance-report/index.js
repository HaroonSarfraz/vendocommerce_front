import dynamic from 'next/dynamic';
import React from 'react';
import _ from 'lodash';
import CategoryPerformanceReport from '@/src/components/Category-Reports/CategoryPerformanceReport';

const DashboardLayout = dynamic(() => import('@/src/layouts/DashboardLayout'), {
  ssr: false,
});

export default function CategoryPerformanceReportPage() {
  return (
    <DashboardLayout>
      <CategoryPerformanceReport />
    </DashboardLayout>
  );
}
