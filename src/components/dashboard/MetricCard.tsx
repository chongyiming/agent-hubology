
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { DashboardMetric } from '@/types';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  metric: DashboardMetric;
  className?: string;
}

const MetricCard = ({ metric, className }: MetricCardProps) => {
  // Determine trend based on change if trend is not provided
  const trend = metric.trend || (metric.change ? (metric.change > 0 ? 'up' : 'down') : 'neutral');
  
  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </p>
            <h3 className="text-2xl font-bold text-gradient">
              {metric.value}
            </h3>
          </div>
          {metric.icon && (
            <div className="rounded-full p-2 bg-white/5 flex items-center justify-center">
              {metric.icon}
            </div>
          )}
        </div>
        
        {metric.change !== undefined && (
          <div className="flex items-center">
            {trend === 'up' ? (
              <TrendingUp className="mr-2 h-4 w-4 text-green-400" />
            ) : trend === 'down' ? (
              <TrendingDown className="mr-2 h-4 w-4 text-red-400" />
            ) : null}
            <span
              className={cn(
                "text-sm",
                trend === 'up'
                  ? 'text-green-400'
                  : trend === 'down'
                  ? 'text-red-400'
                  : 'text-muted-foreground'
              )}
            >
              {metric.change > 0 ? '+' : ''}
              {metric.change}%
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
