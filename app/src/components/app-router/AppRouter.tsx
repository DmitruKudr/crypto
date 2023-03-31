import React, {FC} from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import MainPage from '../pages/MainPage';

const AppRouter: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/">
                {routes.map(({path, Page}) =>
                    <Route key={path} path={path} element={<Page />} />
                )}
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default AppRouter;