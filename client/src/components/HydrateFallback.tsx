// simple loading screen while loader loading data

const HydrateFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-text-muted text-sm">Loading...</p>
    </div>
  );
};

export default HydrateFallback;