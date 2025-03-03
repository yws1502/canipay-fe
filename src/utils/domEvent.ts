export const registerMouseDownDrag = <T extends Element>(
  onDragChange: (deltaX: number, deltaY: number) => void,
  direction: 'col' | 'row',
  stopPropagation?: boolean
) => {
  const onMouseDown = (clickEvent: React.MouseEvent<T, MouseEvent>) => {
    if (stopPropagation) clickEvent.stopPropagation();

    document.querySelector('body')?.classList.add(`cursor-${direction}-resize`);

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const deltaX = moveEvent.screenX - clickEvent.screenX;
      const deltaY = moveEvent.screenY - clickEvent.screenY;
      onDragChange(deltaX, deltaY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.querySelector('body')?.classList.remove(`cursor-${direction}-resize`);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const onTouchStart = (touchEvent: React.TouchEvent<T>) => {
    if (stopPropagation) touchEvent.stopPropagation();

    const handleTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault();

      const deltaX = moveEvent.touches[0].screenX - touchEvent.touches[0].screenX;
      const deltaY = moveEvent.touches[0].screenY - touchEvent.touches[0].screenY;
      onDragChange(deltaX, deltaY);
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  return { onMouseDown, onTouchStart };
};
