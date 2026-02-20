import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Chatbot  from "./components/Chatbot";


export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* NAVBAR */}
      <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="font-semibold text-lg flex items-center gap-2">
          <span></span> Edzee
        </div>

        <div className="hidden md:flex gap-8 text-sm">
          <a href="#" className="hover:text-gray-300">AI Quiz Generator</a>
          <a href="#" className="hover:text-gray-300">Performance Dashboard</a>
          <a href="#" className="hover:text-gray-300">Real-Time Multiplayer</a>
          <a href="#" className="hover:text-gray-300">Personalised Learning Planner</a>
        </div>
        <div className="hidden md:flex gap-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-white text-black rounded-md border border-black hover:bg-gray-200 transition"
          >
            Login
          </Link>

          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-black text-white rounded-md border border-white hover:bg-gray-800 transition"
          >
            Signup
          </Link>
        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Image */}
        <div>
          <img
            src="/bot.png"
            className="w-full rounded-xl shadow-lg border-4 border-black"
            alt="Edzee Bot"
          />
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-xl font-semibold mb-4">User Testimonials</h2>

          {/* Testimonial Card */}
          <div className="space-y-4">

            <div className="p-3 bg-gray-100 rounded-xl shadow flex items-center gap-3">
              <img src="/user.jpg" className="w-10 h-10 rounded-full" />
              <p className="text-sm">
                "Edzee has revolutionized the way I study. The AI quizzes are spot on!" – Alex
              </p>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl shadow flex items-center gap-3">
              <img src="/user.jpg" className="w-10 h-10 rounded-full" />
              <p className="text-sm">
                "The personalized learning plans are incredibly effective for my students." – Sophia
              </p>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl shadow flex items-center gap-3">
              <img src="/user.jpg" className="w-10 h-10 rounded-full" />
              <p className="text-sm">
                "The AI-driven insights have helped me improve my learning efficiency." – Michael
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="px-8 md:px-12 mt-4">
        <h2 className="text-lg font-semibold">Welcome to Edzee</h2>
        <p className="text-sm mt-2 w-full md:w-2/3 text-gray-700">
          Explore how our AI-driven platform personalizes learning experiences and generates
          custom quizzes to enhance your knowledge.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 bg-black text-white px-8 py-10 grid grid-cols-1 md:grid-cols-2">

        {/* Left Section */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Resources</h3>

          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Right Social Section */}
        <div className="mt-6 md:mt-0 text-right">
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>

          <div className="flex justify-end gap-4 text-2xl">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>

        </div>
      </footer>
      
<Chatbot />
    </div>
  );
}
