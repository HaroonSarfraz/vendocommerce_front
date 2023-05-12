import React from 'react';
// import _ from 'lodash';
import CreateNewCategory from '@/src/components/Category-Reports/CreateNewCategory';
import DashboardLayout from "@/src/layouts/DashboardLayout";

export default function CreateCategory() {
  return (
    <DashboardLayout>
      <CreateNewCategory />
    </DashboardLayout>
  );
}
