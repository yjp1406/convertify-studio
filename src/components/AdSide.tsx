const AdSide = () => {
  return (
    <div className="sticky top-4 w-full bg-muted/30 border border-border rounded-lg p-6 text-center">
      <div className="text-sm text-muted-foreground mb-2">
        Advertisement
      </div>
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-xs text-muted-foreground">
          300 x 600 - Sidebar Ad
        </div>
      </div>
      {/* Paste Google AdSense code here */}
    </div>
  );
};

export default AdSide;
