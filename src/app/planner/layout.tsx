import PlannerSidebar from "@/components/layout/PlannerSidebar/PlannerSidebar";

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <PlannerSidebar />
      {children}
    </div>
  );
}
