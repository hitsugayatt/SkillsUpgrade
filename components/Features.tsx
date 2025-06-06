import { BookCopy, Globe, Rocket, Shield, Smartphone, Zap } from "lucide-react"
const Features = () => {
  const features = [
    {
      icon: <BookCopy className="w-8 h-8" />,
      title: "AI-Powered Course Creation",
      description: "Leverage AI to automatically structure, generate, and enhance educational content tailored to your goals and expertise."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Learning Hub",
      description: "Connect with a global community — enroll on user-generated courses from anywhere around the world."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Premium pack",
      description: "Generate unlimited AI-curated courses with rich content by upgrading to premium."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "End-to-end encrypted transactions and strict privacy standards keep your activity and data safe."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Friendly",
      description: "Enjoy a seamless experience on all devices with our responsive web design."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Learning",
      description: "Enjoy a snappy experience with fast course generation, minimal loading times, and seamless navigation across the platform"
    }
  ]

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to improve your learning and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-slate-800/50 backdrop-blur-sm p-8 hover:scale-105 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features