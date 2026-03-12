export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] bg-background-dark/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
            <div className="flex flex-col items-center gap-4">
                {/* Techy scanning circle */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" style={{ animationDuration: '1.5s' }} />
                    <div className="absolute inset-2 rounded-full border-r-2 border-white/40 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                    {/* Inner dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                </div>
                <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] font-bold animate-pulse">
                    Loading Data
                </div>
            </div>
        </div>
    );
}
