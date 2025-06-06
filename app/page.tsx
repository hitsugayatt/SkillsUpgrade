import React from 'react'
import Features from '@/components/Features'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'

const page = () => {
  return (
    <div className="bg-slate-900 text-white">
      <Navigation />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  )
}

export default page