import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailView from "./views/projects/ProjectDetailView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeViex";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import NotFound from "./views/404/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/projects" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailView />} />
          <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />
          <Route path="/projects/:projectId/edit" element={<EditProjectView />} />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />}/>
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>
        
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView/>} />
          <Route path="/auth/confirm-account" element={<ConfirmAccountView/>} />
          <Route path="/auth/new-code" element={<RequestNewCodeView/>} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordView/>} />
          <Route path="/auth/new-password" element={<NewPasswordView/>} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/404" element={<NotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
