import "./Nav-Style.css"
import logo from "./redizzLogo.png"

export const Nav = () => {
    return (
        <>
            <div className="barra_nav">
            <img src={logo} alt="logo" id="logo"/>
                <ul className="barra_nav_lista">
                    <li className="barra_nav_item"><a href="customers">Customers</a></li>
                    <li className="barra_nav_item"><a href="sales">Sales</a></li>
                    <li className="barra_nav_item"><a href="products">Products</a></li>              
                </ul>
            </div>
        </>
    )
}