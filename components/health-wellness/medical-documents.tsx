"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  Download, 
  Eye, 
  Trash2, 
  Shield, 
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Lock,
  Share,
  Plus,
  Stethoscope
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface MedicalDocument {
  id: string
  name: string
  type: 'prescription' | 'lab-result' | 'scan' | 'insurance' | 'other'
  size: string
  uploadDate: Date
  expiryDate?: Date
  provider?: string
  encrypted: boolean
  shared: boolean
  url?: string
  thumbnail?: string
}

const mockDocuments: MedicalDocument[] = [
  {
    id: "doc-1",
    name: "Blood Test Results - January 2024",
    type: "lab-result",
    size: "2.4 MB",
    uploadDate: new Date(Date.now() - 86400000 * 7),
    provider: "Lusaka General Hospital",
    encrypted: true,
    shared: false,
    thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop"
  },
  {
    id: "doc-2", 
    name: "Prescription - Dr. Mwanza",
    type: "prescription",
    size: "1.2 MB",
    uploadDate: new Date(Date.now() - 86400000 * 3),
    expiryDate: new Date(Date.now() + 86400000 * 30),
    provider: "Dr. John Mwanza",
    encrypted: true,
    shared: true
  },
  {
    id: "doc-3",
    name: "Chest X-Ray Scan",
    type: "scan",
    size: "8.7 MB", 
    uploadDate: new Date(Date.now() - 86400000 * 14),
    provider: "Levy Medical Centre",
    encrypted: true,
    shared: false,
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop"
  },
  {
    id: "doc-4",
    name: "Insurance Card - ZSIC",
    type: "insurance", 
    size: "800 KB",
    uploadDate: new Date(Date.now() - 86400000 * 30),
    expiryDate: new Date(Date.now() + 86400000 * 365),
    encrypted: true,
    shared: false
  }
]

interface MedicalDocumentsProps {
  providerId?: string
  canShare?: boolean
}

