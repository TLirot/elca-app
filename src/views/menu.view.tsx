import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Nav, NavLink } from "react-bootstrap";
import { AppRoutesEnum } from "../routes/app.routes.enum";

export class MenuView extends Component {
    render (): ReactNode {
        return (
            <Nav>
                <NavLink>
                    <Link className={"nav-link"} to={AppRoutesEnum.fibonacci}>Fibonacci</Link>
                </NavLink>
                <NavLink>
                    <Link className={"nav-link"} to={AppRoutesEnum.bitcoin}>Exercise 3</Link>
                </NavLink>
            </Nav>
        );
    }
}
