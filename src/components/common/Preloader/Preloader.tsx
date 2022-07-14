import preloader from '../../../assets/images/Preloader.svg';
import React from 'react';
let Preloader: React.FC = () => {
  return (
    <div>
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
