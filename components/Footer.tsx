import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image src={'/favicon.svg'} alt='logo' width={50} height={50} />
              <span className="text-xl font-bold text-white">SkillsUpgrade</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Experience personalized learning powered by cutting-edge AI.
              Adapt, evolve, and accelerate your journey to expertise with intelligent guidance every step of the way.
            </p>
            <div className="flex space-x-4">
                <a
                  href="https://x.com/sleepypritish"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://www.linkedin.com/in/pritish25/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/hitsugayatt"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Security', 'Integrations'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 SkillsUpgrade. All rights reserved.
          </p>
          <h1>
          Designed and Built with ❤️ by{' '}
          <span className="bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-semibold">
            <a href="https://x.com/sleepypritish" target='_blank'>Pritish Jadon</a>
          </span>
        </h1>
        </div>
      </div>
    </footer>
  )
}

export default Footer
