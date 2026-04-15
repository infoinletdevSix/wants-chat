import React from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

interface CreateCustomFoodProps {
  onCreateClick: () => void;
}

const CreateCustomFood: React.FC<CreateCustomFoodProps> = ({ onCreateClick }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary-500/10 to-primary-500/10 border border-primary-500/20">
      <div className="text-center space-y-3">
        <Icon path={mdiPlus} size={1.5} className="text-primary-400 mx-auto" />
        <h3 className="font-semibold text-white">Can't find what you're looking for?</h3>
        <p className="text-sm text-white/60">Create a custom food entry</p>
        <Button onClick={onCreateClick} className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
          Create Custom Food
        </Button>
      </div>
    </Card>
  );
};

export default CreateCustomFood;