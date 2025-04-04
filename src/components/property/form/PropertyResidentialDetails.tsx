
import React from 'react';
import { usePropertyForm } from '@/context/PropertyFormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PropertyResidentialDetails: React.FC = () => {
  const { state, updateFormData } = usePropertyForm();
  const formData = state.formData;
  
  // Type guard to ensure we only access residential properties
  if (formData.propertyType !== 'Residential') return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Residential Property Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms || 0}
            onChange={(e) => updateFormData({ bedrooms: Number(e.target.value) })}
            min={0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms || 0}
            onChange={(e) => updateFormData({ bathrooms: Number(e.target.value) })}
            min={0}
            step="0.5"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="builtUpArea">Built-up Area (sq ft)</Label>
          <Input
            id="builtUpArea"
            type="number"
            value={formData.builtUpArea || 0}
            onChange={(e) => updateFormData({ builtUpArea: Number(e.target.value) })}
            min={0}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="furnishingStatus">Furnishing Status</Label>
          <Select
            value={formData.furnishingStatus || 'Unfurnished'}
            onValueChange={(value) => updateFormData({ furnishingStatus: value as 'Unfurnished' | 'Partially Furnished' | 'Fully Furnished' })}
          >
            <SelectTrigger id="furnishingStatus">
              <SelectValue placeholder="Select furnishing status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Unfurnished">Unfurnished</SelectItem>
              <SelectItem value="Partially Furnished">Partially Furnished</SelectItem>
              <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="constructionYear">Year Built</Label>
          <Input
            id="constructionYear"
            type="number"
            value={formData.constructionYear || ''}
            onChange={(e) => updateFormData({ constructionYear: Number(e.target.value) })}
            min={1900}
            max={new Date().getFullYear() + 5}
            placeholder="Year built"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyResidentialDetails;
