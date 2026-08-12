
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, Star, Trophy } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-300"></div>
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in">
                        About Me
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
                        Passionate full-stack developer with a strong foundation in modern web technologies
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in delay-500 group hover:shadow-blue-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 group-hover:animate-pulse">
                                <GraduationCap className="h-6 w-6 text-blue-500  delay-1000" />
                                Education
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="transform hover:translate-x-2 transition-transform duration-300">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-500 animate-spin" />
                                    Diploma in Full-Stack Development
                                </h3>
                                <p className="text-muted-foreground">OFPPT • 2024</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Comprehensive program covering frontend and backend development, databases, and modern web technologies.
                                </p>
                            </div>
                            <div className="transform hover:translate-x-2 transition-transform duration-300">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <Trophy className="h-4 w-4 text-orange-500 animate-pulse" />
                                    Systems Programming
                                </h3>
                                <p className="text-muted-foreground">1337 Coding School • Currently Studying</p>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant="secondary" className="hover:scale-110 transition-transform duration-200  delay-500">C</Badge>
                                    <Badge variant="secondary" className="hover:scale-110 transition-transform duration-200  delay-700">C++</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in delay-700 group hover:shadow-purple-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 group-hover:animate-pulse">
                                <Briefcase className="h-6 w-6 text-purple-500  delay-1200" />
                                Experience
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="transform hover:translate-x-2 transition-transform duration-300">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <Star className="h-4 w-4 text-green-500 animate-spin delay-300" />
                                    Software Development Intern
                                </h3>
                                <p className="text-muted-foreground">OCP (Office Chérifien des Phosphates) • 1 Month</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Gained hands-on experience in enterprise-level software development,
                                    working with industrial systems and learning best practices in a professional environment.
                                </p>
                            </div>
                            {/* <div className="transform hover:translate-x-2 transition-transform duration-300">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <Trophy className="h-4 w-4 text-blue-500 animate-pulse delay-500" />
                                    Full-Stack Developer
                                </h3>
                                <p className="text-muted-foreground">Freelance & Personal Projects</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Developing web applications using React, Laravel, and various database technologies.
                                    Focus on creating scalable and maintainable solutions.
                                </p>
                            </div> */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default About;