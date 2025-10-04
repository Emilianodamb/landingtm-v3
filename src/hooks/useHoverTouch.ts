import { useState } from 'react';

/**
 * Hook personalizado para manejar hover y touch - Réplica del useHoverTouch original
 */
export function useHoverTouch() {
  const [isActive, setIsActive] = useState(false);

  const hoverProps = {
    onMouseEnter: () => setIsActive(true),
    onMouseLeave: () => setIsActive(false),
    onTouchStart: () => setIsActive(true),
    onTouchEnd: () => setIsActive(false),
  };

  return { isActive, hoverProps };
}