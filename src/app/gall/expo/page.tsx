import Image from 'next/image';

const Expo = () => {
  const images = [
    '/expos/IMG-20241122-WA0006.jpg',
    '/expos/IMG-20241122-WA0007.jpg',
    '/expos/IMG-20241122-WA0008.jpg',
    '/expos/IMG-20241122-WA0009.jpg',
    '/expos/IMG-20241122-WA0010.jpg',
    '/expos/IMG-20241122-WA0012.jpg',
    '/expos/IMG-20241122-WA0013.jpg',
    '/expos/IMG-20241122-WA0014.jpg',
    '/expos/IMG-20241122-WA0015.jpg',
    '/expos/IMG-20241122-WA0016.jpg',
    '/expos/IMG-20241122-WA0018.jpg',
    '/expos/IMG-20241122-WA0020.jpg',
    '/expos/IMG-20241122-WA0021.jpg',
    '/expos/IMG-20241122-WA0022.jpg',
    '/expos/IMG-20241122-WA0023.jpg',
    '/expos/IMG-20241122-WA0028.jpg',
    '/expos/IMG-20241122-WA0029.jpg',
    '/expos/IMG-20241122-WA0030.jpg',
    '/expos/IMG-20241122-WA0031.jpg',
    '/expos/IMG-20241122-WA0034.jpg',
    '/expos/IMG-20241122-WA0042.jpg',
    '/expos/IMG-20241122-WA0043.jpg',
    '/expos/IMG-20241122-WA0044.jpg',
    '/expos/IMG-20241122-WA0045.jpg',
    '/expos/IMG-20241122-WA0048.jpg',
    '/expos/IMG-20241122-WA0051.jpg',
    '/expos/IMG-20241122-WA0052.jpg',
    '/expos/IMG-20241122-WA0056.jpg',
    '/expos/IMG-20241122-WA0059.jpg',
    '/expos/IMG-20241122-WA0060.jpg',
    '/expos/IMG-20241122-WA0062.jpg',
    '/expos/IMG-20241122-WA0063.jpg',
    '/expos/IMG-20241122-WA0065.jpg',
    '/expos/IMG-20241122-WA0066.jpg',
    '/expos/IMG-20241122-WA0067.jpg',
    '/expos/IMG-20241122-WA0069.jpg',
    '/expos/IMG-20241122-WA0075.jpg',
    '/expos/IMG-20241122-WA0076.jpg',
    '/expos/IMG-20241122-WA0077.jpg',
    '/expos/IMG-20241122-WA0078.jpg',
    '/expos/IMG-20241122-WA0078.jpg',
    '/expos/IMG-20241122-WA0080.jpg',
    '/expos/IMG-20241122-WA0082.jpg',
    '/expos/IMG-20241122-WA0083.jpg',
    '/expos/IMG-20241122-WA0084.jpg',
    '/expos/IMG-20241122-WA0093.jpg',
    '/expos/IMG-20241122-WA0097.jpg',
    '/expos/IMG-20241122-WA0101.jpg',
    '/expos/IMG-20241122-WA0112.jpg',
    '/expos/IMG-20241122-WA0123.jpg',
    '/expos/IMG-20241122-WA0132.jpg',
    '/expos/IMG-20241122-WA0133.jpg',
    '/expos/IMG-20241122-WA0135.jpg',
    '/expos/IMG-20241122-WA0136.jpg',
    '/expos/IMG-20241122-WA0138.jpg',
    '/expos/IMG-20241122-WA0139.jpg',
    '/expos/IMG-20241122-WA0140.jpg'
  ];

  return (
    <div className="text-center mb-10 pt-20">
      <h2 className="text-3xl font-semibold mb-5">Expos</h2>
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

export default Expo;
