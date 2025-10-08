import { useIsMutating, useIsFetching } from "@tanstack/react-query";
import { useNavigation } from "react-router";

export default function GlobalLoadingSpinner() {
  const isMutating = useIsMutating();
  // const isFetching = useIsFetching();
  // const navigation = useNavigation();
  //MAYBE REMOVE SPINNER EVENT FROM [SWITCHTASKS, CREATETASKS]
  const isLoading = isMutating > 0;
  // isMutating > 0 || isFetching > 0 || navigation.state === "loading";

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse"></div>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
