import React from "react";

function Navigation() {
    return (
        <nav className="d-flex justify-content-end align-items-center px-3">
            <div className="dropdown">
                <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Đức Nguyễn
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                        <a className="dropdown-item" href="#">
                            Action
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Another action
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Something else here
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;