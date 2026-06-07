/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'services' | 'portfolio' | 'about' | 'contact';

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  iconName: string;
  features: string[];
  priceRange: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  services: string[];
  stats?: { label: string; value: string };
  scope?: string;
  client?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatarUrl: string;
  rating: number;
}

