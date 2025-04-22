import React from 'react';
import { MessageProvider } from './context/MessageContext';
import { UiProvider } from './context/UiContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <AuthProvider>
      <UiProvider>
        <MessageProvider>
          <Layout />
        </MessageProvider>
      </UiProvider>
    </AuthProvider>
  );
};

export default App;