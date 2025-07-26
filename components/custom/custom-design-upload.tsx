"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, Palette, Ruler, Shirt, CheckCircle, X, Eye } from "lucide-react";

interface DesignFile {
  id: string;
  name: string;
  type: string;
  size: string;
  preview?: string;
}

interface Measurements {
  chest: string;
  waist: string;
  hips: string;
  shoulders: string;
  sleeves: string;
  length: string;
  neck: string;
  inseam: string;
  outseam: string;
}

const designCategories = [
  { id: "shirt", name: "Shirts", icon: Shirt },
  { id: "dress", name: "Dresses", icon: Shirt },
  { id: "suit", name: "Suits", icon: Shirt },
  { id: "casual", name: "Casual Wear", icon: Shirt },
  { id: "formal", name: "Formal Wear", icon: Shirt },
  { id: "traditional", name: "Traditional", icon: Shirt }
];

const sizingGuides = {
  shirt: ["Chest", "Waist", "Shoulders", "Sleeves", "Length", "Neck"],
  dress: ["Bust", "Waist", "Hips", "Length", "Shoulders"],
  suit: ["Chest", "Waist", "Hips", "Shoulders", "Sleeves", "Length", "Inseam"],
  casual: ["Chest", "Waist", "Hips", "Length"],
  formal: ["Chest", "Waist", "Shoulders", "Sleeves", "Length", "Neck"],
  traditional: ["Chest", "Waist", "Hips", "Length", "Shoulders"]
};

