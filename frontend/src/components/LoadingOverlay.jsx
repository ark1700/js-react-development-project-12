import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, MessageSquare } from "lucide-react";

export const LoadingOverlay = ({ loadingText, isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true)
    } else {
      // Small delay before starting the exit animation
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none translate-y-8",
      )}
    >
      <div className="flex flex-col items-center max-w-md text-center px-4 transition-transform duration-500">
        <div className="relative mb-6">
          <div className="relative z-10 p-4 rounded-full bg-white dark:bg-slate-800 shadow-lg">
            <div className="relative">
              <MessageSquare className="h-12 w-12 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-md">
          <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
          <p className="text-sm font-medium">{loadingText || "Загрузка..."}</p>
        </div>
      </div>
    </div>
  );
};
