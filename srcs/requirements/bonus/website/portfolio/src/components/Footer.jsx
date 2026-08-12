import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-muted/50 border-t py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/3 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
                <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 animate-fade-in">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            © 2025
                            <span className="font-semibold text-foreground animate-pulse">Elmehdi Elkabia</span>
                            Portfolio. All rights reserved.
                        </p>
                    </div>
                    <div className="flex items-center space-x-6 animate-fade-in delay-300">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 hover:scale-110 group"
                        >
                            <ArrowUp className="h-4 w-4 group-hover:animate-bounce" />
                            Back to Top
                        </button>
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-yellow-500 animate-spin" />
                            Built with React & Tailwind CSS
                        </span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t text-center animate-fade-in delay-500">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                        Crafted with
                        <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                        using modern web technologies
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
