import React, { useState } from 'react';
import Login from './componentes/pages/login';
import Menu from './componentes/Menu';


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Menu />;
  }

  return <Login onLogin={handleLogin} />;
};
export default App;