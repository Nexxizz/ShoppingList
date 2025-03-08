import { RouteProps, Navigate, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';

export type RouteConfig = RouteProps & {

    path: string;
};

export const routes: RouteConfig[] = [
    {
        path: "/",
        element: <Navigate to="/home" replace />,
        index: true,
    },
    {
        path: "/home",
        element: <HomePage />,
    },

];

const renderRouteMap = (route: RouteConfig) => {
    const { element, ...rest } = route;

    return <Route key={route.path} element = {element} {...rest} />;
};

export const AppRoutes = () => {
    return <Routes>{routes.map(renderRouteMap)}</Routes>;
};