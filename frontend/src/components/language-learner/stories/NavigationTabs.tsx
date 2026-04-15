import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/button';

interface NavigationTabsProps {
  activeCategory: string;
  myStoriesCount: number;
  onCategoryChange: (category: string) => void;
  onAddStoryClick: () => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeCategory,
  myStoriesCount,
  onCategoryChange,
  onAddStoryClick,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between border-b border-white/10">
        <div className="flex space-x-6">
          <button
            onClick={() => onCategoryChange('discover')}
            className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeCategory === 'discover' || (activeCategory !== 'my-stories' && activeCategory !== 'discover')
                ? 'border-primary-400 text-primary-400'
                : 'border-transparent text-white/60 hover:text-white hover:border-white/30'
            }`}
          >
            Discover Stories
          </button>
          <button
            onClick={() => onCategoryChange('my-stories')}
            className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeCategory === 'my-stories'
                ? 'border-primary-400 text-primary-400'
                : 'border-transparent text-white/60 hover:text-white hover:border-white/30'
            }`}
          >
            My Stories ({myStoriesCount})
          </button>
        </div>
        <Button
          onClick={onAddStoryClick}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white border-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Story
        </Button>
      </div>
    </div>
  );
};
