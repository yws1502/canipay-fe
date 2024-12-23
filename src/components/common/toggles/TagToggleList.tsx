import React from 'react';
import TagToggle from './TagToggle';

interface TagToggleListProps {
  tagList: { id: string; text: string }[];
  onChangeCheckedTagList: (tagId: string) => void;
}

function TagToggleList({ tagList, onChangeCheckedTagList }: TagToggleListProps) {
  return (
    <div className='flex gap-1'>
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
