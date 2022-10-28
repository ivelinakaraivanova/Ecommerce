import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CartScreen } from "./screens/CartScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";

function App() {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} />
                        <Route path='/product/:id' element={<ProductScreen />} />
                        <Route path="/cart" element={<CartScreen />} >
                            <Route path=":id" element={<CartScreen />} />
                        </Route>
                        {/* <Route path='/cart/:id?' element={<CartScreen />} /> */}
                    </Routes>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
