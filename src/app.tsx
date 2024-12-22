// /src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from './app/gallery/page';  // Main page with cards
import GalleryPage from './app/(landing)/Gallery'; // Gallery page showing images

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />  {/* Main page with the cards */}
        <Route path="/gallery" element={<GalleryPage />} />  {/* Gallery page with images */}
      </Routes>
    </Router>
  );
}

export default App;
