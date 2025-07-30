"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calculator,
  FileText,
  Building,
  CreditCard,
  Shield,
  TrendingUp,
  Users,
  Smartphone
} from "lucide-react"

interface EligibilityResult {
  eligible: boolean
  score: number
  requirements: {
    met: string[]
    missing: string[]
    recommendations: string[]
  }
  products: string[]
}

export function EligibilityTools() {
  const [activeTab, setActiveTab] = useState("loans")
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    employment: "",
    creditHistory: "",
    collateral: "",
    purpose: "",
    amount: "",
    documents: [] as string[]
  })
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const eligibilityCategories = [
    { id: "loans", name: "Loans & Credit", icon: CreditCard, color: "from-blue-500 to-cyan-600" },
    { id: "banking", name: "Banking", icon: Building, color: "from-green-500 to-emerald-600" },
    { id: "insurance", name: "Insurance", icon: Shield, color: "from-purple-500 to-violet-600" },
    { id: "investments", name: "Investments", icon: TrendingUp, color: "from-orange-500 to-red-600" }
  ]

  const checkEligibility = async () => {
    setIsChecking(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock eligibility calculation
    const income = parseInt(formData.income) || 0
    const age = parseInt(formData.age) || 0
    
    let score = 0
    const met: string[] = []
    const missing: string[] = []
    const recommendations: string[] = []
    
    // Age check
    if (age >= 18 && age <= 65) {
      score += 20
      met.push("Age requirement (18-65 years)")
    } else {
      missing.push("Valid age (18-65 years)")
    }
    
    // Income check
    if (income >= 3000) {
      score += 30
      met.push("Minimum income requirement")
    } else if (income >= 1500) {
      score += 15
      met.push("Partial income requirement")
      recommendations.push("Consider a lower loan amount or co-signer")
    } else {
      missing.push("Minimum monthly income of ZMW 1,500")
    }
    
    // Employment check
    if (formData.employment === "permanent") {
      score += 25
      met.push("Stable employment status")
    } else if (formData.employment === "contract") {
      score += 15
      met.push("Contract employment accepted")
      recommendations.push("Provide additional income documentation")
    } else {
      missing.push("Proof of stable employment")
    }
    
    // Credit history
    if (formData.creditHistory === "excellent") {
      score += 25
      met.push("Excellent credit history")
    } else if (formData.creditHistory === "good") {
      score += 20
      met.push("Good credit history")
    } else if (formData.creditHistory === "fair") {
      score += 10
      met.push("Fair credit history")
      recommendations.push("Consider improving credit score for better rates")
    } else {
      missing.push("Satisfactory credit history")
      recommendations.push("Build credit history with smaller financial products")
    }
    
    const eligible = score >= 60
    const products = eligible ? [
      "Personal Loan (Standard)",
      "Business Loan (SME)",
      "Asset Finance",
      "Salary Advance"
    ] : [
      "Secured Loan",
      "Micro Finance",
      "Group Loan Scheme"
    ]
    
    setResult({
      eligible,
      score,
      requirements: { met, missing, recommendations },
      products
    })
    
    setIsChecking(false)
  }

  const resetForm = () => {
    setFormData({
      age: "",
      income: "",
      employment: "",
      creditHistory: "",
      collateral: "",
      purpose: "",
      amount: "",
      documents: []
    })
    setResult(null)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Eligibility Checker</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Check your eligibility for various financial products and get personalized recommendations
        </p>
      </div>

      {/* Category Selection */}
      <Card className="bg-gradient-to-r from-slate-50 to-gray-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eligibilityCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                variant={activeTab === category.id ? "default" : "outline"}
                className={`flex flex-col items-center gap-2 h-20 ${
                  activeTab === category.id
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : "hover:bg-slate-100"
                }`}
              >
                <category.icon className="h-6 w-6" />
                <span className="text-sm">{category.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Eligibility Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Eligibility Assessment Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income (ZMW)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="5,000"
                    value={formData.income}
                    onChange={(e) => setFormData({...formData, income: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Employment Status</Label>
                <RadioGroup 
                  value={formData.employment} 
                  onValueChange={(value) => setFormData({...formData, employment: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="permanent" id="permanent" />
                    <Label htmlFor="permanent">Permanent Employment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contract" id="contract" />
                    <Label htmlFor="contract">Contract/Temporary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self-employed" id="self-employed" />
                    <Label htmlFor="self-employed">Self Employed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unemployed" id="unemployed" />
                    <Label htmlFor="unemployed">Unemployed</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Credit History</Label>
                <Select value={formData.creditHistory} onValueChange={(value) => setFormData({...formData, creditHistory: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit history" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (No defaults)</SelectItem>
                    <SelectItem value="good">Good (1-2 minor issues)</SelectItem>
                    <SelectItem value="fair">Fair (Some payment delays)</SelectItem>
                    <SelectItem value="poor">Poor (Multiple defaults)</SelectItem>
                    <SelectItem value="none">No Credit History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Desired Amount (ZMW)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50,000"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Purpose of {activeTab === "loans" ? "Loan" : "Application"}</Label>
                <Select value={formData.purpose} onValueChange={(value) => setFormData({...formData, purpose: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeTab === "loans" && (
                      <>
                        <SelectItem value="personal">Personal Use</SelectItem>
                        <SelectItem value="business">Business Expansion</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="home">Home Improvement</SelectItem>
                        <SelectItem value="vehicle">Vehicle Purchase</SelectItem>
                        <SelectItem value="debt">Debt Consolidation</SelectItem>
                      </>
                    )}
                    {activeTab === "banking" && (
                      <>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="current">Current Account</SelectItem>
                        <SelectItem value="business">Business Account</SelectItem>
                        <SelectItem value="foreign">Foreign Currency Account</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Available Documents (Check all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "National ID/Passport",
                    "Payslips (3 months)",
                    "Bank Statements",
                    "Tax Returns",
                    "Employment Letter",
                    "Business Registration",
                    "Collateral Documents",
                    "References"
                  ].map((doc) => (
                    <div key={doc} className="flex items-center space-x-2">
                      <Checkbox
                        id={doc}
                        checked={formData.documents.includes(doc)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              documents: [...formData.documents, doc]
                            })
                          } else {
                            setFormData({
                              ...formData,
                              documents: formData.documents.filter(d => d !== doc)
                            })
                          }
                        }}
                      />
                      <Label htmlFor={doc} className="text-sm">{doc}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={checkEligibility}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  disabled={isChecking}
                >
                  {isChecking ? "Checking..." : "Check Eligibility"}
                </Button>
                <Button onClick={resetForm} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Requirements Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="h-5 w-5" />
                General Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Age: 18-65 years",
                "Regular income source",
                "Valid identification",
                "Bank account",
                "Clean credit record"
              ].map((req, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  {req}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Eligibility Result */}
          {result && (
            <Card className={`border-2 ${
              result.eligible 
                ? "border-green-200 bg-green-50" 
                : "border-orange-200 bg-orange-50"
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.eligible ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  )}
                  Eligibility Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    result.eligible ? "text-green-600" : "text-orange-600"
                  }`}>
                    {result.score}%
                  </div>
                  <Progress value={result.score} className="mb-2" />
                  <Badge className={
                    result.eligible 
                      ? "bg-green-100 text-green-700" 
                      : "bg-orange-100 text-orange-700"
                  }>
                    {result.eligible ? "ELIGIBLE" : "PARTIALLY ELIGIBLE"}
                  </Badge>
                </div>

                {/* Requirements Met */}
                {result.requirements.met.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">✓ Requirements Met:</h4>
                    <ul className="space-y-1">
                      {result.requirements.met.map((req, index) => (
                        <li key={index} className="text-sm text-green-600 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Missing Requirements */}
                {result.requirements.missing.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">✗ Missing Requirements:</h4>
                    <ul className="space-y-1">
                      {result.requirements.missing.map((req, index) => (
                        <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                          <XCircle className="h-3 w-3" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {result.requirements.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">💡 Recommendations:</h4>
                    <ul className="space-y-1">
                      {result.requirements.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-blue-600 flex items-center gap-2">
                          <AlertCircle className="h-3 w-3" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Available Products */}
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Available Products:</h4>
                  <div className="space-y-2">
                    {result.products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm font-medium">{product}</span>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isChecking && (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-600">Analyzing your eligibility...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export { EligibilityTools }
