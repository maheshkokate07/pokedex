import { Link } from 'react-router-dom';
import './App.css';
import CustomRoutes from './routes/CustomRoutes';

function App() {
  return (
    <>
      <Link to={"/"} style={{ textDecoration: 'none' }}>
        <h1 id="pokedex-heading">Pokedex</h1>
      </Link>
      <CustomRoutes />
    </>
  );
}

export default App;