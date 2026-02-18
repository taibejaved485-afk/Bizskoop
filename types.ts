
// Add React import to resolve React.ReactNode namespace error
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export interface VisaFormData {
  nationality: string;
  education: string;
  monthlySalary: string;
  experienceYears: string;
}

export interface LicenseWizardData {
  industry: string;
  businessActivity: string;
  location: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  estimatedTime: string;
}

export interface AIResponse {
  assessment: string;
  recommendation: string;
  steps: RoadmapStep[];
  disclaimer: string;
}