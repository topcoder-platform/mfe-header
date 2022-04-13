import React from "react";

import "./style.scss";

function BreadcrumbItem({ url, name, index}) {
    return (
        <li key={index}>
          <a href={url}> {name} </a>
        </li>
    )
}

const Breadcrumb = ({ breadcrumbItems }) => {
    return (
        <nav className="breadcrumb">
            <ol>
                {breadcrumbItems.map((item, index, array) =>
                    <BreadcrumbItem {...item} index={index + 1} key={index} />
                )}
            </ol>
        </nav>
    )
}

export default Breadcrumb