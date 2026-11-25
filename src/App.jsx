import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Invitation from './pages/Invitation.jsx';

// Pages:
//   /#/            the website homepage
//   /#/invitation  the envelope + invitation card (the link to share with family)
// A later phase adds the hidden editor route.
export default function App() {
  return (
    <Routes>
      <Route path="/invitation" element={<Invitation />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
