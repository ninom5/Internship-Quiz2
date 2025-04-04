import { RouteType } from "types/routeType";

export const routes: RouteType = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  QUIZ_PAGE: "/quiz/:quizId",
  QUIZZES_PAGE: "/quizzes",
  ADMIN: "/admin",
  NOT_FOUND: "*",
};
