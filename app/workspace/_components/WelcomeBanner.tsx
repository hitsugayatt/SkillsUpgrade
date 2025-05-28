
function WelcomeBanner (){
  return (
    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <h2 className="font-black text-4xl text-white mb-2 leading-tight">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              SkillsUpgrade
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full"></div>
        <p className="text-white text-md mt-3">Your favorite platform to create courses and roadmaps.</p>
    </div>
  )
}

export default WelcomeBanner
