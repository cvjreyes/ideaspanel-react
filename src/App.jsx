import React from "react";
import { Redirect, Route, Router, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "react-query";
import NotificationsSystem, {
  atalhoTheme,
  setUpNotifications,
  useNotifications,
} from "reapop";

import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";

import Home from "./components/home/Home";
import Login from "./components/authentication/login/Login";
import CheckLogin from "./components/authentication/login/CheckLogin";
import Profile from "./components/profile/Profile";
import Navbar from "./components/nav/Navbar";
import NewPost from "./components/posts/NewPost";
import Footer from "./components/nav/Footer";
import Idea from "./components/idea/Idea";

const queryClient = new QueryClient();

export default function App() {
  const { notifications, dismissNotification } = useNotifications();

  // run this function when your application starts before creating any notifications
  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 3000,
    },
  });

  return (
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
        <PrivateRoute component={Navbar} />
        <Router base="/ideas_panel">
          <Switch>
            <Route path="/">{() => <PrivateRoute component={Home} />}</Route>
            <Route path="/idea/:id">
              {() => <PrivateRoute component={Idea} />}
            </Route>
            <Route path="/login">
              {() => <PublicRoute component={Login} />}
            </Route>
            <Route path="/log_in/:user_id/:token">
              {() => <PublicRoute component={CheckLogin} />}
            </Route>
            <Route path="/profile/:user_id">
              {() => <PrivateRoute component={Profile} />}
            </Route>
            <Route path="/new_post">
              {() => <PrivateRoute component={NewPost} />}
            </Route>
            <Route>{() => <Redirect to="/" />}</Route>
          </Switch>
        </Router>
        <PrivateRoute component={Footer} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
