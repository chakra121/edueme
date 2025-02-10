const MOFC = () => {
    const images = [
      "mofc.png",
      "mofc.png",
      "mofc.png",
      "mofc.png"
    ];
  
    return (
      <section className="flex flex-col items-center justify-center py-16 bg-black text-white">
        <h2 className="text-4xl font-bold text-center mb-10">Mission of Curriculum</h2>
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative w-[8cm] h-[8cm] [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-lg [backface-visibility:hidden]"
                  style={{ backgroundImage: `url('${image}')` }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <img src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png" alt="Arrow" className="mt-6" />
                  </div>
                </div>
                {/* Back Side */}
                <div className="absolute inset-0 bg-[#e3b6b5] rounded-lg flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-2xl font-bold font-impact">Lorem Ipsum</h3>
                  <p className="text-lg text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad labore autem illum, saepe vero non nemo dolorem
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default MOFC;
  