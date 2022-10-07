import { Route, Routes } from "react-router-dom";
import { FullCard } from "./components/FullCard";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<FullCard />} />
      </Routes>
    </div>
  );
}

export default App;
