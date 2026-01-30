import PageContainer from "../../components/layout/PageContainer";
import HeroSlider from "../../components/sliders/HeroSlider";
import MovieSlider from "../../components/sliders/MovieSlider";

export default function Home() {
  return (
    <PageContainer >
      <HeroSlider />

      {/* Now Showing */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🎬 <span className="text-red-600">Now Showing</span>
        </h2>
        <MovieSlider />
      </section>

      {/* Upcoming */}
      <section className="px-6 py-10 bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ⏳ <span className="text-red-600">Upcoming Movies</span>
        </h2>
        <MovieSlider />
      </section>
    </PageContainer>
  );
}
