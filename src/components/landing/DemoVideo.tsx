
export const DemoVideo = () => {
  return (
    <section className="py-24 bg-[#212121]">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="bg-[#FAEAD7] rounded-xl p-6 md:p-8 shadow-lg">
          <div className="w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden aspect-video">
            <iframe src="https://www.youtube.com/embed/ApX-UhpUiOE" title="NLACE AI Studio Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
