'use client'
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const router = useRouter();
  return (
    <nav
      className={`fixed top-0 w-full z-50 ${
        scrolled ? 'backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Image src={'/favicon.svg'} alt='logo' width={50} height={50} />
            <span className="text-xl font-bold text-white">SkillsUpgrade</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Features', 'Pricing', 'About'].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={()=>router.push('/workspace')}
            className="hidden hover:scale-105 hover:cursor-pointer md:block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Get Started
          </button>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <button onClick={()=>router.push('/workspace')} className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation