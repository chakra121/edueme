// components/tech.tsx
import Image from 'next/image';

const Tech = () => {
  const images = [
    '/Tech Tours/IMG-20241122-WA0026.jpg',
    '/Tech Tours/IMG-20241122-WA0027.jpg',
    '/Tech Tours/IMG-20241122-WA0033.jpg',
    '/Tech Tours/IMG-20241122-WA0053.jpg',
    '/Tech Tours/IMG-20241122-WA0057.jpg',
    '/Tech Tours/IMG-20241122-WA0070.jpg',
    '/Tech Tours/IMG-20241122-WA0071.jpg',
    '/Tech Tours/IMG-20241122-WA0072.jpg',
    '/Tech Tours/IMG-20241122-WA0073.jpg',
    '/Tech Tours/IMG-20241122-WA0074.jpg',
    '/Tech Tours/IMG-20241122-WA0088.jpg',
    '/Tech Tours/IMG-20241122-WA0089.jpg'
  ];

  return (
    <div className="text-center mb-10 pt-20">
      <h2 className="text-3xl font-semibold mb-5">Tech Tours</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {images.map((src, index) => (
          <div key={index} className="w-1/3 md:w-1/4 p-2">
            <div className="w-full h-72 relative rounded-lg shadow-lg border-2 border-gray-800 bg-gray-900 transition duration-500 ease-in-out hover:shadow-blue-500/50 hover:border-blue-500">
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tech;
