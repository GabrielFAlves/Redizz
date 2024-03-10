import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import { Customers } from '../pages/Customers'
import { Products } from '../pages/Products'
import { Sales } from '../pages/Sales'
import { MasterPage } from '../pages/MasterPage'

export const Router = () => {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MasterPage/>}>
                    <Route path="/" element={<Customers/>}/>
                    <Route path="/Products" element={<Products/>}/>
                    <Route path="/Sales" element={<Sales/>}/>
                    <Route path="/Customers" element={<Customers/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}