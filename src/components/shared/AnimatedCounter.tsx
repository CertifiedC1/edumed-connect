import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  target: number;
  suffix?: string;
  label: string;
  light?: boolean;
}

export default function AnimatedCounter({ target, suffix = "+", label, light }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className={`text-4xl md:text-5xl font-heading font-bold ${light ? "text-white" : "text-primary"}`}>
        {count}{suffix}
      </div>
      <div className={`mt-2 font-medium ${light ? "text-white/70" : "text-muted-foreground"}`}>{label}</div>
    </motion.div>
  );
}
