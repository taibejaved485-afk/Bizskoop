// Add React import to resolve React.ReactNode namespace error
import React from 'react';

export interface SiteConfig {
  global: {
    companyName: string;
    phone: string;
    email: string;
    address: string;
    social: {
      linkedin: string;
      whatsapp: string;
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
  header: {
    logoText: string;
    navItems: string[];
  };
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: {
      label: string;
      value: string;
    }[];
  };
  about: {
    narrative: string;
    teamOverview: string;
  };
  footer: {
    copyright: string;
    links: { label: string; url: string }[];
  };
  legal: {
    privacyPolicy: string;
    terms: string;
    refundPolicy: string;
    compliance: string;
  };
}

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: string; // Using string to represent icon name for simplicity in config
  tags: string[];
}

export interface Lead {
  id: string;
  fullName: string;
  email?: string;
  companyName: string;
  phoneNumber?: string;
  service: string;
  message?: string;
  status: 'unread' | 'read' | 'in-progress' | 'resolved';
  date: string;
  notes?: string;
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

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
}

export interface ServicePricingItem {
  id: string;
  serviceKey: string;
  serviceName: string;
  category: string;
  basePriceMYR: number;
  governmentFeeMYR: number;
  processingTime: string;
  features: string[];
  popularBadge?: boolean;
}

export interface AnnouncementConfig {
  enabled: boolean;
  message: string;
  ctaText?: string;
  ctaUrl?: string;
  badgeText?: string;
  theme: 'gold' | 'royal' | 'emerald' | 'crimson';
  marqueeEffect?: boolean;
}
