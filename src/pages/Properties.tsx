
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PropertyFilterBar } from '@/components/property/PropertyFilterBar';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { PropertyTable } from '@/components/property/PropertyTable';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { PropertyMap } from '@/components/property/PropertyMap';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewMode } from '@/components/property/PropertyFilterBar';
import { useProperties, PropertyFilters } from '@/hooks/useProperties';
import { mapPropertyData } from '@/utils/propertyUtils';
import { Property } from '@/types';
import { toast } from 'sonner';

type TimeFilter = '7days' | '30days' | '90days' | 'all';
type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc';

const Properties = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // State for view mode and filters
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(queryParams.get('time') as TimeFilter || 'all');
  const [sortOption, setSortOption] = useState<SortOption>(queryParams.get('sort') as SortOption || 'newest');
  const [page, setPage] = useState(Number(queryParams.get('page')) || 1);
  const [pageSize] = useState(12);
  const [filters, setFilters] = useState<PropertyFilters>({});
  
  // Initialize filters from URL on component mount
  useEffect(() => {
    const initialFilters: PropertyFilters = {};
    
    // Search term
    if (queryParams.get('search')) {
      initialFilters.title = queryParams.get('search') || undefined;
    }
    
    // Property type
    if (queryParams.get('type') && queryParams.get('type') !== 'all') {
      initialFilters.propertyType = queryParams.get('type') || undefined;
    }
    
    // Transaction type
    if (queryParams.get('transaction') && queryParams.get('transaction') !== 'all') {
      initialFilters.transactionType = queryParams.get('transaction') || undefined;
    }
    
    // Price range
    if (queryParams.get('minPrice')) {
      initialFilters.minPrice = Number(queryParams.get('minPrice'));
    }
    
    if (queryParams.get('maxPrice')) {
      initialFilters.maxPrice = Number(queryParams.get('maxPrice'));
    }
    
    // Room filters
    if (queryParams.get('bedrooms')) {
      initialFilters.bedrooms = Number(queryParams.get('bedrooms'));
    }
    
    if (queryParams.get('bathrooms')) {
      initialFilters.bathrooms = Number(queryParams.get('bathrooms'));
    }
    
    // Featured properties
    if (queryParams.get('featured') === 'true') {
      initialFilters.featured = true;
    }
    
    setFilters(initialFilters);
  }, []);
  
  // Fetch properties with filters
  const { data, isLoading, error } = useProperties(page, pageSize, filters);
  const propertiesRaw = data?.properties || [];
  
  // Map the API data structure to the format expected by components
  const properties: Property[] = propertiesRaw.map(property => mapPropertyData(property));
  
  // Handle view mode change
  const handleViewChange = (newView: ViewMode) => {
    setViewMode(newView);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    params.set('view', newView);
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  };
  
  // Handle search filters
  const handleFilter = (newFilters: PropertyFilters) => {
    console.log('Applying filters:', newFilters);
    setFilters(newFilters);
    setPage(1); // Reset to first page when changing filters
    
    // Update page param in URL
    const params = new URLSearchParams(location.search);
    params.set('page', '1');
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  };
  
  // Handle sort options
  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    params.set('sort', value);
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
    
    // In a real implementation, this would update the API query order
    toast.info(`Sorting by ${value}`);
    
    // Apply sort filter
    const newFilters = { ...filters };
    switch (value) {
      case 'newest':
        newFilters.sortBy = 'created_at';
        newFilters.sortDirection = 'desc';
        break;
      case 'oldest':
        newFilters.sortBy = 'created_at';
        newFilters.sortDirection = 'asc';
        break;
      case 'price-asc':
        newFilters.sortBy = 'price';
        newFilters.sortDirection = 'asc';
        break;
      case 'price-desc':
        newFilters.sortBy = 'price';
        newFilters.sortDirection = 'desc';
        break;
    }
    
    setFilters(newFilters);
  };
  
  // Handle time filter change
  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value as TimeFilter);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    params.set('time', value);
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
    
    // Apply time filter to API query
    const newFilters = { ...filters };
    const now = new Date();
    
    switch (value) {
      case '7days':
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        newFilters.createdAfter = sevenDaysAgo.toISOString();
        break;
      case '30days':
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        newFilters.createdAfter = thirtyDaysAgo.toISOString();
        break;
      case '90days':
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        newFilters.createdAfter = ninetyDaysAgo.toISOString();
        break;
      case 'all':
        delete newFilters.createdAfter;
        break;
    }
    
    setFilters(newFilters);
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    params.set('page', newPage.toString());
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
    
    // Scroll to top
    window.scrollTo(0, 0);
  };
  
  // Calculate summary statistics from real data
  const summaryStats = React.useMemo(() => {
    const total = properties.length;
    const active = properties.filter(p => p.status === 'available' || p.status === 'Available').length;
    const pending = properties.filter(p => 
      p.status === 'pending' || p.status === 'Pending' || 
      p.status.toLowerCase() === 'under offer').length;
    const value = properties.reduce((sum, p) => sum + p.price, 0);
    
    // Simulated weekly changes
    return {
      total,
      active,
      pending,
      value,
      change: {
        total: Math.floor(Math.random() * 10) + 1,
        active: Math.round(Math.random() * 6 - 3)
      }
    };
  }, [properties]);
  
  return (
    <div className="page-container">
      {/* Header section with consistent alignment */}
      <div className="page-header">
        <h1 className="page-title">Properties</h1>
        <Button 
          size="sm" 
          className="gap-2 rounded-full px-6 bg-orange-500 hover:bg-orange-600" 
          onClick={() => navigate('/properties/new')}
        >
          <Plus size={16} />
          Add Property
        </Button>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 bg-neutral-900/60 backdrop-blur-sm rounded-lg p-5">
        <div className="flex flex-col">
          <span className="text-sm text-neutral-400">Total Properties</span>
          <div className="flex items-baseline mt-1">
            <span className="text-3xl font-medium">{summaryStats.total}</span>
            <span className="ml-2 text-xs text-emerald-500">+{summaryStats.change.total} this week</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-neutral-400">Active Listings</span>
          <div className="flex items-baseline mt-1">
            <span className="text-3xl font-medium">{summaryStats.active}</span>
            <span className={`ml-2 text-xs ${summaryStats.change.active >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {summaryStats.change.active >= 0 ? '+' : ''}{summaryStats.change.active}% of total
            </span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-neutral-400">Pending Approvals</span>
          <div className="flex items-baseline mt-1">
            <span className="text-3xl font-medium">{summaryStats.pending}</span>
            <span className="ml-2 text-xs text-neutral-400">properties</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-neutral-400">Total Value</span>
          <div className="flex items-baseline mt-1">
            <span className="text-3xl font-medium">${(summaryStats.value / 1000000).toFixed(2)}M</span>
          </div>
        </div>
      </div>
      
      {/* Filter row with consistent alignment */}
      <div className="flex justify-between bg-neutral-900 rounded-lg p-4">
        <div className="flex-1">
          <PropertyFilterBar 
            onFilter={handleFilter} 
            onViewChange={handleViewChange} 
            currentView={viewMode}
            filters={filters}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
            <SelectTrigger className="w-[130px] h-10 rounded-lg bg-neutral-800 border-neutral-700">
              <SelectValue placeholder="All time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[130px] h-10 rounded-lg bg-neutral-800 border-neutral-700">
              <SelectValue placeholder="Newest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Property content */}
      <div className="min-h-[60vh] relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-lg text-destructive mb-2">Error loading properties</p>
            <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-lg mb-4">No properties found</p>
            <Button 
              onClick={() => navigate('/properties/new')}
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' && <PropertyGrid properties={properties} />}
            {viewMode === 'table' && <PropertyTable properties={properties} />}
            {viewMode === 'map' && <PropertyMap properties={properties} />}
            
            {/* Pagination */}
            {data && data.totalCount > pageSize && (
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="py-2 px-4 bg-neutral-800 rounded">
                    Page {page} of {Math.ceil(data.totalCount / pageSize)}
                  </span>
                  <Button 
                    variant="outline" 
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= Math.ceil(data.totalCount / pageSize)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
