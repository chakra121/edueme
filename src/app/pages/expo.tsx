// components/expo.tsx
import Image from 'next/image';

const Expo = () => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-semibold mb-5">Expo</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        <div className="w-1/3 md:w-1/4 p-2">
          <div className="w-full h-72 relative">
            <Image src="/expos/IMG-20241122-WA0006.jpg" alt="Image 1" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 p-2">
          <div className="w-full h-72 relative">
            <Image src="/expos/IMG-20241122-WA0007.jpg" alt="Image 2" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 p-2">
          <div className="w-full h-72 relative">
            <Image src="/expos/IMG-20241122-WA0008.jpg" alt="Image 3" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 p-2">
          <div className="w-full h-72 relative">
            <Image src="/expos/IMG-20241122-WA0009.jpg" alt="Image 4" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 p-2">
          <div className="w-full h-72 relative">
            <Image src="/expos/IMG-20241122-WA0010.jpg" alt="Image 5" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 p-2">
          <div className="w-full h-72 relative">
            <Image src="/expos/IMG-20241122-WA0044.jpg" alt="Image 6" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 p-2">
          <div className="w-full h-72 relative">
            <Image src="/expos/IMG-20241122-WA0012.jpg" alt="Image 7" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 p-2">
          <div className="w-full h-72 relative">
            <Image src="/expos/IMG-20241122-WA0013.jpg" alt="Image 8" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expo;