export default function CustomDesignUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<DesignFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [measurements, setMeasurements] = useState<Measurements>({
    chest: "", waist: "", hips: "", shoulders: "", sleeves: "",
    length: "", neck: "", inseam: "", outseam: ""
  });
  const [designDetails, setDesignDetails] = useState({
    title: "",
    description: "",
    fabric: "",
    color: "",
    style: "",
    deadline: "",
    budget: ""
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles: DesignFile[] = files.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const updateMeasurement = (field: keyof Measurements, value: string) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Design submission:", {
      files: uploadedFiles,
      category: selectedCategory,
      measurements,
      details: designDetails
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-purple-600 text-white mb-4">Custom Design Studio</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your Design Vision
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your design ideas, upload references, and provide measurements for a perfectly tailored creation
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="design" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Design Upload
              </TabsTrigger>
              <TabsTrigger value="measurements" className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Measurements
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="review" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Review
              </TabsTrigger>
            </TabsList>

            {/* Design Upload Tab */}
            <TabsContent value="design">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Design References</CardTitle>
                    <p className="text-gray-600">
                      Upload photos, sketches, or design files that show what you want created
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Category Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Design Category
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {designCategories.map((category) => (
                          <motion.div
                            key={category.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={`cursor-pointer transition-all ${
                                selectedCategory === category.id
                                  ? 'ring-2 ring-purple-500 bg-purple-50'
                                  : 'hover:shadow-md'
                              }`}
                              onClick={() => setSelectedCategory(category.id)}
                            >
                              <CardContent className="p-4 text-center">
                                <category.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                                <div className="font-medium">{category.name}</div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                      <div className="text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Upload Design Files
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Drag and drop files here, or click to select
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Supports: JPG, PNG, PDF, AI, PSD, Sketch (Max 10MB each)
                        </p>
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf,.ai,.psd,.sketch"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="design-upload"
                        />
                        <label htmlFor="design-upload">
                          <Button variant="outline" asChild>
                            <span>Choose Files</span>
                          </Button>
                        </label>
                      </div>
                    </div>

                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Uploaded Files</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {uploadedFiles.map((file) => (
                            <motion.div
                              key={file.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card className="relative group">
                                <CardContent className="p-4">
                                  {file.preview ? (
                                    <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                                      <img
                                        src={file.preview}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="aspect-square mb-3 rounded-lg bg-gray-100 flex items-center justify-center">
                                      <Image className="h-12 w-12 text-gray-400" />
                                    </div>
                                  )}
                                  <div className="text-sm">
                                    <div className="font-medium truncate">{file.name}</div>
                                    <div className="text-gray-500">{file.size}</div>
                                  </div>
                                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      className="h-8 w-8 p-0"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      className="h-8 w-8 p-0"
                                      onClick={() => removeFile(file.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Measurements Tab */}
            <TabsContent value="measurements">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Enter Your Measurements</CardTitle>
                    <p className="text-gray-600">
                      Provide accurate measurements in centimeters for the best fit
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedCategory && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Ruler className="h-5 w-5 text-purple-600" />
                          <h4 className="font-medium">
                            {designCategories.find(c => c.id === selectedCategory)?.name} Measurements
                          </h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {sizingGuides[selectedCategory as keyof typeof sizingGuides]?.map((measurement) => {
                            const field = measurement.toLowerCase().replace(' ', '') as keyof Measurements;
                            return (
                              <div key={measurement}>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                  {measurement} (cm)
                                </label>
                                <Input
                                  type="number"
                                  placeholder="0.0"
                                  value={measurements[field]}
                                  onChange={(e) => updateMeasurement(field, e.target.value)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {!selectedCategory && (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <Ruler className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600">
                          Please select a design category first to see relevant measurements
                        </p>
                      </div>
                    )}

                    {/* Measurement Guide */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Measurement Tips</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Use a flexible measuring tape</li>
                        <li>• Measure over fitted undergarments</li>
                        <li>• Keep tape snug but not tight</li>
                        <li>• Stand naturally with good posture</li>
                        <li>• Have someone help for accuracy</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Design Details & Preferences</CardTitle>
                    <p className="text-gray-600">
                      Specify materials, colors, and other important details
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Design Title
                        </label>
                        <Input
                          placeholder="Give your design a name"
                          value={designDetails.title}
                          onChange={(e) => setDesignDetails(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Preferred Fabric
                        </label>
                        <Select 
                          value={designDetails.fabric}
                          onValueChange={(value) => setDesignDetails(prev => ({ ...prev, fabric: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select fabric type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="silk">Silk</SelectItem>
                            <SelectItem value="linen">Linen</SelectItem>
                            <SelectItem value="wool">Wool</SelectItem>
                            <SelectItem value="polyester">Polyester</SelectItem>
                            <SelectItem value="blend">Fabric Blend</SelectItem>
                            <SelectItem value="custom">Custom/Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Color Preference
                        </label>
                        <Input
                          placeholder="e.g. Navy blue, Forest green"
                          value={designDetails.color}
                          onChange={(e) => setDesignDetails(prev => ({ ...prev, color: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Style Preference
                        </label>
                        <Select 
                          value={designDetails.style}
                          onValueChange={(value) => setDesignDetails(prev => ({ ...prev, style: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="vintage">Vintage</SelectItem>
                            <SelectItem value="contemporary">Contemporary</SelectItem>
                            <SelectItem value="minimalist">Minimalist</SelectItem>
                            <SelectItem value="bohemian">Bohemian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Deadline
                        </label>
                        <Select 
                          value={designDetails.deadline}
                          onValueChange={(value) => setDesignDetails(prev => ({ ...prev, deadline: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="When do you need it?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-week">Within 1 week (+100%)</SelectItem>
                            <SelectItem value="2-weeks">Within 2 weeks (+50%)</SelectItem>
                            <SelectItem value="1-month">Within 1 month (Standard)</SelectItem>
                            <SelectItem value="flexible">Flexible timeline (-10%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Budget Range (ZMW)
                        </label>
                        <Select 
                          value={designDetails.budget}
                          onValueChange={(value) => setDesignDetails(prev => ({ ...prev, budget: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500-1000">ZMW 500 - 1,000</SelectItem>
                            <SelectItem value="1000-2000">ZMW 1,000 - 2,000</SelectItem>
                            <SelectItem value="2000-5000">ZMW 2,000 - 5,000</SelectItem>
                            <SelectItem value="5000+">ZMW 5,000+</SelectItem>
                            <SelectItem value="negotiate">Open to negotiation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Design Description & Special Instructions
                      </label>
                      <Textarea
                        placeholder="Describe your vision in detail. Include any special requirements, inspiration, or specific features you want..."
                        value={designDetails.description}
                        onChange={(e) => setDesignDetails(prev => ({ ...prev, description: e.target.value }))}
                        className="h-32"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Review Tab */}
            <TabsContent value="review">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Design Request</CardTitle>
                    <p className="text-gray-600">
                      Double-check all details before submitting to tailors
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Design Files</h4>
                          <div className="text-sm text-gray-600">
                            {uploadedFiles.length} files uploaded
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Category</h4>
                          <div className="text-sm text-gray-600">
                            {designCategories.find(c => c.id === selectedCategory)?.name || "Not selected"}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Measurements</h4>
                          <div className="text-sm text-gray-600">
                            {Object.values(measurements).filter(v => v).length} measurements provided
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Preferences</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div>Fabric: {designDetails.fabric || "Not specified"}</div>
                            <div>Color: {designDetails.color || "Not specified"}</div>
                            <div>Style: {designDetails.style || "Not specified"}</div>
                            <div>Deadline: {designDetails.deadline || "Not specified"}</div>
                            <div>Budget: {designDetails.budget || "Not specified"}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {designDetails.description && (
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {designDetails.description}
                        </div>
                      </div>
                    )}

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">Next Steps</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Your design will be sent to matching tailors</li>
                        <li>• You'll receive quotes within 24-48 hours</li>
                        <li>• Choose your preferred tailor and finalize details</li>
                        <li>• Track progress through your dashboard</li>
                      </ul>
                    </div>

                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={handleSubmit}
                    >
                      Submit Design Request
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
