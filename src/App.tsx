import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { AuthProvider } from './utils/Auth';
import PrivateRoute from './utils/PrivateRoute';
import Post from './pages/Posts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/posts" component={Post} />
      </Router>
    </AuthProvider>
  );
}

export default App;
