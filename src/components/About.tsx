import React from 'react'

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">About ShuttleEase</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-6">
            ShuttleEase is your reliable transportation partner in the Taghazout and Agadir region. We provide comfortable and convenient shuttle services, connecting you to popular destinations and hidden gems alike.
          </p>
          <p className="text-lg mb-6">
            Our mission is to make your travel experience as smooth and enjoyable as possible. With our modern fleet and professional drivers, you can sit back, relax, and enjoy the beautiful Moroccan scenery.
          </p>
          <p className="text-lg">
            Whether you're a surfer heading to the best spots, a tourist exploring the local attractions, or a resident commuting between towns, ShuttleEase has got you covered. Book your ride today and experience the ease of travel with us!
          </p>
        </div>
      </div>
    </section>
  )
}

export default About