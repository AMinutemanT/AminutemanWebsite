import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

import logo from './../logo.png';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Details - Left */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <img 
                src={logo}
                alt="Aminuteman Technologies Logo" 
                className="h-6 sm:h-8 w-24"
              />
            </Link>
            <p className="text-sm sm:text-base text-gray-400">
              Revolutionizing aerospace technology with advanced AI solutions for autonomous systems and military defense capabilities.
            </p>
            <div className="space-y-4">
              <div className="flex flex-row gap-3">
                <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">+91 8208038411</p>
                  <p className="text-sm text-gray-400">+91 9356221384</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400 break-all">aminutemantechnologies@gmail.com</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400 break-all">admincontrols@aminutemantechnologies.com</p>
              </div>
              <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-1.5" />
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Dr. D.Y. Patil Institute of Engineering,</p>
                      <p className="text-sm text-gray-400">Management and Research.</p>
                      <p className="text-sm text-gray-400">Akurdi, Nigdi, Pune - 411044</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-1.5" />
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Vighnaharta, Vidyanagar</p>
                      <p className="text-sm text-gray-400">Dhanori, Pune - 411032</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
          {/* Pages - Middle */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-medium text-white mb-4">Air Systems</h3>
              <ul className="space-y-2">
                <li><Link to="/air-systems/interceptor-a" className="text-sm text-gray-400 hover:text-white transition-colors">Interceptor A</Link></li>
                <li><Link to="/air-systems/interceptor-b" className="text-sm text-gray-400 hover:text-white transition-colors">Interceptor B</Link></li>
                <li><Link to="/air-systems/interceptor-c" className="text-sm text-gray-400 hover:text-white transition-colors">Interceptor C</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-white mb-4">Jet Engines</h3>
              <ul className="space-y-2">
                <li><Link to="/jet-engines/twin-turbo" className="text-sm text-gray-400 hover:text-white transition-colors">Twin Turbo</Link></li>
                <li><Link to="/jet-engines/ankosa-a" className="text-sm text-gray-400 hover:text-white transition-colors">Ankosa A</Link></li>
                <li><Link to="/jet-engines/ankosa-b" className="text-sm text-gray-400 hover:text-white transition-colors">Ankosa B</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-white mb-4">Valley</h3>
              <ul className="space-y-2">
                <li><Link to="/valley/command-control" className="text-sm text-gray-400 hover:text-white transition-colors">Command & Control</Link></li>
                <li><Link to="/valley/mission-autonomy" className="text-sm text-gray-400 hover:text-white transition-colors">Mission Autonomy</Link></li>
                <li><Link to="/valley/partner-program" className="text-sm text-gray-400 hover:text-white transition-colors">Partner Program</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Socials - Right */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-sm font-medium text-white mb-4">Connect With Us</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/106417184/admin/page-posts/published/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://x.com/Aminutemantech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://www.instagram.com/aminutemantechnologies/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-300 mb-3">Stay updated with our latest innovations</p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 text-sm text-white hover:text-gray-300 transition-colors group"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} Aminuteman Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}