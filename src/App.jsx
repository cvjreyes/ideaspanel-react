import React from "react";
import { Redirect, Route, Router, Switch, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "react-query";
import NotificationsSystem, {
  atalhoTheme,
  setUpNotifications,
  useNotifications,
} from "reapop";
import { ErrorBoundary } from "react-error-boundary";

import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";

import Home from "./components/home/Home";
import Login from "./components/authentication/login/Login";
import CheckLogin from "./components/authentication/login/CheckLogin";
import Profile from "./components/profile/Profile";
import Navbar from "./components/nav/Navbar";
import NewIdea from "./components/ideas/NewIdea";
import Footer from "./components/nav/Footer";
import Comittee from "./components/ideas/Comittee";
import ManageComittee from "./components/ideas/ManageComittee";
import EditIdea from "./components/profile/EditIdea";
import Idea from "./components/idea/Idea";
import IdeaNoComments from "./components/idea/IdeaNoComments";
import EditProfile from "./components/profile/EditProfile";
import NewComittee from "./components/ideas/NewComittee";
import NewComitteeSingleView from "./components/ideas/NewComitteeSingleView";
import ErrorFallback from "./components/general/ErrorFallback";

const queryClient = new QueryClient();

export default function App() {
  const { notifications, dismissNotification } = useNotifications();
  const [__, navigate] = useLocation();

  // run this function when your application starts before creating any notifications
  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 3000,
    },
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
        navigate("/");
        console.log(details);
      }}
    >
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
              <Route path="/profile/:user_id/:type">
                {() => <PrivateRoute component={Profile} />}
              </Route>
              <Route path="/profile/edit_profile/:user_id">
                {() => <PrivateRoute component={EditProfile} />}
              </Route>
              <Route path="/edit_idea/:idea_id">
                {() => <PrivateRoute component={EditIdea} />}
              </Route>
              <Route path="/read_only/:idea_id">
                {() => <PrivateRoute component={IdeaNoComments} />}
              </Route>
              <Route path="/new_idea">
                {() => <PrivateRoute component={NewIdea} />}
              </Route>
              <Route path="/comittee">
                {() => <PrivateRoute component={NewComittee} />}
              </Route>
              <Route path="/comittee/manage">
                {() => <PrivateRoute component={ManageComittee} />}
              </Route>
              <Route path="/comittee/:idea_id">
                {() => <PrivateRoute component={NewComitteeSingleView} />}
              </Route>
              <Route>{() => <Redirect to="/" />}</Route>
            </Switch>
          </Router>
          <PrivateRoute component={Footer} />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
