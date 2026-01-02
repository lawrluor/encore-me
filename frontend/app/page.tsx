'use client'

import { AuthProvider } from './context/AuthProvider';
import Navigator from './components/Navigator';

const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default App;