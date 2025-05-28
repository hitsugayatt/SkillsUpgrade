'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Zap, BookOpen, Target } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-100, -200, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: `${10 + i * 7}%`,
              bottom: '0%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 md:px-20 py-12 md:py-24 flex flex-col justify-center items-center min-h-screen">
        
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/30 rounded-full text-sm shadow-lg">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-semibold">
              SkillsUpgrade: AI-Powered Learning Platform
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-7xl font-black text-center leading-tight mb-6"
        >
          <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
            Master Skills with
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            Artificial Intelligence
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-xl text-gray-200 text-center max-w-3xl mb-12 leading-relaxed"
        >
          Experience personalized learning powered by cutting-edge AI. Adapt, evolve, and accelerate your journey to expertise with intelligent guidance every step of the way.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => router.push('/workspace')}
              className="group bg-gradient-to-r hover:cursor-pointer from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-10 py-4 text-lg rounded-lg shadow-2xl hover:shadow-purple-500 border-0 transition-all duration-300 flex items-center gap-2 font-semibold"
            >
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full"
        >
          {[
            { icon: Brain, title: "AI-Powered", desc: "Personalized learning paths" },
            { icon: Target, title: "Goal-Oriented", desc: "Track your progress" },
            { icon: BookOpen, title: "Interactive", desc: "Engaging content" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-white/3 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 shadow-lg"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-purple-300" />
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Illustration/Visual Element */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-20 relative"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(168, 85, 247, 0.4)",
                  "0 0 0 20px rgba(168, 85, 247, 0)",
                  "0 0 0 0 rgba(168, 85, 247, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl"
            >
              <div className="text-6xl md:text-8xl">🧠</div>
            </motion.div>
            
            {/* Floating elements around the main visual */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center"
            >
              <Target className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16 text-sm text-gray-400 text-center"
        >
          Join thousands of learners already transforming their skills
        </motion.p>
      </div>
    </main>
  )
}