"use client";

import { useRef, useEffect } from "react";

import gsap from "gsap";

export default function GridAnimation() {
  // Refs to maintain state across renders
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Reference to canvas element
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined); // For debouncing resize events
  const mousePos = useRef({ x: 0, y: 0 }); // Track current mouse position
  const animationFrameId = useRef<number | undefined>(undefined); // For cleaning up animation frame
  const timeRef = useRef<number>(0); // Track animation time for wave movement

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const GRID_SIZE = 35; // Distance between grid lines in pixels
    const WAVE_AMPLITUDE = 15; // Maximum height of waves
    const WAVE_SPREAD = 350; // Radius of wave effect around mouse
    const WAVE_FREQUENCY = 0.03; // How tight/loose the waves are
    const WAVE_SPEED = 1; // How fast the waves animate

    // Setup GSAP animation timeline for continuous wave motion
    // https://gsap.com/docs/v3/GSAP/Timeline
    const timeline = gsap.timeline({ repeat: -1 });

    // Animate the time reference to create a continuous wave motion
    // https://gsap.com/docs/v3/GSAP/Timeline/to()
    timeline.to(timeRef, {
      current: Math.PI * 2, // Animate from 0 to 2π (full circle)
      duration: 2,
      ease: "none", // https://gsap.com/docs/v3/Eases
      onUpdate: () => {
        // Reset time when reaching full circle
        if (timeRef.current >= Math.PI * 2) {
          timeRef.current = 0;
        }
      },
    });

    const drawGrid = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // Draw vertical lines of the grid
      for (let x = 0; x <= width; x += GRID_SIZE) {
        // Set line style
        ctx.strokeStyle = "#dcdcdc";
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        // Track previous point for smooth curves
        let lastY = 0;
        let lastOffset = 0;

        // Draw each vertical line point by point
        for (let y = 0; y <= height; y += 2) {
          // Calculate distance from current point to mouse
          const dx = x - mousePos.current.x;
          const dy = y - mousePos.current.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate wave offset based on distance from mouse
          let offset = 0;
          if (distance < WAVE_SPREAD) {
            const waveIntensity = 1 - distance / WAVE_SPREAD; // Fade out effect
            offset =
              WAVE_AMPLITUDE * Math.sin(distance * WAVE_FREQUENCY - timeRef.current * WAVE_SPEED) * waveIntensity;
          }

          // Draw smooth curves between points
          if (y === 0) {
            // Move to the starting point of the line
            // https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/moveTo
            ctx.moveTo(x + offset, y);
          } else {
            // Use bezier curves for smooth transitions
            const cp1x = x + lastOffset;
            const cp1y = lastY + (y - lastY) / 3;
            const cp2x = x + offset;
            const cp2y = y - (y - lastY) / 3;

            // Draw a cubic Bézier curve
            // https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x + offset, y);
          }

          // Store current point for next iteration
          lastY = y;
          lastOffset = offset;
        }

        // Draw the line
        // https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/stroke
        ctx.stroke();
      }

      // Draw horizontal lines of the grid (same logic as vertical lines)
      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.strokeStyle = "#dcdcdc";
        ctx.lineWidth = 0.5;

        // Start a new path for each horizontal line
        // https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/beginPath
        ctx.beginPath();

        // Track previous point for smooth curves
        let lastX = 0;
        let lastOffset = 0;

        for (let x = 0; x <= width; x += 2) {
          // Calculate the distance from the current point to the mouse
          const dx = x - mousePos.current.x;
          const dy = y - mousePos.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let offset = 0;

          // If the distance from the current point to the mouse is less than the wave spread, calculate the wave offset
          if (distance < WAVE_SPREAD) {
            const waveIntensity = 1 - distance / WAVE_SPREAD;
            offset =
              WAVE_AMPLITUDE * Math.sin(distance * WAVE_FREQUENCY - timeRef.current * WAVE_SPEED) * waveIntensity;
          }

          // If the current point is the first point of the line, move to it
          if (x === 0) {
            // Move to the starting point of the line
            // https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/moveTo
            ctx.moveTo(x, y + offset);
          } else {
            const cp1x = lastX + (x - lastX) / 3;
            const cp1y = y + lastOffset;
            const cp2x = x - (x - lastX) / 3;
            const cp2y = y + offset;

            // Draw a cubic Bézier curve
            // https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y + offset);
          }

          // Store the current point for the next iteration
          lastX = x;
          lastOffset = offset;
        }

        // Draw the line
        // https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/stroke
        ctx.stroke();
      }
    };

    // Animation loop function
    const animate = () => {
      drawGrid();

      // Request the next animation frame
      // https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Handle canvas setup and resize
    const setupCanvas = () => {
      // Set the canvas size to the window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Clear the canvas
      // https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/clearRect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the grid
      drawGrid();
    };

    // Update mouse position relative to canvas
    const handleMouseMove = (e: MouseEvent) => {
      // Get the bounding rectangle of the canvas
      // https://developer.mozilla.org/docs/Web/API/Element/getBoundingClientRect
      const rect = canvas.getBoundingClientRect();

      // Update the mouse position relative to the canvas
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Initialize everything
    setupCanvas();
    animate();

    // Move the event listener to window instead of canvas
    window.addEventListener("mousemove", handleMouseMove);

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Debounce the resize event
      resizeTimeoutRef.current = setTimeout(() => {
        setupCanvas();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: "white",
      }}
    />
  );
}
