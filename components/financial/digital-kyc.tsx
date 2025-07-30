"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  User,
  MapPin,
  Phone,
  CreditCard,
  Building,
  Smartphone,
  Eye,
  Lock,
  Zap,
  Clock
} from "lucide-react"

interface KYCStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  required: boolean
}

interface IdentityDocument {
  type: string
  front: File | null
  back: File | null
  status: 'pending' | 'uploading' | 'uploaded' | 'verified' | 'rejected'
}

export function DigitalKYC() {
  const [currentStep, setCurrentStep] = useState(0)
  const [kycData, setKycData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "Uganda",
      maritalStatus: ""
    },
    contactInfo: {
      phone: "",
      email: "",
      address: "",
      city: "",
      district: "",
      postalCode: ""
    },
    identityVerification: {
      documentType: "",
      documentNumber: "",
      issueDate: "",
      expiryDate: ""
    },
    financialInfo: {
      occupation: "",
      employer: "",
      monthlyIncome: "",
      sourceOfIncome: "",
      purpose: ""
    }
  })
  const [documents, setDocuments] = useState<IdentityDocument>({
    type: "",
    front: null,
    back: null,
    status: 'pending'
  })
  const [biometricStatus, setBiometricStatus] = useState<'pending' | 'capturing' | 'completed'>('pending')
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending')

  const kycSteps: KYCStep[] = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Basic personal details and contact information",
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'in-progress' : 'pending',
      required: true
    },
    {
      id: "identity",
      title: "Identity Verification",
      description: "Upload government-issued ID documents",
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'in-progress' : 'pending',
      required: true
    },
    {
      id: "biometric",
      title: "Biometric Verification",
      description: "Face verification and liveness detection",
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'in-progress' : 'pending',
      required: true
    },
    {
      id: "financial",
      title: "Financial Information",
      description: "Employment and income verification",
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'in-progress' : 'pending',
      required: true
    },
    {
      id: "review",
      title: "Review & Submit",
      description: "Review all information and submit for verification",
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'in-progress' : 'pending',
      required: true
    }
  ]

  const documentTypes = [
    { value: "national-id", label: "National ID", icon: CreditCard },
    { value: "passport", label: "Passport", icon: FileText },
    { value: "driving-license", label: "Driving License", icon: CreditCard },
    { value: "voter-id", label: "Voter ID", icon: CreditCard }
  ]

  const handleFileUpload = (file: File, side: 'front' | 'back') => {
    setDocuments(prev => ({
      ...prev,
      [side]: file,
      status: 'uploading'
    }))

    // Simulate upload process
    setTimeout(() => {
      setDocuments(prev => ({
        ...prev,
        status: 'uploaded'
      }))
    }, 2000)

    // Simulate verification
    setTimeout(() => {
      setDocuments(prev => ({
        ...prev,
        status: 'verified'
      }))
    }, 5000)
  }

  const startBiometricCapture = () => {
    setBiometricStatus('capturing')
    
    // Simulate biometric capture
    setTimeout(() => {
      setBiometricStatus('completed')
    }, 3000)
  }

  const submitKYC = () => {
    setVerificationStatus('processing')
    
    // Simulate KYC processing
    setTimeout(() => {
      setVerificationStatus('completed')
    }, 5000)
  }

  const getStepIcon = (step: KYCStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
    }
  }

  const getStepColor = (step: KYCStep) => {
    switch (step.status) {
      case 'completed':
        return 'border-green-500 bg-green-50'
      case 'in-progress':
        return 'border-blue-500 bg-blue-50'
      case 'failed':
        return 'border-red-500 bg-red-50'
      default:
        return 'border-slate-200 bg-slate-50'
    }
  }

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={kycData.personalInfo.firstName}
            onChange={(e) => setKycData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, firstName: e.target.value }
            }))}
            placeholder="Enter your first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={kycData.personalInfo.lastName}
            onChange={(e) => setKycData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, lastName: e.target.value }
            }))}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={kycData.personalInfo.dateOfBirth}
            onChange={(e) => setKycData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
            }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={kycData.personalInfo.gender} onValueChange={(value) => 
            setKycData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, gender: value }
            }))
          }>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={kycData.contactInfo.phone}
            onChange={(e) => setKycData(prev => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, phone: e.target.value }
            }))}
            placeholder="+256 700 000 000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={kycData.contactInfo.email}
            onChange={(e) => setKycData(prev => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, email: e.target.value }
            }))}
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Physical Address *</Label>
        <Textarea
          id="address"
          value={kycData.contactInfo.address}
          onChange={(e) => setKycData(prev => ({
            ...prev,
            contactInfo: { ...prev.contactInfo, address: e.target.value }
          }))}
          placeholder="Enter your complete physical address"
          rows={3}
        />
      </div>
    </div>
  )

  const renderIdentityStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Document Type *</Label>
        <Select value={documents.type} onValueChange={(value) => setDocuments(prev => ({ ...prev, type: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map((docType) => (
              <SelectItem key={docType.value} value={docType.value}>
                <div className="flex items-center gap-2">
                  <docType.icon className="h-4 w-4" />
                  {docType.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Front of Document */}
        <div className="space-y-4">
          <Label>Front of Document *</Label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            {documents.front ? (
              <div className="space-y-2">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <p className="text-sm font-medium">Document uploaded</p>
                <p className="text-xs text-slate-500">{documents.front.name}</p>
                {documents.status === 'verified' && (
                  <Badge className="bg-green-100 text-green-700">Verified</Badge>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-12 w-12 text-slate-400 mx-auto" />
                <p className="text-sm font-medium">Upload front of document</p>
                <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'front')
                  }}
                  className="hidden"
                  id="front-upload"
                />
                <Button asChild variant="outline" size="sm">
                  <label htmlFor="front-upload" className="cursor-pointer">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </label>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Back of Document */}
        <div className="space-y-4">
          <Label>Back of Document</Label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            {documents.back ? (
              <div className="space-y-2">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <p className="text-sm font-medium">Document uploaded</p>
                <p className="text-xs text-slate-500">{documents.back.name}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-12 w-12 text-slate-400 mx-auto" />
                <p className="text-sm font-medium">Upload back of document</p>
                <p className="text-xs text-slate-500">If applicable</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'back')
                  }}
                  className="hidden"
                  id="back-upload"
                />
                <Button asChild variant="outline" size="sm">
                  <label htmlFor="back-upload" className="cursor-pointer">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </label>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {documents.status === 'uploading' && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading documents...</span>
            <span>85%</span>
          </div>
          <Progress value={85} />
        </div>
      )}
    </div>
  )

  const renderBiometricStep = () => (
    <div className="space-y-6 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
        <Eye className="h-12 w-12 text-white" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Biometric Verification</h3>
        <p className="text-slate-600">
          We'll use your device camera to verify your identity through facial recognition
        </p>
      </div>

      {biometricStatus === 'pending' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Before you start:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure good lighting</li>
              <li>• Remove glasses if possible</li>
              <li>• Look directly at the camera</li>
              <li>• Keep your face within the frame</li>
            </ul>
          </div>
          <Button 
            onClick={startBiometricCapture}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Camera className="h-4 w-4 mr-2" />
            Start Face Verification
          </Button>
        </div>
      )}

      {biometricStatus === 'capturing' && (
        <div className="space-y-4">
          <div className="w-64 h-64 bg-slate-100 rounded-lg mx-auto flex items-center justify-center">
            <div className="animate-pulse">
              <Camera className="h-16 w-16 text-slate-400" />
            </div>
          </div>
          <p className="text-slate-600">Please look at the camera and follow the instructions...</p>
          <div className="space-y-2">
            <Progress value={65} />
            <p className="text-sm text-slate-500">Processing biometric data...</p>
          </div>
        </div>
      )}

      {biometricStatus === 'completed' && (
        <div className="space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <div>
            <h4 className="font-medium text-green-900">Verification Successful!</h4>
            <p className="text-sm text-green-700">Your biometric data has been captured successfully</p>
          </div>
        </div>
      )}
    </div>
  )

  const renderFinancialStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation *</Label>
          <Input
            id="occupation"
            value={kycData.financialInfo.occupation}
            onChange={(e) => setKycData(prev => ({
              ...prev,
              financialInfo: { ...prev.financialInfo, occupation: e.target.value }
            }))}
            placeholder="Your job title/profession"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employer">Employer *</Label>
          <Input
            id="employer"
            value={kycData.financialInfo.employer}
            onChange={(e) => setKycData(prev => ({
              ...prev,
              financialInfo: { ...prev.financialInfo, employer: e.target.value }
            }))}
            placeholder="Company/organization name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Income (UGX) *</Label>
          <Select value={kycData.financialInfo.monthlyIncome} onValueChange={(value) =>
            setKycData(prev => ({
              ...prev,
              financialInfo: { ...prev.financialInfo, monthlyIncome: value }
            }))
          }>
            <SelectTrigger>
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-500k">Under UGX 500K</SelectItem>
              <SelectItem value="500k-1m">UGX 500K - 1M</SelectItem>
              <SelectItem value="1m-2m">UGX 1M - 2M</SelectItem>
              <SelectItem value="2m-5m">UGX 2M - 5M</SelectItem>
              <SelectItem value="5m-10m">UGX 5M - 10M</SelectItem>
              <SelectItem value="over-10m">Over UGX 10M</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sourceOfIncome">Source of Income *</Label>
          <Select value={kycData.financialInfo.sourceOfIncome} onValueChange={(value) =>
            setKycData(prev => ({
              ...prev,
              financialInfo: { ...prev.financialInfo, sourceOfIncome: value }
            }))
          }>
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employment">Employment/Salary</SelectItem>
              <SelectItem value="business">Business/Trading</SelectItem>
              <SelectItem value="investments">Investments</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">Purpose of Account/Service *</Label>
        <Textarea
          id="purpose"
          value={kycData.financialInfo.purpose}
          onChange={(e) => setKycData(prev => ({
            ...prev,
            financialInfo: { ...prev.financialInfo, purpose: e.target.value }
          }))}
          placeholder="Explain why you need this financial service"
          rows={3}
        />
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Review Your Information</h3>
        <p className="text-slate-600">Please review all information before submitting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Name:</span>
              <span className="font-medium">{kycData.personalInfo.firstName} {kycData.personalInfo.lastName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Phone:</span>
              <span className="font-medium">{kycData.contactInfo.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Email:</span>
              <span className="font-medium">{kycData.contactInfo.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Identity Document:</span>
              <Badge className="bg-green-100 text-green-700">Verified</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Biometric:</span>
              <Badge className="bg-green-100 text-green-700">Verified</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Financial Info:</span>
              <Badge className="bg-blue-100 text-blue-700">Provided</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {verificationStatus === 'pending' && (
        <div className="text-center">
          <Button 
            onClick={submitKYC}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8"
          >
            <Lock className="h-4 w-4 mr-2" />
            Submit for Verification
          </Button>
        </div>
      )}

      {verificationStatus === 'processing' && (
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-slate-600">Processing your KYC verification...</p>
          <Progress value={75} />
        </div>
      )}

      {verificationStatus === 'completed' && (
        <div className="text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <div>
            <h4 className="text-xl font-bold text-green-900">KYC Verification Complete!</h4>
            <p className="text-green-700">Your account has been successfully verified</p>
          </div>
          <Badge className="bg-green-100 text-green-700 px-4 py-2">
            Verification ID: KYC-{Date.now()}
          </Badge>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Digital KYC Verification</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Complete your identity verification securely with our digital KYC process. All data is encrypted and protected.
        </p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {kycSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center flex-1">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 ${getStepColor(step)}`}>
                  {getStepIcon(step)}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
                {index < kycSteps.length - 1 && (
                  <div className="absolute w-full h-0.5 bg-slate-200 top-6 left-1/2 transform -translate-y-1/2 z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep + 1) / kycSteps.length * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStepIcon(kycSteps[currentStep])}
            {kycSteps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && renderPersonalInfoStep()}
          {currentStep === 1 && renderIdentityStep()}
          {currentStep === 2 && renderBiometricStep()}
          {currentStep === 3 && renderFinancialStep()}
          {currentStep === 4 && renderReviewStep()}

          {/* Navigation Buttons */}
          {verificationStatus !== 'completed' && (
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(kycSteps.length - 1, currentStep + 1))}
                disabled={currentStep === kycSteps.length - 1}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <Zap className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Your Data is Secure</h4>
              <p className="text-sm text-blue-800">
                All information is encrypted using bank-grade security. We comply with Uganda's data protection regulations and international security standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
