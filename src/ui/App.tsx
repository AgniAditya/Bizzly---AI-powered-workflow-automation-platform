import Home from './components/Home'

function App() {

  window.electron.greet('Bizzly').then((response) => {
    console.log(response); // Should log "Hello, Bizzly!"
  });

  return (
    <div className="App bg-[#222] h-screen px-10 text-white">
      <Home />
    </div>
  )
}

export default App