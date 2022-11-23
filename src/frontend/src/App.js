import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CartScreen } from "./screens/CartScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ShippingScreen } from "./screens/ShippingScreen";
import { PaymentScreen } from "./screens/PaymentScreen";
import { PlaceOrderScreen } from "./screens/PlaceOrderScreen";
import { OrderScreen } from "./screens/OrderScreen";
import { UserListScreen } from "./screens/UserListScreen";

function App() {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} />
                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route path='/profile' element={<ProfileScreen />} />
                        <Route path='/admin/userlist' element={<UserListScreen />} />
                        <Route path='/shipping' element={<ShippingScreen />} />
                        <Route path='/payment' element={<PaymentScreen />} />
                        <Route path='/placeorder' element={<PlaceOrderScreen />} />
                        <Route path='/order/:id' element={<OrderScreen />} />
                        <Route path='/product/:id' element={<ProductScreen />} />
                        <Route path="/cart" element={<CartScreen />} >
                            <Route path=":id" element={<CartScreen />} />
                        </Route>
                    </Routes>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
