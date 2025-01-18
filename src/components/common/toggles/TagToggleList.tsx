import React from 'react';
import { twMerge } from 'tailwind-merge';
import TagToggle from './TagToggle';

interface TagToggleListProps<T> {
  tagList: { id: T; text: string }[];
  onChangeCheckedTagList: (tagId: T) => void;
  className?: string;
}

function TagToggleList<T extends string>({
  tagList,
  onChangeCheckedTagList,
  className,
}: TagToggleListProps<T>) {
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
