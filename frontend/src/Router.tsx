import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import {
  HomePage,
  QuizPage,
  NotFoundPage,
  QuizzesPage,
  RegisterPage,
  LoginPage,
} from "./pages";
import { HeaderLayout } from "@layouts/index";
import { NavigationLayout } from "@layouts/index";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path={routes.HOME} element={<HomePage />} />
          <Route path={routes.REGISTER} element={<RegisterPage />} />
          <Route path={routes.LOGIN} element={<LoginPage />} />
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
