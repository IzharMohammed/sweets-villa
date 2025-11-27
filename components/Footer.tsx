"use client";

import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({ weight: ["400", "600"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["300", "400", "500"], subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className={`text-2xl ${playfair.className} tracking-wider`}>
              <span className="italic text-amber-100">Sri</span> Mahalakshmi <br /> Sweets
            </h2>
            <p className={`text-slate-400 text-sm leading-relaxed ${poppins.className}`}>
              Crafting authentic Indian sweets with premium ingredients and time-honored traditions since 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-amber-600/20 hover:text-amber-200 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-amber-600/20 hover:text-amber-200 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-amber-600/20 hover:text-amber-200 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg mb-6 text-amber-100 ${playfair.className}`}>Quick Links</h3>
            <ul className={`space-y-4 text-sm text-slate-400 ${poppins.className}`}>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Shop Collection</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Corporate Gifting</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg mb-6 text-amber-100 ${playfair.className}`}>Contact</h3>
            <ul className={`space-y-4 text-sm text-slate-400 ${poppins.className}`}>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-amber-200/60" />
                <span>ArundelPet Main Road,<br />Guntur, Andhra Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-200/60" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-200/60" />
                <span>hello@srimahalakshmisweets.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`text-lg mb-6 text-amber-100 ${playfair.className}`}>Newsletter</h3>
            <p className={`text-slate-400 text-sm mb-4 ${poppins.className}`}>
              Subscribe to receive updates on new collections and special offers.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className={`bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-amber-200/50 transition-colors ${poppins.className}`}
              />
              <button className={`bg-amber-100 text-slate-900 px-4 py-3 text-xs tracking-widest uppercase font-medium hover:bg-white transition-colors ${poppins.className}`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-slate-500 text-xs ${poppins.className}`}>
            © 2024 Sri Mahalakshmi Sweets. All rights reserved.
          </p>
          <div className={`flex gap-6 text-xs text-slate-500 ${poppins.className}`}>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
