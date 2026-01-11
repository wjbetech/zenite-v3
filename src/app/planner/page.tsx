export default function PlannerPage() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Your Planner Hub</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Welcome to your productivity center. Navigate through your calendar, holidays, and daily diary.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">📅 Calendar</h2>
            <p className="text-muted-foreground">View and manage your important dates and events</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">🎉 Holidays</h2>
            <p className="text-muted-foreground">Track religious and national holidays</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">📖 Diary</h2>
            <p className="text-muted-foreground">Your daily planner page with date and week info</p>
          </div>
        </div>
      </div>
    </main>
  );
}
