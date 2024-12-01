import React from "react";
import Image from "next/image";

const Gallery = () => {
  return (
    <div className="flex space-x-3">
      <Image className="rounded-lg"
        src="https://drive.google.com/uc?export=view&id=1O1bpA__J5KCX1tzGFpG2LFJeYJufilM_"
        alt="Google Drive Image"
        width={640}
        height={480}
      />
      <Image
      className="rounded-lg"
        src="https://drive.google.com/uc?export=view&id=15DzXgMhukZ_oyzKuBc6aC8O1en7kDdj9"
        alt="Google Drive Image"
        width={640}
        height={480}
      />
    </div>
  );
};

export default Gallery;
