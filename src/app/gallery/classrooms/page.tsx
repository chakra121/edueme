import Image from 'next/image';

const Class = () => {
  const images = [
    '/Classroom Tech/IMG-20241122-WA0001.jpg',
    '/Classroom Tech/IMG-20241122-WA0002.jpg',
    '/Classroom Tech/IMG-20241122-WA0003.jpg',
    '/Classroom Tech/IMG-20241122-WA0024.jpg',
    '/Classroom Tech/IMG-20241122-WA0025.jpg',
    '/Classroom Tech/IMG-20241122-WA0035.jpg',
    '/Classroom Tech/IMG-20241122-WA0036.jpg',
    '/Classroom Tech/IMG-20241122-WA0037.jpg',
    '/Classroom Tech/IMG-20241122-WA0038.jpg',
    '/Classroom Tech/IMG-20241122-WA0085.jpg',
    '/Classroom Tech/IMG-20241122-WA0086.jpg',
    '/Classroom Tech/IMG-20241122-WA0087.jpg',
    '/Classroom Tech/IMG-20241122-WA0090.jpg',
    '/Classroom Tech/IMG-20241122-WA0091.jpg',
    '/Classroom Tech/IMG-20241122-WA0092.jpg',
    '/Classroom Tech/IMG-20241122-WA0099.jpg',
    '/Classroom Tech/IMG-20241122-WA0100.jpg',
    '/Classroom Tech/IMG-20241122-WA0106.jpg',
    '/Classroom Tech/IMG-20241122-WA0124.jpg',
    '/Classroom Tech/IMG-20241122-WA0125.jpg',
    '/Classroom Tech/IMG-20241122-WA0126.jpg',
    '/Classroom Tech/IMG-20241122-WA0128.jpg',
    '/Classroom Tech/IMG-20241122-WA0129.jpg',
    '/Classroom Tech/IMG-20241122-WA0130.jpg',
    '/Classroom Tech/IMG-20241122-WA0131.jpg',
    '/Classroom Tech/IMG-20241122-WA0134.jpg'
  ];

  return (
    <div className="text-center mb-10 pt-20">
      <h2 className="text-3xl font-semibold mb-5">Classroom Tech</h2>
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

export default Class;
