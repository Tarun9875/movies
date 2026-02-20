//frontend/src/pages/customer/Home.tsx
import PageContainer from "../../components/layout/PageContainer";
import HeroSlider from "../../components/sliders/HeroSlider";
import MovieSlider from "../../components/sliders/MovieSlider";

export default function Home() {
  return (
    <PageContainer>
      <HeroSlider />

      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          🎬 Now Showing
        </h2>
        <MovieSlider />
      </section>

      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          ⏳ Upcoming Movies
        </h2>
        <MovieSlider />
      </section>
    </PageContainer>
  );
}
