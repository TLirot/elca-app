import React, { FC } from 'react';
import './App.css';
import { Card } from "./components/layout/card";
import { MenuView } from "./views/menu.view";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { BitcoinView } from "./views/bitcoin/bitcoin.view";
import { FibonacciView } from "./views/fibonacci/fibonacci.view";
import { AppRoutesEnum } from "./routes/app.routes.enum";

const App: FC = () => {
    return (
        <Card title={"ELCA APP - TORIL CASTILLO, MIGUEL"}>
            <BrowserRouter basename={"/"}>
                <MenuView/>
                <Switch>
                    <Route path={AppRoutesEnum.fibonacci}>
                        <FibonacciView/>
                    </Route>
                    <Route path={AppRoutesEnum.bitcoin}>
                        <BitcoinView/>
                    </Route>
                </Switch>
                <Redirect to={AppRoutesEnum.bitcoin}/>
            </BrowserRouter>
        </Card>
    );
}

export default App;
