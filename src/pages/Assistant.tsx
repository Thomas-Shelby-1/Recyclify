import Navbar from '../components/Navbar';

export default function Assistant() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full text-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">🧠 AI Assistant (Coming Soon)</h2>
          <p className="text-gray-700 text-base">
            This feature will let you talk to our eco-assistant using voice commands and get answers about waste categories,
            recycling centers, and environmental tips.
          </p>
        </div>
      </main>
    </div>
  );
}
