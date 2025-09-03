import React from 'react';

import Logo from '../assest/banner/Banner5.jpg';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-12 bg-gray-900">
      <div className="max-w-screen-xl px-4 pt-8 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center text-teal-300 sm:justify-start">
              <a href="#" className="w-[100px] md:w-[125px] relative h-full">
                <img src={Logo} alt="Logo" className="w-32 md:w-40" />
              </a>
            </div>

            <p className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left">
              Explore a world of shopping with our curated collection of products. Find the latest trends and must-have items.
            </p>

            <ul className="flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
              <li>
                <a href="/" className="text-teal-500 transition-all hover:text-teal-500/75">
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="w-5 transition-all duration-300 hover:rotate-[360deg]" />
                </a>
              </li>

              <li>
                <a href="/" className="text-teal-500 transition hover:text-teal-500/75">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="w-5 transition-all duration-300 hover:rotate-[360deg]" />
                </a>
              </li>

              <li>
                <a href="/" className="text-teal-500 transition hover:text-teal-500/75">
                  <span className="sr-only">Youtube</span>
                  <FaYoutube className="w-5 transition-all duration-300 hover:rotate-[360deg]" />
                </a>
              </li>

              <li>
                <a href="/" className="text-teal-500 transition hover:text-teal-500/75">
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="w-5 transition-all duration-300 hover:rotate-[360deg]" />
                </a>
              </li>

              <li>
                <a href="/" className="text-teal-500 transition hover:text-teal-500/75">
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="w-5 transition-all duration-300 hover:rotate-[360deg]" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-4">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">About Us</p>

              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Our Story
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Mission & Vision
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Sustainability
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Testimonials
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Our Services</p>

              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Fast Delivery
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Easy Returns
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Secure Payments
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      24/7 Customer Support
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Helpful Links</p>

              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      FAQs
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Shipping Information
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Track Your Order
                    </a>
                  </li>

                  <li>
                    <a href="/" className="text-white transition hover:text-white/75">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a href="/" className="flex items-center justify-center sm:justify-start gap-1.5 group">
                    <span className="text-white transition group-hover:text-white/75">
                      Email
                    </span>
                    <span className="text-white transition group-hover:text-white/75">
                      support@yourstore.com
                    </span>
                  </a>
                </li>

                <li>
                  <a href="/" className="flex items-center justify-center sm:justify-start gap-1.5 group">
                    <span className="text-white transition group-hover:text-white/75">
                      Phone
                    </span>
                    <span className="text-white transition group-hover:text-white/75">
                      123-456-7890
                    </span>
                  </a>
                </li>

                <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                  <span className="text-white transition group-hover:text-white/75">
                    <FaPhone className="w-5" />
                  </span>
                  <address className="-mt-0.5 not-italic text-white">
                    123 Street, Cityville, Country
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-12 border-t border-gray-800">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-400">
              <span className="block sm:inline">All rights reserved.</span>

              <a href="/" className="inline-block text-teal-500 underline transition hover:text-teal-500/75">
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a href="/" className="inline-block text-teal-500 underline transition hover:text-teal-500/75">
                Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2024 Your E-commerce Company Name
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
