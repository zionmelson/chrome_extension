import React from 'react'
import {Routes, Route,} from 'react-router-dom';
import { Bookmark, Temporary, Signup} from './components'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/thumbs-up" element={<Temporary />} />
      <Route path="/search" element={<Temporary />} />
      <Route path="/settings" element={<Temporary />} />
      <Route path="/bookmark" element={<Bookmark />} />
    </Routes>
  )
}

export default App