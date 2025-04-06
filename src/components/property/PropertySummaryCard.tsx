
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, Ruler, Home } from 'lucide-react';
import { getPropertyTypeIcon } from '@/utils/propertyIconUtils';
import PropertyGallery from './PropertyGallery';

interface PropertySummaryCardProps {
  property: any;
  propertyImages?: string[];
  propertyType: string;
}

const PropertySummaryCard: React.FC<PropertySummaryCardProps> = ({ 
  property, 
  propertyImages = [], 
  propertyType 
}) => {
  if (!property) return null;

  const formattedPrice = property.price && Number(property.price) > 0
    ? property.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      })
    : null;
  
  const formattedRentalRate = property.rental_rate && Number(property.rental_rate) > 0
    ? property.rental_rate.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }) + '/month'
    : null;

  return (
    <Card className="mb-6 overflow-hidden bg-card border-neutral-800/60">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gallery section - Takes up 2/3 of the card */}
          <div className="lg:col-span-2 p-6">
            <PropertyGallery 
              propertyId={property.id} 
              images={propertyImages} 
              title={property.title || 'Property'} 
            />
          </div>
          
          {/* Property info section - Takes up 1/3 of the card */}
          <div className="lg:col-span-1 p-6 border-l border-neutral-800/30">
            <div className="space-y-6">
              {/* Property type and transaction type */}
              <div>
                <div className="flex items-center mb-3">
                  {getPropertyTypeIcon(propertyType)}
                  <Badge variant="outline" className="ml-2">{propertyType}</Badge>
                  {property.transaction_types?.name && (
                    <Badge variant="secondary" className="ml-2">{property.transaction_types.name}</Badge>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold">{formattedPrice || formattedRentalRate}</h2>
              </div>
              
              {/* Property details */}
              <div className="space-y-3">
                {property.bedrooms > 0 && (
                  <div className="flex items-center">
                    <BedDouble className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
                  </div>
                )}
                
                {property.bathrooms > 0 && (
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{property.bathrooms} Bathroom{property.bathrooms !== 1 ? 's' : ''}</span>
                  </div>
                )}
                
                {(property.built_up_area > 0 || property.land_area > 0) && (
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>
                      {property.built_up_area > 0 
                        ? `${property.built_up_area.toLocaleString()} sqft` 
                        : `${property.land_area.toLocaleString()} sqft land`}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Location */}
              {property.street && (
                <div className="pt-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                  <p className="text-sm">
                    {property.street}
                    {property.city && `, ${property.city}`}
                    {property.state && `, ${property.state}`}
                    {property.zip && ` ${property.zip}`}
                  </p>
                </div>
              )}
              
              {/* Description */}
              {property.description && (
                <div className="pt-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm">{property.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertySummaryCard;
