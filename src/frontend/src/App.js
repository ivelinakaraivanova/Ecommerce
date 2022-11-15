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
                        <Route path='/product/:id' element={<ProductScreen />} />
                        <Route path='/shipping' element={<ShippingScreen />} />
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
