import React, { FC, ReactElement, ReactNode, useMemo } from "react";

export interface CardProps {
    children: ReactNode,
    title: ReactNode,
}

export const Card: FC<CardProps> = (props): ReactElement => {
    const { children, title } = props;

    const cardTitle = useMemo(() => {
        return title ? (
            <div className={"card-title"}>
                {title}
            </div>
        ) : null
    }, [ title ])

    return (
        <div className={"card"}>
            <div className={"card-body"}>
                {cardTitle}
                {children}
            </div>
        </div>
    )
}
