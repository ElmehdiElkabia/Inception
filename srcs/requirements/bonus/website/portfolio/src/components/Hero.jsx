import React from 'react';
import { Button } from '@/components/ui/button';
import { Code, Zap } from 'lucide-react';

const Hero = () => {
    const scrollToProjects = () => {
        const element = document.getElementById('projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/10 rounded-full blur-2xl animate-ping delay-500"></div>
            </div>

            <div className="container mx-auto text-center relative z-10">
                <div className="animate-fade-in">
                    {/* Animated greeting */}
                    <div className="mb-4 animate-bounce">
                        <span className="inline-flex items-center gap-2 text-lg text-muted-foreground">
                            <Code className="h-5 w-5 animate-spin" />
                            Hello, I'm
                        </span>
                    </div>

                    {/* Name with typewriter effect */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-2 animate-fade-in delay-300">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
                            Elmehdi Elkabia
                        </span>
                    </h1>

                    {/* Animated role title */}
                    <div className="mb-6 animate-fade-in delay-500">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground flex items-center justify-center gap-3">
                            <Zap className="h-8 w-8 text-yellow-500  delay-700" />
                            Full-Stack Developer
                            <Zap className="h-8 w-8 text-yellow-500  delay-1000" />
                        </h2>
                    </div>

                    <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in delay-700">
                        With expertise in React, Laravel, and modern web technologies.
                        Passionate about creating efficient, scalable solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-1000">
                        <Button
                            onClick={scrollToProjects}
                            size="lg"
                            className="hover:scale-110   hover:shadow-xl hover:shadow-blue-500/25  hover:animate-none group"
                        >
                            <span className="group-hover:animate-bounce">View My Work</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                const element = document.getElementById('contact');
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 group"
                        >
                            <span className="group-hover:animate-pulse">Get In Touch</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
