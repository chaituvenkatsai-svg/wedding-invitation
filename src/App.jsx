import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Invitation from './pages/Invitation.jsx';

// Pages:
//   /#/            the sealed envelope (first screen for every guest), then the invitation card
//   /#/invitation  same as above (older shared links keep working)
//   /#/home        the full wedding website
// A later phase adds the hidden editor route.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Invitation />} />
      <Route path="/invitation" element={<Invitation />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
