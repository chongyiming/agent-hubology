
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, SortDesc, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyTable } from '@/components/property/PropertyTable';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { useProperties } from '@/hooks/useProperties';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminProperties = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  
  // Apply filters
  const filters = {
    ...(searchTerm && { title: searchTerm }),
    ...(selectedPropertyType !== 'all' && { propertyType: selectedPropertyType })
  };
  
  const { data, isLoading, error } = useProperties(page, pageSize, filters);
  const properties = data?.properties || [];
  const totalCount = data?.totalCount || 0;

  // Handle property type change
  const handlePropertyTypeChange = (value: string) => {
    setSelectedPropertyType(value);
    setPage(1); // Reset to first page when changing filters
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search term state is already set via onChange, so just prevent default form submission
    setPage(1); // Reset to first page when searching
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Link to="/properties/new">
          <Button className="mt-3 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
        </Link>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search properties..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" type="button" onClick={() => {
                setSearchTerm('');
                setSelectedPropertyType('all');
                setPage(1);
              }}>
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show:</span>
            <Select 
              value={selectedPropertyType} 
              onValueChange={handlePropertyTypeChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
                <SelectItem value="Land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading properties...</span>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-destructive">
            <p>Error loading properties. Please try again.</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-10">
            <p>No properties found. Try adjusting your filters or create a new property.</p>
            <Link to="/properties/new">
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add New Property
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <TabsContent value="grid">
              <PropertyGrid properties={properties} />
            </TabsContent>
            
            <TabsContent value="table">
              <PropertyTable properties={properties} />
            </TabsContent>
          </>
        )}
        
        {totalCount > pageSize && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="py-2 px-4 bg-muted rounded">
                Page {page} of {Math.ceil(totalCount / pageSize)}
              </span>
              <Button 
                variant="outline" 
                onClick={() => setPage(p => p + 1)}
                disabled={page >= Math.ceil(totalCount / pageSize)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default AdminProperties;
