import React from "react";
import { Route, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "./context/AuthContext";
// import PublicRoute from "./router/PublicRoute";
// import PrivateRoute from "./router/PrivateRoute";

import Home from "./components/home";
import Login from "./components/login";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router base="/ideas_panel">
          <AuthProvider>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
}