export function MedicalDocuments({ providerId, canShare = true }: MedicalDocumentsProps) {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<MedicalDocument[]>(mockDocuments)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'shared' | 'upload'>('all')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const documentTypes = {
    'prescription': { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    'lab-result': { icon: File, color: 'text-green-600', bg: 'bg-green-100' },
    'scan': { icon: Image, color: 'text-purple-600', bg: 'bg-purple-100' },
    'insurance': { icon: Shield, color: 'text-orange-600', bg: 'bg-orange-100' },
    'other': { icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(files)
    
    if (files.length > 0) {
      setActiveTab('upload')
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      const fileId = `upload-${Date.now()}-${i}`
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }))
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
      // Add to documents
      const newDocument: MedicalDocument = {
        id: `doc-${Date.now()}-${i}`,
        name: file.name,
        type: getDocumentType(file.name),
        size: formatFileSize(file.size),
        uploadDate: new Date(),
        provider: user?.name || 'Self-uploaded',
        encrypted: true,
        shared: false
      }
      
      setDocuments(prev => [newDocument, ...prev])
    }
    
    setIsUploading(false)
    setSelectedFiles([])
    setUploadProgress({})
    setActiveTab('all')
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getDocumentType = (fileName: string): MedicalDocument['type'] => {
    const name = fileName.toLowerCase()
    if (name.includes('prescription') || name.includes('rx')) return 'prescription'
    if (name.includes('lab') || name.includes('test') || name.includes('blood')) return 'lab-result'
    if (name.includes('scan') || name.includes('x-ray') || name.includes('mri') || name.includes('ct')) return 'scan'
    if (name.includes('insurance') || name.includes('card')) return 'insurance'
    return 'other'
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleShare = (docId: string, providerId?: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, shared: !doc.shared } : doc
    ))
  }

  const handleDelete = (docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== docId))
    }
  }

  const filteredDocuments = documents.filter(doc => {
    if (activeTab === 'shared') return doc.shared
    return true
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZM', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-900">Medical Documents</CardTitle>
                <p className="text-slate-600">Securely store and share your medical records</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              HIPAA Compliant
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Security Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Lock className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Your privacy is protected:</strong> All documents are encrypted end-to-end and stored securely. 
          Only you and healthcare providers you explicitly share with can access your files.
        </AlertDescription>
      </Alert>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
        {[
          { id: 'all', label: 'All Documents', count: documents.length },
          { id: 'shared', label: 'Shared', count: documents.filter(d => d.shared).length },
          { id: 'upload', label: 'Upload New', count: selectedFiles.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Upload Section */}
      {activeTab === 'upload' && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* File Upload Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer"
              >
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Medical Documents</h3>
                <p className="text-slate-600 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-slate-500">
                  Supported formats: PDF, JPG, PNG, DICOM • Max size: 25MB per file
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.dicom"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Selected Files ({selectedFiles.length})</h4>
                  <div className="space-y-3">
                    {selectedFiles.map((file, index) => {
                      const fileId = `upload-${Date.now()}-${index}`
                      const progress = uploadProgress[fileId] || 0
                      
                      return (
                        <div key={index} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{file.name}</p>
                                <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            {!isUploading && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedFiles(prev => prev.filter((_, i) => i !== index))
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          {isUploading && progress > 0 && (
                            <div className="space-y-2">
                              <Progress value={progress} className="h-2" />
                              <p className="text-xs text-slate-500">Uploading... {progress}%</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedFiles([])}>
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents Grid */}
      {(activeTab === 'all' || activeTab === 'shared') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => {
            const DocumentIcon = documentTypes[document.type].icon
            const isExpiring = document.expiryDate && new Date(document.expiryDate) < new Date(Date.now() + 86400000 * 30)
            
            return (
              <Card key={document.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Document Preview */}
                  <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    {document.thumbnail ? (
                      <img 
                        src={document.thumbnail} 
                        alt={document.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <DocumentIcon className={`h-12 w-12 ${documentTypes[document.type].color}`} />
                    )}
                    
                    {/* Document Type Badge */}
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${documentTypes[document.type].bg} ${documentTypes[document.type].color}`}>
                      {document.type.replace('-', ' ')}
                    </div>

                    {/* Shared Indicator */}
                    {document.shared && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Share className="h-3 w-3 text-green-600" />
                      </div>
                    )}

                    {/* Encryption Badge */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      Encrypted
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {document.name}
                    </h3>
                    
                    {/* Metadata */}
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2" />
                        <span>Uploaded {formatDate(document.uploadDate)}</span>
                      </div>
                      
                      {document.provider && (
                        <div className="flex items-center">
                          <Stethoscope className="h-3 w-3 mr-2" />
                          <span>{document.provider}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{document.size}</span>
                        {isExpiring && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Expiring Soon
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Expiry Date */}
                    {document.expiryDate && (
                      <div className={`mt-2 text-xs ${isExpiring ? 'text-red-600' : 'text-slate-500'}`}>
                        Expires: {formatDate(document.expiryDate)}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      
                      {canShare && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare(document.id, providerId)}
                          className={document.shared ? 'border-green-200 text-green-600' : ''}
                        >
                          <Share className="h-3 w-3 mr-1" />
                          {document.shared ? 'Shared' : 'Share'}
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(document.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredDocuments.length === 0 && activeTab !== 'upload' && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {activeTab === 'shared' ? 'No shared documents' : 'No documents uploaded'}
          </h3>
          <p className="text-slate-600 mb-6">
            {activeTab === 'shared' 
              ? 'Share documents with your healthcare providers for better care'
              : 'Upload your medical records to keep them safe and accessible'
            }
          </p>
          <Button onClick={() => setActiveTab('upload')} className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Upload First Document
          </Button>
        </div>
      )}
    </div>
  )
}
