
import { Property } from '@/types';

// Format currency values consistently
export const formatCurrency = (value?: number): string => {
  if (value === undefined || value === null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

// Format price with appropriate suffix
export const formatPrice = (value?: number): string => {
  if (value === undefined || value === null) return '$0';
  
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  } else {
    return formatCurrency(value);
  }
};

// Calculate percentage of available stock
export const calculateStockPercentage = (available: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((available / total) * 100);
};

// Get stock status label
export const getStockStatusLabel = (available: number, total: number): string => {
  const percentage = calculateStockPercentage(available, total);
  return getStockStatusLabelFromPercentage(percentage);
};

// Get stock status class
export const getStockStatusClass = (available: number, total: number): string => {
  const percentage = calculateStockPercentage(available, total);
  return getStockStatusClassFromPercentage(percentage);
};

// Get stock status label based on percentage
export const getStockStatusLabelFromPercentage = (percentage: number): string => {
  if (percentage === 0) return 'Sold Out';
  if (percentage <= 25) return 'Limited';
  if (percentage <= 50) return 'Selling Fast';
  if (percentage <= 75) return 'Available';
  return 'Fully Available';
};

// Get stock status class based on percentage
export const getStockStatusClassFromPercentage = (percentage: number): string => {
  if (percentage === 0) return 'bg-red-100 text-red-800';
  if (percentage <= 20) return 'bg-orange-100 text-orange-800';
  if (percentage <= 50) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
};

// Map Supabase property data to our app's Property interface
export const mapPropertyData = (property: any): Property => {
  return {
    id: property.id || '',
    title: property.title || '',
    description: property.description || '',
    price: Number(property.price) || 0,
    rentalRate: property.rental_rate,
    type: property.property_types?.name?.toLowerCase() || 'residential',
    propertyType: property.property_types?.name || 'Residential',
    transactionType: property.transaction_types?.name || 'Sale',
    bedrooms: Number(property.bedrooms) || 0,
    bathrooms: Number(property.bathrooms) || 0,
    builtUpArea: Number(property.built_up_area) || 0,
    area: property.built_up_area || property.floor_area || property.land_area || 0,
    size: property.land_size || property.floor_area || 0,
    status: property.property_statuses?.name?.toLowerCase() || 'available',
    address: {
      street: property.street || '',
      city: property.city || '',
      state: property.state || '',
      zip: property.zip || '',
      country: property.country || ''
    },
    features: property.property_features || [],
    images: (property.property_images || []).map((img: any) => img.storage_path || ''),
    createdAt: property.created_at || new Date().toISOString(),
    updatedAt: property.updated_at || new Date().toISOString(),
    reference: property.reference_number || '',
    featured: property.featured || false,
    stock: property.total_stock ? {
      total: property.total_stock || 0,
      available: property.available_stock || 0,
      reserved: property.reserved_stock || 0,
      sold: property.sold_stock || 0
    } : undefined,
    subtype: property.subtype || '',
  };
};
