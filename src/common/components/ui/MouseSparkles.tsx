import { useEffect, useRef } from "react";
import "./MouseSparkles.css";

const MAX_SPARKLES = 50;

/**
 * A React-safe version of the legacy "Tinkerbell Magic Sparkle" script.
 * It owns its DOM nodes and removes them when the layout unmounts.
 */
const MouseSparkles = () => {
	const layerRef = useRef<HTMLDivElement>(null);
	const lastPositionRef = useRef({ x: -100, y: -100 });
	const lastSpawnRef = useRef(0);

	useEffect(() => {
		const layer = layerRef.current;
		if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const createSparkle = (x: number, y: number) => {
			if (layer.childElementCount >= MAX_SPARKLES) return;

			const sparkle = document.createElement("span");
			const hue = Math.floor(Math.random() * 35) + 30;
			sparkle.className = "mouse-sparkle";
			sparkle.textContent = "✦";
			sparkle.style.left = `${x + (Math.random() - 0.5) * 12}px`;
			sparkle.style.top = `${y + (Math.random() - 0.5) * 12}px`;
			sparkle.style.color = `hsl(${hue} 100% 58%)`;
			sparkle.style.setProperty("--drift", `${(Math.random() - 0.5) * 34}px`);
			layer.appendChild(sparkle);
			sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
		};

		const handlePointerMove = (event: PointerEvent) => {
			const now = performance.now();
			const last = lastPositionRef.current;
			const distance = Math.hypot(event.clientX - last.x, event.clientY - last.y);

			// Keep the effect lively without creating a node for every browser event.
			if (now - lastSpawnRef.current < 48 || distance < 7) return;
			lastPositionRef.current = { x: event.clientX, y: event.clientY };
			lastSpawnRef.current = now;
			createSparkle(event.clientX, event.clientY);
		};

		window.addEventListener("pointermove", handlePointerMove, { passive: true });
		return () => window.removeEventListener("pointermove", handlePointerMove);
	}, []);

	return <div ref={layerRef} className="mouse-sparkle-layer" aria-hidden="true" />;
};

export default MouseSparkles;
