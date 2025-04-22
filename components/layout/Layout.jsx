import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import { useUiContext } from '../../context/UiContext';

const Layout = () => {
  const { state } = useUiContext();
  const { activeTab } = state;

  return (
    <div className="flex flex-col h-screen bg-black text-right text-gray-100" dir="rtl">
      <Header />
      <MainContent activeTab={activeTab} />
    </div>
  );
};

export default Layout;