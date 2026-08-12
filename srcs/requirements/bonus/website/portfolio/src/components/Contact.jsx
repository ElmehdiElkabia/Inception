import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Heart, MessageCircle, Users } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in flex items-center justify-center gap-3">
                        <MessageCircle className="h-8 w-8 text-blue-500 animate-bounce" />
                        Let's Connect
                        <Heart className="h-8 w-8 text-red-500 animate-pulse" />
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-300">
                        I'm always interested in new opportunities and collaborations. Let's discuss how we can work together!
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in delay-500 hover:shadow-blue-500/20">
                        <CardHeader>
                            <CardTitle className="text-2xl animate-pulse">Get In Touch</CardTitle>
                            <CardDescription className="text-lg">
                                Ready to start your next project? I'd love to hear from you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid sm:grid-cols-3 gap-4">
                                <a
                                    href="mailto:elmehdielkabia@gmail.com"
                                    className="block animate-fade-in delay-700"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full h-16 flex flex-col gap-2 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group"
                                    >
                                        <Mail className="h-5 w-5 group-hover:animate-bounce" />
                                        <span className="text-sm">Email</span>
                                    </Button>
                                </a>

                                <a
                                    href="https://github.com/ElmehdiElkabia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block animate-fade-in delay-900"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full h-16 flex flex-col gap-2 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25 group"
                                    >
                                        <Github className="h-5 w-5 group-hover:animate-spin" />
                                        <span className="text-sm">GitHub</span>
                                    </Button>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/el-mehdi-elkabia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block animate-fade-in delay-1100"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full h-16 flex flex-col gap-2 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 group"
                                    >
                                        <Linkedin className="h-5 w-5 group-hover:animate-pulse" />
                                        <span className="text-sm">LinkedIn</span>
                                    </Button>
                                </a>
                            </div>

                            <div className="pt-8 border-t animate-fade-in delay-1300">
                                <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                                    <Users className="h-5 w-5 text-green-500 animate-bounce" />
                                    What I'm Looking For
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                    <div className="transform hover:scale-105 transition-transform duration-300">
                                        <h4 className="font-medium text-foreground mb-2">Opportunities</h4>
                                        <ul className="space-y-1">
                                            <li className="hover:text-primary transition-colors duration-200">• Full-stack development roles</li>
                                            <li className="hover:text-primary transition-colors duration-200">• React/Laravel projects</li>
                                            <li className="hover:text-primary transition-colors duration-200">• Collaborative team environments</li>
                                        </ul>
                                    </div>
                                    <div className="transform hover:scale-105 transition-transform duration-300">
                                        <h4 className="font-medium text-foreground mb-2">Collaborations</h4>
                                        <ul className="space-y-1">
                                            <li className="hover:text-primary transition-colors duration-200">• Open source contributions</li>
                                            <li className="hover:text-primary transition-colors duration-200">• Freelance projects</li>
                                            <li className="hover:text-primary transition-colors duration-200">• Learning partnerships</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 animate-fade-in delay-1500">
                                <p className="text-sm text-muted-foreground animate-pulse">
                                    Response time: Usually within 24 hours
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Contact;
