'use client'
import { ArrowRight, ChevronDown } from "lucide-react"
import HeroWave from "./dynamic-wave-canvas-background"
import { useRouter } from "next/navigation"

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroWave />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="max-w-4xl mx-auto"
        >
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Master Skills with
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Artificial Intelligence</span>
          </h1>
          
          <p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Experience personalized learning powered by cutting-edge AI. 
            Adapt, evolve, and accelerate your journey to expertise with intelligent guidance every step of the way.
          </p>
          
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            
            <button onClick={()=>router.push('/workspace')} className="bg-gradient-to-r hover:scale-105 hover:cursor-pointer from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2 shadow-2xl">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  )
}

export default Hero