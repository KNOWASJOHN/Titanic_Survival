"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type FormData = {
  Pclass: string
  Sex: string
  Age: string
  SibSp: string
  Parch: string
  Fare: string
  Embarked: string
}

type PredictionResult = {
  prediction: number
  probability: number
}

export function TitanicPredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    Pclass: "",
    Sex: "",
    Age: "",
    SibSp: "",
    Parch: "",
    Fare: "",
    Embarked: "",
  })

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.Pclass) errors.Pclass = "Passenger class is required"
    if (!formData.Sex) errors.Sex = "Gender is required"
    else if (!["0", "1"].includes(formData.Sex)) {
      errors.Sex = "Gender must be 0 (Male) or 1 (Female)"
    }
    if (!formData.Age) errors.Age = "Age is required"
    else if (isNaN(Number(formData.Age)) || Number(formData.Age) < 0 || Number(formData.Age) > 120) {
      errors.Age = "Please enter a valid age (0-120)"
    }
    if (!formData.SibSp) errors.SibSp = "Number of siblings/spouses is required"
    else if (isNaN(Number(formData.SibSp)) || Number(formData.SibSp) < 0) {
      errors.SibSp = "Please enter a valid number (0 or greater)"
    }
    if (!formData.Parch) errors.Parch = "Number of parents/children is required"
    else if (isNaN(Number(formData.Parch)) || Number(formData.Parch) < 0) {
      errors.Parch = "Please enter a valid number (0 or greater)"
    }
    if (!formData.Fare) errors.Fare = "Fare is required"
    else if (isNaN(Number(formData.Fare)) || Number(formData.Fare) < 0) {
      errors.Fare = "Please enter a valid fare amount"
    }
    if (!formData.Embarked) errors.Embarked = "Port of embarkation is required"
    else if (!["0", "1", "2"].includes(formData.Embarked)) {
      errors.Embarked = "Port must be 0 (S), 1 (C), or 2 (Q)"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const payload = {
        Pclass: parseInt(formData.Pclass),
        Sex: parseInt(formData.Sex),
        Age: parseFloat(formData.Age),
        SibSp: parseInt(formData.SibSp),
        Parch: parseInt(formData.Parch),
        Fare: parseFloat(formData.Fare),
        Embarked: parseInt(formData.Embarked),
      }

      console.log("[v0] Sending prediction request:", payload)

      const response = await fetch("https://titanicsurvival-production.up.railway.app/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Prediction failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json()
      console.log("[v0] Prediction response:", data)

      setResult(data)
    } catch (err) {
      console.error("[v0] Prediction error:", err)
      setError(err instanceof Error ? err.message : "Failed to get prediction. Please try again.")
    } finally {
      setIsLoading(false)
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const getSurvivalMessage = (prediction: number, probability?: number) => {
    // API returns probability as percentage (0-100), convert to decimal (0-1)
    const safeProbability = probability ?? 50;
  
    if (prediction === 1) {
      return {
        title: "Likely to Survive",
        description: `Based on the passenger information, there is a ${probability?.toFixed(1) ?? 50.0}% chance of surviving.`,
        icon: CheckCircle,
        variant: "default" as const,
      }
    } else if(prediction === 0) {
      return {
        title: "Unlikely to Survive",
        description: `Based on the passenger information, there is a ${probability ? (100 - probability).toFixed(1) : 50.0}% chance of not surviving.`,
        icon: AlertTriangle,
        variant: "destructive" as const,
      }
    } else {
      // Default case for unexpected prediction values
      return {
        title: "Unknown Prediction",
        description: "Unable to determine survival probability",
        icon: AlertTriangle,
        variant: "destructive" as const,
      }
    }
  }
  

  return (
    <div className="space-y-6 opacity-90 backdrop-blur-lg border border-black/10 shadow-xl rounded-xl">
      <Card>
        <CardHeader>
          <CardTitle className="font-aquire-bold text-3xl">Passenger Information</CardTitle>
          <CardDescription className="font-creato-thin tracking-wide text-sm">Enter passenger details and click predict to see survival probability</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-aquire-light tracking-wide">
              {/* Passenger Class */}
              <div className="space-y-2">
                <Label htmlFor="pclass">Passenger Class</Label>
                <Select value={formData.Pclass} onValueChange={(value) => handleInputChange("Pclass", value)}>
                  <SelectTrigger className={cn(validationErrors.Pclass && "border-destructive")}>
                    <SelectValue placeholder="3rd Class" />
                  </SelectTrigger>
                  <SelectContent className="font-aquire-light">
                    <SelectItem value="1">1st Class</SelectItem>
                    <SelectItem value="2">2nd Class</SelectItem>
                    <SelectItem value="3">3rd Class</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.Pclass && <p className="text-sm text-destructive">{validationErrors.Pclass}</p>}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="sex">Gender</Label>
                <Select value={formData.Sex} onValueChange={(value) => handleInputChange("Sex", value)}>
                  <SelectTrigger className={cn(validationErrors.Sex && "border-destructive")}>
                    <SelectValue placeholder="Male" />
                  </SelectTrigger>
                  <SelectContent className="font-aquire-light">
                    <SelectItem value="0">Male</SelectItem>
                    <SelectItem value="1">Female</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.Sex && <p className="text-sm text-destructive">{validationErrors.Sex}</p>}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.Age}
                  onChange={(e) => handleInputChange("Age", e.target.value)}
                  className={cn(validationErrors.Age && "border-destructive")}
                  min="0"
                  max="120"
                />
                {validationErrors.Age && <p className="text-sm text-destructive">{validationErrors.Age}</p>}
              </div>

              {/* Fare */}
              <div className="space-y-2">
                <Label htmlFor="Fare">Fare (£)</Label>
                <Input
                  id="fare"
                  type="number"
                  step="1"
                  placeholder="Ticket fare"
                  value={formData.Fare}
                  onChange={(e) => handleInputChange("Fare", e.target.value)}
                  className={cn(validationErrors.Fare && "border-destructive")}
                  min="0"
                />
                {validationErrors.Fare && <p className="text-sm text-destructive">{validationErrors.Fare}</p>}
              </div>

              {/* Siblings/Spouses */}
              <div className="space-y-2">
                <Label htmlFor="sibsp">Siblings/Spouses Aboard</Label>
                <Input
                  id="sibsp"
                  type="number"
                  placeholder="0"
                  value={formData.SibSp}
                  onChange={(e) => handleInputChange("SibSp", e.target.value)}
                  className={cn(validationErrors.SibSp && "border-destructive")}
                  min="0"
                />
                {validationErrors.SibSp && <p className="text-sm text-destructive">{validationErrors.SibSp}</p>}
              </div>

              {/* Parents/Children */}
              <div className="space-y-2">
                <Label htmlFor="parch">Parents/Children Aboard</Label>
                <Input
                  id="parch"
                  type="number"
                  placeholder="0"
                  value={formData.Parch}
                  onChange={(e) => handleInputChange("Parch", e.target.value)}
                  className={cn(validationErrors.Parch && "border-destructive")}
                  min="0"
                />
                {validationErrors.Parch && <p className="text-sm text-destructive">{validationErrors.Parch}</p>}
              </div>

              {/* Port of Embarkation */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="embarked">Port of Embarkation</Label>
                <Select value={formData.Embarked} onValueChange={(value) => handleInputChange("Embarked", value)}>
                  <SelectTrigger className={cn(validationErrors.Embarked && "border-destructive")}>
                    <SelectValue placeholder="Southampton" />
                  </SelectTrigger>
                  <SelectContent className="font-aquire-light tracking-wide">
                    <SelectItem value="0">Southampton</SelectItem>
                    <SelectItem value="1">Cherbourg</SelectItem>
                    <SelectItem value="2">Queenstown</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.Embarked && <p className="text-sm text-destructive">{validationErrors.Embarked}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 tracking-wide">
              <Button 
                type="submit" 
                className="w-full sm:flex-1 font-medium font-airnt-bold text-sm sm:text-base py-6 sm:py-4" 
                disabled={isLoading} 
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  "Predict Survival"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    Pclass: "",
                    Sex: "",
                    Age: "",
                    SibSp: "",
                    Parch: "",
                    Fare: "",
                    Embarked: "",
                  })
                  setResult(null)
                  setError(null)
                  setValidationErrors({})
                }}
                className="w-full sm:w-auto px-4 sm:px-8 py-6 sm:py-4 font-aquire-light text-sm sm:text-base"
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results Display */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="font-airnt-quantum tracking-wide text-xl">Prediction Results</CardTitle>
        </CardHeader>
        <CardContent>
          {result ? (
            (() => {
              const { title, description, icon: Icon, variant } = getSurvivalMessage(
                result.prediction,
                result.probability
              );
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn("h-8 w-8", variant === "destructive" ? "text-destructive" : "text-foreground")}
                    />
                    <div>
                      <h3 className="text-xl font-serif font-bold">{title}</h3>
                      <p className="text-muted-foreground">{description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Confidence:</span>
                    <Badge variant={variant === "destructive" ? "destructive" : "default"} className="font-dotmatrix font-bold  text-black">
                      {result.probability ? 
                        (result.prediction === 1 ? result.probability : 100 - result.probability).toFixed(1) 
                        : 50.0}%
                    </Badge>
                  </div>
                </div>
              )
            })()
          ) : (
            <p className="text-muted-foreground font-dotmatrix">
              Enter passenger details and click predict to see survival probability
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
