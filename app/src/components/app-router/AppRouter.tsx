import React, {FC} from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import MainPage from '../pages/MainPage';

const AppRouter: FC = () => {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                {routes.map(({path, Page}) =>
                    <Route key={path} path={path} element={<Page />} />
                )}
            </Routes>
        </HashRouter>
    );
};

export default AppRouter;