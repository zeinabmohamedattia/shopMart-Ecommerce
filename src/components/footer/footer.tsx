import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
    return (
        <footer className="bg-linear-to-b from-gray-50 to-white border-t">
            <div className="max-w-7xl mx-auto p-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                    {/* Company Info */}
                    <div className="space-y-5">
                        <Link href="/" className="flex items-center gap-3 w-fit">
                            <div className="bg-black text-white w-12 h-12 flex justify-center items-center rounded-xl text-xl font-bold shadow-lg">
                                S
                            </div>
                            <span className="text-2xl font-bold text-gray-900">ShopMart</span>
                        </Link>

                        <p className="text-gray-600 leading-relaxed text-sm">
                            Your one-stop destination for the latest technology, fashion, and
                            lifestyle products. Quality guaranteed with fast shipping and
                            excellent customer service.
                        </p>

                        {/* Social Media */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h4>
                            <div className="flex gap-3">
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-black hover:text-white transition-all" asChild>
                                    <Link href="#"><Facebook size={18} /></Link>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-black hover:text-white transition-all" asChild>
                                    <Link href="#"><Twitter size={18} /></Link>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-black hover:text-white transition-all" asChild>
                                    <Link href="#"><Instagram size={18} /></Link>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-black hover:text-white transition-all" asChild>
                                    <Link href="#"><Linkedin size={18} /></Link>
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-black hover:text-white transition-all" asChild>
                                    <Link href="#"><Youtube size={18} /></Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-base font-bold text-gray-900 mb-5 uppercase tracking-wide">Shop</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Electronics
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Fashion
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Home & Garden
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Sports
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Deals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-base font-bold text-gray-900 mb-5 uppercase tracking-wide">Customer Service</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Size Guide
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="text-base font-bold text-gray-900 mb-5 uppercase tracking-wide">Policies</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                                    Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="pb-6 pt-2 border-t-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="size-10 flex items-center justify-center rounded-lg bg-gray-100 ">
                                <MapPin size={20} className="text-gray-700" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 mb-1">Address</p>
                                <p className="text-gray-600">123 Shop Street, October City, DC 12345</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="size-10 flex items-center justify-center rounded-lg bg-gray-100 ">
                                <Phone size={20} className="text-gray-700" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 mb-1">Phone</p>
                                <Link href="tel:+201093333333" className="text-gray-600 hover:text-black transition-colors">
                                    (+20) 01093333333
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="size-10 flex items-center justify-center rounded-lg bg-gray-100 ">
                                <Mail size={20} className="text-gray-700" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 mb-1">Email</p>
                                <Link href="mailto:support@shopmart.com" className="text-gray-600 hover:text-black transition-colors">
                                    support@shopmart.com
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                {/* <Separator className="mb-6" /> */}
                <div className="flex flex-col border-t-2 md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <p>© 2024 ShopMart. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-black transition-colors">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-black transition-colors">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-black transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}