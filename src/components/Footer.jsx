import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-6xl font-bold mb-8">
          <div className=' z-[-1] text-biggie text-white flex items-end mix-blend-difference'>
                GITGURU
          </div>
          </h2>
          <div className="flex space-x-6 mb-8">
            <a href="https://twitter.com" className="hover:text-ablue transition-colors">
              Preetham
            </a>
            <a href="https://discord.com" className="hover:text-ablue transition-colors">
              Biresh
            </a>
            <a href="https://github.com/re-juvenate" className="hover:text-ablue transition-colors">
              Subrojyoti
            </a>
            <a href="https://github.com/DAOminators" className="hover:text-ablue transition-colors">
                Ankit
            </a>
          </div>
          <div className="text-center">
            <p className="text-gray-400">
              REJUVENATE {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer