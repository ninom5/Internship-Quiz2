import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import {
  HomePage,
  QuizPage,
  NotFoundPage,
  QuizzesPage,
  RegisterPage,
  LoginPage,
  AdminPage,
} from "./pages";
import { HeaderLayout } from "@layouts/index";
import { NavigationLayout } from "@layouts/index";
import { AdminRoute } from "@routes/adminRoute";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path={routes.HOME} element={<HomePage />} />
          <Route path={routes.REGISTER} element={<RegisterPage />} />
          <Route path={routes.LOGIN} element={<LoginPage />} />

          <Route element={<AdminRoute />}>
            <Route path={routes.ADMIN} element={<AdminPage />} />
          </Route>

          <Route element={<NavigationLayout />}>
            <Route path={routes.QUIZ_PAGE} element={<QuizPage />} />
            <Route path={routes.QUIZZES_PAGE} element={<QuizzesPage />} />
          </Route>

          <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
