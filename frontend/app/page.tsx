import { TitanicPredictionForm } from "@/components/titanic-prediction-form"
import VantaBackground from '@/components/VantaBackground'

export default function Home() {
  return (
    <div className="relative min-h-screen font-test overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <VantaBackground />
      </div>

      {/* Foreground Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 bg-black/40 p-4 sm:p-8 backdrop-blur-lg border border-black/10 shadow-xl rounded-xl">
          {/* Header Section */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 font-airnt-quantum tracking-wide text-shadow-lg">
              Titanic Survival Predictor
            </h1>
            <p className="text-base sm:text-lg font-aquire-light text-white text-muted-foreground max-w-xl mx-auto text-shadow-lg">
              Enter passenger details to predict survival probability on the RMS Titanic using machine learning
            </p>
          </div>

          {/* Form Section */}
          <TitanicPredictionForm />

          {/* About Section */}
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-aquire-bold text-foreground mb-2 sm:mb-3">About This Model</h2>
            <p className="text-sm sm:text-base font-dotmatrix text-muted-foreground leading-relaxed">
              This prediction system connects to a trained machine learning model deployed on Railway. The model uses
              advanced algorithms trained on historical Titanic passenger data to predict survival probability. Results
              represent statistical analysis of passenger characteristics and historical survival patterns from the 1912
              tragedy.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
