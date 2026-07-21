import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

export function Header() {
    
    const [showDropdown, setShowdropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickCustomDropDown = () => {
        setShowdropdown(!showDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowdropdown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">TicketFlow</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                            <li className="nav-item dropdown" ref={dropdownRef}>
                                <a className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={handleClickCustomDropDown}
                                >Custom Dropdown</a>
                                <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/login">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}