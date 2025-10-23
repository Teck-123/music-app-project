import React, { createContext, useState, useRef, useEffect, useCallback } from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const createAudioElement = () => {
  const audio = new Audio();
  
  
  if (isSafari || isIOS) {
    audio.preload = 'auto';
    audio.controls = false;
  }
  
  return audio;
};

export const AudioContext = createContext();

const UI_UPDATE_INTERVAL = 250;

export const AudioProvider = ({ children }) => {
  // Track state
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);  
  const [volume, setVolume] = useState(isIOS ? 1.0 : 0.7); 
  const [duration, setDuration] = useState(0);  
  const [currentTime, setCurrentTime] = useState(0); 
  
  // Playback history 
  const [songHistory, setSongHistory] = useState([]);
  
  // Audio object
  const audioRef = useRef(createAudioElement());
  
  // Optimization 
  const lastUpdateRef = useRef(0);
  
  // Initialize audio settings & event listeners
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
    
  
    const handleTimeUpdate = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current > UI_UPDATE_INTERVAL) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
        lastUpdateRef.current = now;
      }
    };
    
    
    const handleLoadedMetadata = () => {

      const audioDuration = isFinite(audio.duration) ? audio.duration : 30;
      setDuration(audioDuration);
    };
    
    const handleEnded = () => {
      console.log('Track ended:', currentSong?.title);
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      
    };
  
    const handleStalled = () => {
      if (isPlaying && audio.currentTime > 0) {
        console.log('Playback stalled, attempting recovery...');
        audio.currentTime = audio.currentTime; 
        audio.play().catch(err => console.warn('Recovery failed:', err));
      }
    };
    
    // Add event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('stalled', handleStalled);
    
    // Cleanup 
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('stalled', handleStalled);
    };
  }, [volume, isPlaying, currentSong]);
  
  const playSong = useCallback((song) => {
    try {
      // Handle missing song data gracefully
      if (!song) {
        console.warn('playSong called with null/undefined song');
        return;
      }
      
      // Handle missing preview URL 
      if (!song.preview) {
        console.warn(`Song "${song.title}" has no preview URL`);
        return;
      }
      
      const audio = audioRef.current;
      const isNewSong = !currentSong || currentSong.id !== song.id;
      
      if (isNewSong) {
        // Save previous song to history
        if (currentSong) {
          setSongHistory(prev => {
            // Keep only last 10 songs in history
            const newHistory = [currentSong, ...prev.slice(0, 9)];
            // Remove duplicates
            return newHistory.filter(
              (s, i) => newHistory.findIndex(h => h.id === s.id) === i
            );
          });
        }
        
        // Load new song
        audio.src = song.preview;
        audio.load(); 
        
        // Reset state
        setCurrentSong(song);
        setProgress(0);
        setCurrentTime(0);
        lastUpdateRef.current = Date.now();
      }
    
      audio.play().catch(err => {
        console.error(`Failed to play "${song.title}":`, err.message);
        setIsPlaying(false);
      });
      
      setIsPlaying(true);
    } catch (error) {
      console.error('Unexpected error in playSong:', error);
      setIsPlaying(false);
    }
  }, [currentSong]);
  
  // Pause playback 
  const pauseSong = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseSong();
    } else if (currentSong) {
      playSong(currentSong);
    }
  }, [isPlaying, currentSong, pauseSong, playSong]);
  
  const togglePlayPause = togglePlay;
  
  const setAudioVolume = useCallback((value) => {
    
    const newVolume = Math.max(0, Math.min(1, value));
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('preferred_volume', newVolume.toString());
    } catch (e) {}
  }, [])

  const seekToPosition = useCallback((percent) => {
    if (!duration) return;
    
    const newTime = (percent / 100) * duration;
    
    try {
      // Set the time on the audio element
      audioRef.current.currentTime = newTime;
      
      setCurrentTime(newTime);
      setProgress(percent);
      lastUpdateRef.current = Date.now();
    } catch (e) {
      console.error('Error seeking:', e);
    }
  }, [duration]);
  
  const getAudioElement = useCallback(() => {
    return audioRef.current;
  }, []);
  
  useEffect(() => {
    if (isIOS) return;
    
    try {
      const savedVolume = localStorage.getItem('preferred_volume');
      if (savedVolume !== null) {
        const parsedVolume = parseFloat(savedVolume);
        if (!isNaN(parsedVolume)) {
          setAudioVolume(parsedVolume);
        }
      }
    } catch (e) {
    }
  }, [setAudioVolume]);

  return (
    <AudioContext.Provider 
      value={{
        // Track data
        currentSong,
        songHistory,
        
        // Playback state
        isPlaying,
        progress,
        volume,
        duration,
        currentTime,
        
        // Control functions
        playSong,
        pauseSong,
        togglePlay,
        togglePlayPause,
        setAudioVolume,
        seekToPosition,
        getAudioElement,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};