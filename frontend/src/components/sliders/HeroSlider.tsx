export default function HeroSlider() {
  return (
    <section className="relative h-[65vh] bg-slate-900 flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4')] bg-cover bg-center opacity-30" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Book Movie Tickets <br />
          <span className="text-teal-400">Anytime, Anywhere</span> 🎟️
        </h1>

        <p className="mt-4 max-w-xl text-gray-300 text-lg">
          Real-time seat booking • Best offers • Secure payments
        </p>

        <button className="mt-6 px-8 py-3 bg-teal-600 hover:bg-teal-700 transition rounded-xl text-white font-semibold shadow-lg">
          Explore Movies
        </button>
      </div>
    </section>
  );
}
