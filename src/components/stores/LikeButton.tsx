import React, { MouseEvent } from 'react';
import LikeFilledIcon from '@/assets/icons/like-filled.svg';
import LikeOutlinedIcon from '@/assets/icons/like-outlined.svg';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

function LikeButton({ isLiked, likeCount, onClick }: LikeButtonProps) {
  return (
    <button
      type='button'
      className='flex items-center gap-1 hover:opacity-80 active:opacity-60'
      onClick={onClick}
    >
      {isLiked ? (
        <LikeFilledIcon width={14} height={14} className='fill-tertiary' />
      ) : (
        <LikeOutlinedIcon width={14} height={14} className='fill-tertiary' />
      )}

      <span>{likeCount.toString().padStart(2, '0')}</span>
    </button>
  );
}

export default LikeButton;
