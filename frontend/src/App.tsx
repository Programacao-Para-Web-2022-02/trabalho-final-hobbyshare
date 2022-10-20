import Home from "./pages/pagina-inicial";
import { Login } from "./pages/login";
import { Registrar } from "./pages/registrar";
import { Perfil } from "./pages/perfil";
import { Feed } from "./pages/feed";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./contexts/AuthContext"
import { Header } from "./components/header";
import { Footer } from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
        <Footer></Footer>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
