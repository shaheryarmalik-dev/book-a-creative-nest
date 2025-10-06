import { CheckCircle2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTIVITY_CATEGORIES, type LocationActivities } from "@/data/locations";

interface LocationActivitiesProps {
  activities: LocationActivities;
  showTitle?: boolean;
  compact?: boolean;
}

const LocationActivities = ({ activities, showTitle = true, compact = false }: LocationActivitiesProps) => {
  const categoryKeys = Object.keys(ACTIVITY_CATEGORIES) as (keyof typeof ACTIVITY_CATEGORIES)[];

  if (compact) {
    // Compact view - just show category names with checkmarks
    const activeCategories = categoryKeys.filter(key => 
      activities[key] && activities[key]!.length > 0
    );

    return (
      <div className="flex flex-wrap gap-2">
        {activeCategories.map((categoryKey) => {
          const category = ACTIVITY_CATEGORIES[categoryKey];
          return (
            <div
              key={categoryKey}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm"
            >
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">{category.name}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Card className="bg-slate-50 border-slate-200">
      {showTitle && (
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-900">Activities</CardTitle>
        </CardHeader>
      )}
      <CardContent className={showTitle ? "" : "pt-6"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryKeys.map((categoryKey) => {
            const category = ACTIVITY_CATEGORIES[categoryKey];
            const selectedActivities = activities[categoryKey] || [];
            const hasActivities = selectedActivities.length > 0;

            return (
              <div key={categoryKey} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    hasActivities 
                      ? 'bg-green-600' 
                      : 'bg-slate-300'
                  }`}>
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <h3 className={`font-semibold text-base ${
                    hasActivities 
                      ? 'text-slate-900' 
                      : 'text-slate-400'
                  }`}>
                    {category.name}
                  </h3>
                </div>
                <div className="space-y-2 ml-8">
                  {category.activities.map((activity) => {
                    const isSelected = selectedActivities.includes(activity);
                    return (
                      <div key={activity} className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-4 h-4 rounded border ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'bg-white border-slate-300'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className={`text-sm ${
                          isSelected 
                            ? 'text-slate-700 font-medium' 
                            : 'text-slate-400'
                        }`}>
                          {activity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationActivities;

