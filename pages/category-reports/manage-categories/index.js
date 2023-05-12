import React from 'react';
// import _ from 'lodash';
import ManageCategoryData from '@/src/components/Category-Reports/ManageCategoryData';
import DashboardLayout from "@/src/layouts/DashboardLayout";

export default function ManageCategory() {
  return (
    <DashboardLayout>
      <ManageCategoryData />
    </DashboardLayout>
  );
}
