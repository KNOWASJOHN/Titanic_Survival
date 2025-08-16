import { TitanicPredictionForm } from "@/components/titanic-prediction-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl text-foreground mb-2 font-airnt-quantum tracking-wide">Titanic Survival Predictor</h1>
            <p className="text-lg font-aquire-light text-muted-foreground max-w-xl mx-auto">
              Enter passenger details to predict survival probability on the RMS Titanic using machine learning
            </p>
          </div>

          {/* Form Section */}
          <TitanicPredictionForm />

          {/* About Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-aquire-bold text-foreground mb-3">About This Model</h2>
            <p className="font-dotmatrix text-muted-foreground leading-relaxed">
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
