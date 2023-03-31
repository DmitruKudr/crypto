import React, {FC} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "./routes";

const AppRouter: FC = () => {
    return (
        <BrowserRouter basename='app'>
            <Routes>
                {routes.map(({path, Page}) =>
                    <Route key={path} path={path} element={<Page />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;