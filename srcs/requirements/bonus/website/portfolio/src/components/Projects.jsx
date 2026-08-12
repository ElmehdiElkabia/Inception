import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "E-Commerce Platform",
            description: "A full-featured e-commerce application built with Laravel backend and React frontend. Features include user authentication, product catalog, shopping cart, and payment integration.",
            image: "🛒",
            technologies: ["Laravel", "React", "MySQL", "Stripe API", "Tailwind CSS"],
            category: "Full-Stack Web App"
        },
        {
            title: "Task Management Dashboard",
            description: "A responsive project management dashboard with real-time updates, team collaboration features, and advanced filtering. Built with modern React patterns and Express.js API.",
            image: "📊",
            technologies: ["React", "Express.js", "MongoDB", "Socket.io", "Chart.js"],
            category: "Web Application"
        },
        {
            title: "RESTful API Service",
            description: "A scalable REST API built with Express.js featuring JWT authentication, rate limiting, data validation, and comprehensive documentation. Designed for mobile and web applications.",
            image: "🔗",
            technologies: ["Express.js", "MongoDB", "JWT", "Swagger", "Docker"],
            category: "Backend API"
        }
    ];

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A showcase of my work in full-stack development and problem-solving
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <Card
                            key={project.title}
                            className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <CardHeader>
                                <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform">
                                    {project.image}
                                </div>
                                <div className="text-center">
                                    <Badge variant="outline" className="mb-2">
                                        {project.category}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl text-center">{project.title}</CardTitle>
                                <CardDescription className="text-center">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Technologies Used:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.map((tech) => (
                                                <Badge key={tech} variant="secondary" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button size="sm" variant="outline" className="flex-1">
                                            <Github className="h-4 w-4 mr-2" />
                                            Code
                                        </Button>
                                        <Button size="sm" className="flex-1">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Live Demo
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        Want to see more of my work?
                    </p>
                    <Button variant="outline" size="lg">
                        <Github className="h-4 w-4 mr-2" />
                        View All Projects on GitHub
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
