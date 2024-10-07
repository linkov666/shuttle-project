import React from 'react'

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-1 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to ShuttleEase</h1>
        <p className="text-xl mb-8">Your comfortable ride through Taghazout and Agadir</p>
        <a href="#booking" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors">
          Book Your Shuttle
        </a>
      </div>
    </section>
  )
}

export default Hero