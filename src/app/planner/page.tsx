import PlannerSidebar from "@/components/layout/PlannerSidebar/PlannerSidebar";

export default function PlannerPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <PlannerSidebar />
      <main className="flex-1 overflow-y-auto p-8">Planner content here.</main>
    </div>
  );
}
