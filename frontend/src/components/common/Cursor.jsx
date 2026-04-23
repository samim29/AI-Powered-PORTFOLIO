import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX - 4 + "px";
      dot.style.top = mouseY - 4 + "px";
    };

    const animate = () => {
      ringX += (mouseX - ringX - 18) * 0.12;
      ringY += (mouseY - ringY - 18) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dot.style.transform = "scale(2.5)";
      ring.style.transform = "scale(1.5)";
      ring.style.borderColor = "rgba(255,77,0,0.9)";
    };
    const onLeaveLink = () => {
      dot.style.transform = "scale(1)";
      ring.style.transform = "scale(1)";
      ring.style.borderColor = "rgba(255,77,0,0.5)";
    };

    window.addEventListener("mousemove", onMove);
    animate();

    const links = document.querySelectorAll("a, button, [role=button]");
    links.forEach((l) => {
      l.addEventListener("mouseenter", onEnterLink);
      l.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
