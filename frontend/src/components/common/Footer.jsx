import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Send } from "lucide-react";

// A small helper component to avoid repeating styles for social icons
const SocialIcon = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
        {children}
    </a>
);

export default function Footer() {

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission, e.g., send to an API
        alert("Thank you for subscribing to our newsletter!");
        e.target.reset(); // Reset the form field
    };

    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Column 1: Brand and Social */}
                    <div className="space-y-4">
                        <Link to="/" className="text-3xl font-bold text-white tracking-wider">SELLORA</Link>
                        <p className="text-sm">
                            Your one-stop shop for the latest and greatest in tech gadgets and accessories. Quality and customer satisfaction are our top priorities.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon href="https://facebook.com"><Facebook size={20} /></SocialIcon>
                            <SocialIcon href="https://twitter.com"><Twitter size={20} /></SocialIcon>
                            <SocialIcon href="https://instagram.com"><Instagram size={20} /></SocialIcon>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                            <li><Link to="/" className="hover:text-white transition">All Products</Link></li>
                            <li><Link to="/my-orders" className="hover:text-white transition">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter Subscription */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Join Our Newsletter</h3>
                        <p className="mt-4 text-sm">
                            Get exclusive deals, new product announcements, and more, directly to your inbox.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition">
                                <Send size={20} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar: Copyright */}
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Sellora. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}