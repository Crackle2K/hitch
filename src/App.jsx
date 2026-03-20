import { useState, useEffect } from 'react'
import MapComponent from './components/MapComponent'

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);

  return (
    <>
      <h1>Hitch</h1>
      <MapComponent locations={locations} />
    </>
  )
}

export default App
