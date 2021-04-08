import React from 'react';
import { Button } from 'primereact/button';

const SaveButton = ({ isSubmitting }) => (
  <div>
    <Button
      label="Save"
      icon={`pi ${isSubmitting ? 'pi-spin pi-spinner' : 'pi-save'}`}
      type="submit"
      disabled={isSubmitting}
    />
  </div>
);

export default SaveButton;