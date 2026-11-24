import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';

// Phase 1: only the Home page exists.
// Later phases add the invitation experience and the hidden editor as extra routes here.
export default function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
