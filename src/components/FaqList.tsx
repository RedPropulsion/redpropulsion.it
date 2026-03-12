import { FaqItem } from "./FaqItem";

export function FaqList({ items }: { items: { question: string, answer: string }[] }) {
    return (
        <div className="grid gap-4 max-w-3xl mx-auto">
            {items.map((item, i) => (
                <div 
                    key={i} 
                    className="animate-fade-in-up" 
                    style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                >
                    <FaqItem {...item} />
                </div>
            ))}
        </div>
    );
}
