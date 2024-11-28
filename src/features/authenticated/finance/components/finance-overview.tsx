import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle2, Circle } from "lucide-react";
import React, { useState } from "react";

export type TPaymentStatus = "Fully Paid" | "Partially Paid" | "Pending";

export type TPaymentPeriod = {
  name: string;
  status: TPaymentStatus;
  amountPaid: number;
  totalAmount: number;
  dueDate?: string;
};

export type TFinanceOverviewProps = {
  totalPaid: number;
  quarterlyPayments: TPaymentPeriod[];
  monthlyPayments: TPaymentPeriod[];
};

const FinanceOverview: React.FC<TFinanceOverviewProps> = ({
  totalPaid,
  quarterlyPayments,
  monthlyPayments,
}) => {
  const [activeTab, setActiveTab] = useState<"quarterly" | "monthly">(
    "quarterly"
  );

  const getStatusIcon = (status: TPaymentStatus) => {
    switch (status) {
      case "Fully Paid":
        return <CheckCircle2 className="text-green-500" />;
      case "Partially Paid":
        return <Circle className="text-orange-500" />;
      case "Pending":
        return <Circle className="text-gray-400" />;
    }
  };

  const renderPaymentPeriods = (periods: TPaymentPeriod[]) => {
    return periods.map((period, index) => (
      <div key={index} className="mb-6 last:mb-0">
        <div className="flex flex-col justify-between mb-2 sm:flex-row sm:items-center">
          <div className="flex items-center mb-2 sm:mb-0">
            {getStatusIcon(period.status)}
            <span className="ml-2 font-medium">{period.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="mb-1 text-sm text-gray-500 sm:mb-0 sm:mr-4">
              Due: {period.dueDate}
            </span>
            <span className="text-sm font-semibold">
              ₱{period.amountPaid.toFixed(2)} / ₱{period.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Progress
                  value={(period.amountPaid / period.totalAmount) * 100}
                  className="h-3 sm:h-4"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {((period.amountPaid / period.totalAmount) * 100).toFixed(1)}%
                paid
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">Finance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "quarterly" | "monthly")
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="quarterly" className="text-sm">
              Quarterly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="text-sm">
              Monthly
            </TabsTrigger>
          </TabsList>
          <TabsContent value="quarterly">
            {renderPaymentPeriods(quarterlyPayments)}
          </TabsContent>
          <TabsContent value="monthly">
            {renderPaymentPeriods(monthlyPayments)}
          </TabsContent>
        </Tabs>
        <div className="mt-8 text-left">
          <span className="block mb-1 text-sm text-gray-500">Paid To Date</span>
          <h3 className="flex items-center justify-start text-3xl font-medium sm:text-4xl text-primary">
            ₱{totalPaid.toFixed(2)}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinanceOverview;
