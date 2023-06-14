import React from 'react'
import {Routes, Route,} from 'react-router-dom';
import { Bookmark, Temporary} from './components'

const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Bookmark/>} />
    <Route path="/thumbs-up" element={<Temporary />} />
    <Route path="/search" element={<Temporary />} />
    <Route path="/settings" element={<Temporary />} />
  </Routes>
  )
}

export default App