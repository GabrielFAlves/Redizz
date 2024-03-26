import "./Nav-Style.css"
import logo from "./redizzLogo.png"
import { Link } from 'react-router-dom';

export const Nav = () => {
    return (
        <>
            <div className="barra_nav">
            <img src={logo} alt="logo" id="logo"/>
                <ul className="barra_nav_lista">
                    <li className="barra_nav_item"><Link to="/Customers">Customers</Link></li>
                    <li className="barra_nav_item"><Link to="/Sales">Sales</Link></li>
                    <li className="barra_nav_item"><Link to="/Products">Products</Link></li>              
                </ul>
            </div>
        </>
    )
}