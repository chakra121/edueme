
import Image from 'next/image';
import EventsList from '../../components/EventsList';


export default function Home() {
    const featuredEvents = [
      {
        id: 1,
        title: "Navikarana 1.0",
        date: "Apr 05, 2025",
        time: "10:00 AM - 2:00 PM",
        location: "Arka International School, Hyderabad",
        image: "/events/evenbg.jpg",
      },
    ];

    return (
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          className="relative h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('/events/evenbg.jpg')" }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h2 className="text-4xl font-bold">All Events</h2>
          </div>
        </section>

        {/* Featured Event */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute left-8 top-8 z-10">
                <span className="rounded-md bg-[#4e6cff] px-4 py-1.5 text-sm font-medium text-white">
                  Featured Event
                </span>
              </div>
              <div className="relative h-[450px] w-full overflow-hidden rounded-xl">
                <Image
                  src="/events/evencaro1.jpg"
                  alt="Featured Event"
                  width={500}
                  height={300}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col p-8">
                  <div className="mb-1 flex items-center text-sm text-white">
                    <span className="mr-2">{featuredEvents[0]?.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredEvents[0]?.time}</span>
                  </div>
                  <h2 className="mb-1 text-3xl font-bold text-white">
                    {featuredEvents[0]?.title}
                  </h2>
                  <div className="mb-6 flex items-center text-sm text-white">
                    <span>{featuredEvents[0]?.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Listings */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <EventsList />
          </div>
        </section>
      </main>
    );
}