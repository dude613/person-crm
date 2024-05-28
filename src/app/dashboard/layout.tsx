import Tabs from 'src/components/dashboard/Tabs';
import React from 'react';

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <div>
        <Tabs/>
        {children}
    </div>
    );
  }
  

