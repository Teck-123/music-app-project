import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import Home from './pages/Home';
import Library from './pages/Library';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import Signup from './pages/Signup';
import Song from './pages/Song';

function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <Router>
          <div className="min-h-screen bg-gray-300">
            <Navbar />
            <main className="container mx-auto p-5">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/library" element={<Library/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/playlist/:id" element={<Playlist/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/song/:id" element={<Song/>} />
              </Routes>
            </main>
            <AudioPlayer />
          </div>
        </Router>
      </AudioProvider>
    </AuthProvider>
  );
}

export default App;