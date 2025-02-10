const CurriculumHighlights = () => {
    const highlights = [
      { name: "Innovation", image: "mofc.png" },
      { name: "Technology", image: "mofc.png" },
      { name: "Research", image: "mofc.png" },
      { name: "Development", image: "mofc.png" },
      { name: "Collaboration", image: "mofc.png" },
      { name: "Growth", image: "mofc.png" }
    ];
  
    return (
      <section className="flex flex-col items-center justify-center py-16 bg-black text-white">
        <h2 className="text-4xl font-bold text-center mb-10">Curriculum Highlights</h2>
        <div className="grid grid-cols-3 gap-10 max-w-4xl mx-auto justify-items-center">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl w-[5.5cm] h-[8cm]">
              <div className="w-[4.5cm] h-[4.5cm] bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <img src={highlight.image} alt={highlight.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-2 text-lg font-semibold text-black">{highlight.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
};

export default CurriculumHighlights;
