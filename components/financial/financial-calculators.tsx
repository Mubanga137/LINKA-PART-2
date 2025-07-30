"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, PiggyBank, Home, CreditCard, TrendingUp, DollarSign } from "lucide-react"

interface LoanCalculation {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
}

interface SavingsCalculation {
  finalAmount: number
  totalInterest: number
  monthlyContribution: number
}

export function FinancialCalculators() {
  const [loanAmount, setLoanAmount] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanResult, setLoanResult] = useState<LoanCalculation | null>(null)

  const [savingsGoal, setSavingsGoal] = useState("")
  const [savingsYears, setSavingsYears] = useState("")
  const [savingsRate, setSavingsRate] = useState("")
  const [savingsResult, setSavingsResult] = useState<SavingsCalculation | null>(null)

  const [mortgageAmount, setMortgageAmount] = useState("")
  const [mortgageTerm, setMortgageTerm] = useState("")
  const [mortgageRate, setMortgageRate] = useState("")
  const [downPayment, setDownPayment] = useState("")

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12
    const time = parseFloat(loanTerm) * 12

    if (principal && rate && time) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
      const totalPayment = monthlyPayment * time
      const totalInterest = totalPayment - principal

      setLoanResult({
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest)
      })
    }
  }

  const calculateSavings = () => {
    const goal = parseFloat(savingsGoal)
    const years = parseFloat(savingsYears)
    const rate = parseFloat(savingsRate) / 100

    if (goal && years && rate) {
      // Calculate monthly contribution needed
      const monthlyRate = rate / 12
      const months = years * 12
      const monthlyContribution = goal / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
      
      // Calculate final amount with compound interest
      const finalAmount = monthlyContribution * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
      const totalInterest = finalAmount - (monthlyContribution * months)

      setSavingsResult({
        finalAmount: Math.round(finalAmount),
        totalInterest: Math.round(totalInterest),
        monthlyContribution: Math.round(monthlyContribution)
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Financial Calculators</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Make informed financial decisions with our comprehensive calculation tools
        </p>
      </div>

      <Tabs defaultValue="loan" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 bg-slate-100 rounded-xl">
          <TabsTrigger value="loan" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Loan
          </TabsTrigger>
          <TabsTrigger value="savings" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            Savings
          </TabsTrigger>
          <TabsTrigger value="mortgage" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Mortgage
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Investment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="loan" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <CreditCard className="h-5 w-5" />
                Personal Loan Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loan-amount">Loan Amount (ZMW)</Label>
                  <Input
                    id="loan-amount"
                    type="number"
                    placeholder="50,000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan-term">Loan Term (Years)</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="7">7 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                  <Input
                    id="interest-rate"
                    type="number"
                    placeholder="15.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>

              <Button onClick={calculateLoan} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Calculate Loan Payment
              </Button>

              {loanResult && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-white border-blue-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-slate-600">Monthly Payment</p>
                      <p className="text-2xl font-bold text-blue-600">ZMW {loanResult.monthlyPayment.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-green-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-slate-600">Total Payment</p>
                      <p className="text-2xl font-bold text-green-600">ZMW {loanResult.totalPayment.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-orange-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-slate-600">Total Interest</p>
                      <p className="text-2xl font-bold text-orange-600">ZMW {loanResult.totalInterest.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <PiggyBank className="h-5 w-5" />
                Savings Goal Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="savings-goal">Savings Goal (ZMW)</Label>
                  <Input
                    id="savings-goal"
                    type="number"
                    placeholder="100,000"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="savings-years">Time Period (Years)</Label>
                  <Select value={savingsYears} onValueChange={setSavingsYears}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="savings-rate">Interest Rate (%)</Label>
                  <Input
                    id="savings-rate"
                    type="number"
                    placeholder="8.5"
                    value={savingsRate}
                    onChange={(e) => setSavingsRate(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>

              <Button onClick={calculateSavings} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Calculate Monthly Savings
              </Button>

              {savingsResult && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-white border-green-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-slate-600">Monthly Contribution</p>
                      <p className="text-2xl font-bold text-green-600">ZMW {savingsResult.monthlyContribution.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-blue-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-slate-600">Final Amount</p>
                      <p className="text-2xl font-bold text-blue-600">ZMW {savingsResult.finalAmount.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-purple-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-slate-600">Interest Earned</p>
                      <p className="text-2xl font-bold text-purple-600">ZMW {savingsResult.totalInterest.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mortgage" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Home className="h-5 w-5" />
                Mortgage Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mortgage-amount">Home Price (ZMW)</Label>
                  <Input
                    id="mortgage-amount"
                    type="number"
                    placeholder="500,000"
                    value={mortgageAmount}
                    onChange={(e) => setMortgageAmount(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="down-payment">Down Payment (ZMW)</Label>
                  <Input
                    id="down-payment"
                    type="number"
                    placeholder="100,000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mortgage-term">Loan Term (Years)</Label>
                  <Select value={mortgageTerm} onValueChange={setMortgageTerm}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                      <SelectItem value="25">25 Years</SelectItem>
                      <SelectItem value="30">30 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mortgage-rate">Interest Rate (%)</Label>
                  <Input
                    id="mortgage-rate"
                    type="number"
                    placeholder="12.5"
                    value={mortgageRate}
                    onChange={(e) => setMortgageRate(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                Calculate Mortgage Payment
              </Button>

              <div className="bg-white rounded-lg p-6 border border-purple-200">
                <p className="text-center text-slate-600">Complete the form above to see your mortgage calculations</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investment" className="space-y-6">
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <TrendingUp className="h-5 w-5" />
                Investment Growth Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Initial Investment (ZMW)</Label>
                  <Input
                    type="number"
                    placeholder="10,000"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Monthly Contribution (ZMW)</Label>
                  <Input
                    type="number"
                    placeholder="1,000"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expected Return (%)</Label>
                  <Input
                    type="number"
                    placeholder="12"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Investment Period (Years)</Label>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                      <SelectItem value="25">25 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                Calculate Investment Growth
              </Button>

              <div className="bg-white rounded-lg p-6 border border-orange-200">
                <p className="text-center text-slate-600">Complete the form above to see your investment projections</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center mt-8">
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          <strong>Disclaimer:</strong> These calculations are estimates only and should not be considered as financial advice. 
          Actual rates and terms may vary. Consult with qualified financial advisors for personalized guidance.
        </p>
      </div>
    </div>
  )
}

export { FinancialCalculators }
