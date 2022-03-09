import React from "react"
import sun from "./assets/sun.png"
import axios from "axios"
import "./App.css"

function App() {
  const SUN_RADIUS = 695508 //estimate from google
  const [pi, updatePi] = React.useState(null)

  React.useEffect(() => {
    axios.get("http://localhost:5001/pi-calculator-16fed/us-central1/getPi").then(({ data }) => {
      if (data) {
        updatePi(data)
      }
    })
  }, [])

  const calcCircumferenceString = () => {
    if (!pi) return null
    const circumference = Math.round(2 * pi.value * SUN_RADIUS)
    return circumference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="App">
      <div className="background-container">
        <img src={sun} alt="logo" />
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>

        <section className="w-full pt-20">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center justify-center">
              <div className="text-gray-300 text-3xl">Naluri Space Project</div>
              <div className="text-gray-300">Sun's circumference estimated at: {calcCircumferenceString()}km</div>
              <div className="text-gray-400 text-xs mt-4">PI last estimated on {pi?.latest}</div>
              <div className="text-gray-400 text-xs">
                <i>
                  {pi?.timeTaken}ms to estimate Pi at {pi?.digits} digits
                </i>
              </div>
              <div className="text-gray-300 mt-10">Current Pi value</div>
              <div className="text-gray-500 text-xs whitespace-normal break-all max-h-96 overflow-auto">
                {pi?.value}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
