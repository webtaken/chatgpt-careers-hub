export function LeftPanelSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-5 w-36 bg-muted rounded" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-3 p-3 border rounded-md">
          <div className="h-14 w-14 bg-muted rounded-md" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-4/5 bg-muted rounded" />
            <div className="h-3 w-1/3 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RightPanelSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="h-5 w-28 bg-muted rounded" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded-md border" />
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-5 w-24 bg-muted rounded" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded-md border" />
        ))}
      </div>
    </div>
  );
}
