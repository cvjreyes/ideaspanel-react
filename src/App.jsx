import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NotificationsSystem, {
  atalhoTheme,
  setUpNotifications,
  useNotifications,
} from "reapop";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";

import CheckLogin from "./components/authentication/login/CheckLogin";
import Login from "./components/authentication/login/Login";
import ErrorFallback from "./components/general/ErrorFallback";
import Home from "./components/home/Home";
import Idea from "./components/idea/Idea";
import NewComittee from "./components/ideas/Comittee";
import NewComitteeSingleView from "./components/ideas/ComitteeVote";
import { IdeaForm } from "./components/ideas/IdeaForm";
import ManageComittee from "./components/ideas/ManageComittee";
import Profile from "./components/profile/Profile";

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
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      <AuthProvider>
        <NotificationsSystem
          notifications={notifications}
          dismissNotification={(id) => dismissNotification(id)}
          theme={atalhoTheme}
        />
        <Router basename={import.meta.env.VITE_BASENAME}>
          <Routes>
            <Route
              basename={import.meta.env.VITE_BASENAME}
              element={<PrivateRoute />}
            >
              <Route path="/" element={<Home />} />
              <Route path="/idea/:id" element={<Idea />} />
              <Route path="/read_only/:id" element={<Idea readOnly />} />
              <Route path="/edit_idea/:id" element={<IdeaForm isEditing />} />
              <Route path="/new_idea" element={<IdeaForm />} />
              <Route path="/profile/:user_id/:type" element={<Profile />} />
              {/*  <Route
                path="/profile/edit_profile/:user_id"
                element={<EditProfile />}
              /> */}
              <Route path="/comittee" element={<NewComittee />} />
              <Route path="/comittee/manage" element={<ManageComittee />} />
              <Route path="/comittee/:id" element={<NewComitteeSingleView />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/log_in/:user_id/:token" element={<CheckLogin />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
