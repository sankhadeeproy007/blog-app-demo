import React from 'react';
import Amplify from 'aws-amplify';

import config from './aws-exports';
import AuthProvider from './src/AuthContext';
import AppNavigation from './src/AppNavigation';
Amplify.configure(config);

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
