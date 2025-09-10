'use client';
import React from 'react';
import { cn } from '@/app/_utils';
import { useQueryState } from 'nuqs';

interface Props {
  postType?: 'project' | 'post' | undefined;
  tags: string[];
  types: string[];
  currentTag: string;
  currentType: string;
  setCurrentTag: (tag: string) => void;
  setCurrentType: (type: string) => void;
}

const tagFormatter = (tag: string) => {
  return tag?.toLowerCase().split(' ').join('-');
};

export default function ArchiveSidebar({ 
  postType, 
  tags, 
  types, 
  currentTag, 
  currentType, 
  setCurrentTag, 
  setCurrentType 
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
      

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {postType === 'project' ? 'Filter by Technology' : 'Filter by Category'}
          </h4>
          <div className="space-y-2">
            {tags.map((tag, i) => (
              <button
                key={i}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200',
                  currentTag === tagFormatter(tag)
                    ? 'bg-primary-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
                onClick={() => {
                  setCurrentTag(tagFormatter(tag));
                }}
              >
                {tag === 'all' ? 'All' : tag?.split('-').join(' ')}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
