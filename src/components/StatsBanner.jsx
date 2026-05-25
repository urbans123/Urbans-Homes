import { useState, useEffect } from "react";
import "../styles/stats.css";

const stats = [
  { label: "Años de experiencia", target: 10, suffix: "+" },
  { label: "Propiedades gestionadas", target: 480, suffix: "+" },
  { label: "Clientes satisfechos", target: 1200, suffix: "+" },
  { label: "Tasa de satisfacción", target: 98, suffix: "%" },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1600;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(Math.floor(target));
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [hasAnimated, target]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 },
    );

    const element = document.querySelector(`[data-target="${target}"]`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, target]);

  return (
    <span data-target={target}>
      {count}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
}

export default function StatsBanner() {
  return (
    <section className="stats-banner">
      {stats.map((stat, index) => (
        <div key={index} className="stat">
          <span className="stat-num">
            <AnimatedCounter target={stat.target} suffix={stat.suffix} />
          </span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
