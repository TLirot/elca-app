import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { AppRoutesEnum } from "../routes/app.routes.enum";

export class MenuView extends Component {
    render (): ReactNode {
        return (
            <Nav>
                <Link className={"nav-link"} to={AppRoutesEnum.bitcoin}>Bitcoin</Link>
                <Link className={"nav-link"} to={AppRoutesEnum.fibonacci}>Fibonacci</Link>
            </Nav>
        );
    }
}
