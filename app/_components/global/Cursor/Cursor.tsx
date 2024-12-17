'use client';

import React from 'react';

function Cursor() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current == null) return;

    let trailer: any = ref.current;

    const animateTrailer = (e: any, interacting: boolean) => {
      let x = e.clientX - trailer.offsetWidth / 2;
      let y = e.clientY - trailer.offsetHeight / 2;

      const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 4 : 1})`,
      };

      trailer.animate(keyframes, {
        duration: 800,
        fill: 'forwards',
      });
    };

    window.onmousemove = (e: any) => {
      const interactable = e.target.closest('.interactable'),
        interacting = interactable !== null;

      animateTrailer(e, interacting);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-3 w-3 items-center justify-center rounded-[20px] border-[0.1em] border-solid border-primary-accent bg-primary-accent mix-blend-difference invert lg:flex"
      ref={ref}
    />
  );
}

export { Cursor };
