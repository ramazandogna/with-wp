export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-foreground/30 border-border/20 text-background flex h-20 w-full items-center rounded-lg px-8 shadow-lg backdrop-blur-lg">
      <h1 className="text-3xl font-bold">{children}</h1>
    </div>
  );
}
