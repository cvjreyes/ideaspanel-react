import React from "react";
import { Route, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "react-query";
import NotificationsSystem, {
  atalhoTheme,
  useNotifications,
  setUpNotifications,
} from "reapop";

import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";

import Home from "./components/home";
import Login from "./components/login";

const queryClient = new QueryClient();

export default function App() {
  const { notifications, dismissNotification } = useNotifications();

  // run this function when your application starts before creating any notifications
  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 2000
    },
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <NotificationsSystem
              // 2. Pass the notifications you want Reapop to display.
              notifications={notifications}
              // 3. Pass the function used to dismiss a notification.
              dismissNotification={(id) => dismissNotification(id)}
              // 4. Pass a builtIn theme or a custom theme.
              theme={atalhoTheme}
            />
            <Router base="/ideas_panel">
              <Route path="/">{() => <PrivateRoute component={Home} />}</Route>
              <Route path="/login">
                {() => <PublicRoute component={Login} />}
              </Route>
              <Route path="/*"> {() => <Redirect to="/" />}</Route>
            </Router>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}
