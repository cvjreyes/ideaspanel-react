import React from "react";
import NotificationsSystem, {
  atalhoTheme,
  setUpNotifications,
  useNotifications,
} from "reapop";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";

import Home from "./components/home/Home";
import Login from "./components/authentication/login/Login";
import CheckLogin from "./components/authentication/login/CheckLogin";
import Profile from "./components/profile/Profile";
import NewIdea from "./components/ideas/NewIdea";
import ManageComittee from "./components/ideas/ManageComittee";
import Idea from "./components/idea/Idea";
import EditProfile from "./components/profile/EditProfile";
import NewComittee from "./components/ideas/NewComittee";
import NewComitteeSingleView from "./components/ideas/NewComitteeSingleView";
import ErrorFallback from "./components/general/ErrorFallback";

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
        <BrowserRouter>
          <Routes>
            <Route basename="/ideas_panel" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/idea/:id" element={<Idea />} />
              <Route path="/read_only/:id" element={<Idea readOnly />} />
              <Route path="/edit_idea/:id" element={<NewIdea isEditing />} />
              <Route path="/new_idea" element={<NewIdea />} />
              <Route path="/profile/:user_id/:type" element={<Profile />} />
              <Route
                path="/profile/edit_profile/:user_id"
                element={<EditProfile />}
              />
              <Route path="/comittee" element={<NewComittee />} />
              <Route path="/comittee/manage" element={<ManageComittee />} />
              <Route path="/comittee/:id" element={<NewComitteeSingleView />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/login/:user_id" element={<CheckLogin />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
