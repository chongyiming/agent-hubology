
import React from 'react';

// Function to format currency values
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// For backward compatibility, ensure both functions are available
export const formatPrice = formatCurrency;

// Function to truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Function to get property type icon
export const getPropertyTypeIcon = (type: string): JSX.Element => {
  // You can import and use your icons here
  return <></>;
};

// Convert area to standard format
export const formatArea = (area: number, unit: string = 'sq.ft'): string => {
  return `${area.toLocaleString()} ${unit}`;
};

// Helper function to determine if a property is available
export const isPropertyAvailable = (status: string): boolean => {
  return status.toLowerCase() === 'available';
};

// Helper function to calculate stock availability percentage
export const calculateStockPercentage = (available: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((available / total) * 100);
};

// Helper function to get stock status label
export const getStockStatusLabel = (percentage: number): string => {
  if (percentage === 0) return 'Sold Out';
  if (percentage <= 25) return 'Low Stock';
  if (percentage <= 50) return 'Selling Fast';
  if (percentage <= 75) return 'Available';
  return 'Fully Available';
};

// Helper function to get stock availability class
export const getStockStatusClass = (percentage: number): string => {
  if (percentage === 0) return 'text-red-500 bg-red-500/10 border-red-500/20';
  if (percentage <= 25) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
  if (percentage <= 50) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
  if (percentage <= 75) return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
  return 'text-green-500 bg-green-500/10 border-green-500/20';
};

// Helper function to map property data structures
export const mapPropertyData = (property: any) => {
  // Handle different property structures (from API vs mock data)
  const mappedProperty = {
    id: property.id,
    title: property.title,
    description: property.description || property.agent_notes,
    price: property.price || 0,
    address: {
      street: property.street || '',
      city: property.city || '',
      state: property.state || '',
      zip: property.zip || '',
      country: property.country || 'Malaysia',
    },
    type: property.property_types?.name || property.type || 'Residential',
    subtype: property.subtype || property.property_subtype || '',
    status: property.property_statuses?.name || property.status || 'Available',
    size: property.built_up_area || property.size || 0,
    area: property.built_up_area || property.floor_area || property.land_area || property.size || 0,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    features: {
      bedrooms: property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      squareFeet: property.built_up_area || property.size || property.area || 0,
      landSize: property.land_size || 0
    },
    images: property.property_images 
      ? property.property_images.map((img: any) => 
          img.storage_path ? getImageUrl(img.storage_path) : ''
        ).filter(Boolean)
      : property.images || [],
    createdAt: property.created_at || new Date().toISOString(),
    updatedAt: property.updated_at || new Date().toISOString(),
    featured: property.featured || false,
    listedBy: property.agent_id || 'Unknown',
    agent: { id: property.agent_id || '', name: 'Agent' },
    transactionType: property.transaction_types?.name || property.transactionType || 'Sale',
    stock: property.stock ? property.stock : 
           (property.stock_total ? {
              total: property.stock_total || 0,
              available: property.stock_available || 0,
              reserved: property.stock_reserved || 0,
              sold: property.stock_sold || 0
           } : undefined)
  };
  
  return mappedProperty;
};

// Get public URL for a storage path
export const getImageUrl = (storage_path: string | null) => {
  if (!storage_path) return '/placeholder.svg';
  
  // This function would typically use Supabase to get the URL
  // For now, we'll return a placeholder or the path itself
  try {
    const { publicUrl = '/placeholder.svg' } = { publicUrl: `/api/images/${storage_path}` };
    return publicUrl;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return '/placeholder.svg';
  }
};
