'use client'
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

const Pricing = () => {
  const router = useRouter();
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "For trying out the product",
      features: [
        "AI course generation",
        "Course Banner Images",
        "Email support",
        "Only 1 course generation"
      ],
      popular: false
    },
    {
      name: "Starter",
      price: "$7.99",
      period: "/month",
      description: "If you're a bit serious",
      features: [
        "AI course generation",
        "Course Banner Images",
        "Email support",
        "Multiple course generation"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "$12.99",
      period: "/month",
      description: "If you're very serious about learning",
      features: [
        "AI course generation",
        "Course Banner Images",
        "Email support",
        "24/7 dedicated support",
        "White-label solution",
        "Advanced security features"
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
        >
          <h2 className="text-4xl md:text-5xl text-center font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-center text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your team. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative  bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border transition-all ${
                plan.popular 
                  ? 'border-blue-500 scale-105' 
                  : 'border-slate-700 hover:border-blue-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button onClick={()=>router.push('/workspace/billing')}
                className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Pricing