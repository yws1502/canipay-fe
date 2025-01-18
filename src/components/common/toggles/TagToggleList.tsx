import React from 'react';
import { twMerge } from 'tailwind-merge';
import TagToggle from './TagToggle';

interface TagToggleListProps {
  tagList: { id: string; text: string }[];
  onChangeCheckedTagList: (tagId: string) => void;
  className?: string;
}

function TagToggleList({ tagList, onChangeCheckedTagList, className }: TagToggleListProps) {
  return (
    <div className={twMerge('inline-flex gap-1', className)}>
      {tagList.map((tag) => {
        return (
          <TagToggle key={tag.id} id={tag.id} onChange={onChangeCheckedTagList}>
            {tag.text}
          </TagToggle>
        );
      })}
    </div>
  );
}

export default TagToggleList;
