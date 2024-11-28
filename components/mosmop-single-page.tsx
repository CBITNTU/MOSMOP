"use client"
import React, { useEffect, useRef, useState, RefObject, FormEvent} from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Globe, Slack, Book } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RollingLogos } from '@/components/rolling-logos'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
})

const collaborators = [
  { name: "Prof. Xiao Ma", role: "Professor", institution: "Centre for Business and Industrial Transformation", image: "/images/collaborators/xiaoma.png" },
  { name: "Prof. Li Wei", role: "Professor", institution: "Shanghai Jiao Tong University", image: "/images/collaborators/li-wei.jpg" },
  { name: "Dr. Fatima Gillani", role: "Senior Research Fellow", institution: "Centre for Business and Industrial Transformation", image: "/images/collaborators/fatima.jpg" },
  { name: "Dr. Sönnich Dahl Sönnichsen", role: "Associate Professor", institution: "Centre for Business and Industrial Transformation", image: "/images/collaborators/sonnich.jpg" },
]

const collaboratorLogos = [
  '/images/collaborators/logo-1.png',
  '/images/collaborators/logo-2.png',
  '/images/collaborators/logo-3.png',
  '/images/collaborators/logo-4.png',
  '/images/collaborators/logo-5.png',
  '/images/collaborators/logo-6.png',
  '/images/collaborators/logo-7.png',
  '/images/collaborators/logo-8.png',
]

export default function MOSMOPSinglePage() {
  const [activeSection, setActiveSection] = useState('')
  const heroRef = useRef(null)
  const overviewRef = useRef(null)
  const collaboratorsRef = useRef(null)
  const mapRef = useRef(null)
  const articlesRef = useRef(null)
  const workshopsRef = useRef(null)
  const communityRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    const refs = [heroRef, overviewRef, collaboratorsRef, mapRef, articlesRef, workshopsRef, communityRef]
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  useEffect(() => {
    import('leaflet').then(L => {
      const DefaultIcon = L.Icon.Default;
      const prototype = DefaultIcon.prototype as any;
      if (prototype._getIconUrl) {
        delete prototype._getIconUrl;
      }
      DefaultIcon.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
      });
    });
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSlackFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to your server
      console.log('Form data:', data);
      
      // Send email to cbit@ntu.ac.uk
      // Note: This is a placeholder. You'll need to implement server-side logic to actually send the email.
      console.log('Sending email to cbit@ntu.ac.uk with form data');
      
      alert('Invitation request sent successfully!');
      setIsModalOpen(false); // Close the modal after successful submission
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-green-700">MOSMOP</Link>
          <div className="hidden md:flex space-x-4">
            <button onClick={() => scrollTo(overviewRef)} className={`text-sm text-gray-600 hover:text-green-700 ${activeSection === 'overview' ? 'text-green-700' : ''}`}>Overview</button>
            <button onClick={() => scrollTo(workshopsRef)} className={`text-sm text-gray-600 hover:text-green-700 ${activeSection === 'workshops' ? 'text-green-700' : ''}`}>Workshops</button>
            <button onClick={() => scrollTo(collaboratorsRef)} className={`text-sm text-gray-600 hover:text-green-700 ${activeSection === 'collaborators' ? 'text-green-700' : ''}`}>Collaborators</button>
            <button onClick={() => scrollTo(articlesRef)} className={`text-sm text-gray-600 hover:text-green-700 ${activeSection === 'articles' ? 'text-green-700' : ''}`}>Articles</button>
            <button onClick={() => scrollTo(mapRef)} className={`text-sm text-gray-600 hover:text-green-700 ${activeSection === 'map' ? 'text-green-700' : ''}`}>Global Impact</button>
            <button onClick={() => scrollTo(communityRef)} className={`text-sm text-gray-600 hover:text-green-700 ${activeSection === 'community' ? 'text-green-700' : ''}`}>Community</button>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-image.jpg"
              alt="Sustainable business landscape"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <motion.div
            className="container mx-auto px-4 text-center text-white z-10"
            style={{ opacity, y }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Future Leader&apos;s Adoption of ESG-Driven Business Models
            </h1>
            <p className="text-lg md:text-xl mb-8">
              MOre Sustainable, MOre Profitable (MOSMOP)
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => scrollTo(overviewRef)}>
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>

        {/* Overview Section */}
        <section id="overview" ref={overviewRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Project Overview</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">Global Collaboration</h3>
                <p className="text-sm text-gray-600">
                  Uniting UK universities and global companies in sustainable business practices.
                </p>
              </div>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 mx-auto mb-4 text-green-600"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M14.5 9.5 9 15" />
                  <path d="m9 9 5.5 5.5" />
                </svg>
                <h3 className="text-lg font-semibold mb-2">ESG Focus</h3>
                <p className="text-sm text-gray-600">
                  Integrating Environmental, Social, and Governance principles into business models.
                </p>
              </div>
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 mx-auto mb-4 text-green-600"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <h3 className="text-lg font-semibold mb-2">Sustainable Profitability</h3>
                <p className="text-sm text-gray-600">
                  Demonstrating that sustainability and profitability can go hand in hand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Workshops Section */}
        <section id="workshops" ref={workshopsRef} className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Workshop Galleries</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative group overflow-hidden rounded-lg">
                  <Image
                    src={`/images/workshops/workshop-${i}.jpg`}
                    alt={`Workshop ${i}`}
                    width={400}
                    height={300}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold">Workshop {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaborators Section */}
        <section id="collaborators" ref={collaboratorsRef} className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Collaborators</h2>
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {collaborators.map((collaborator, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center pt-6">
                    <Image
                      src={collaborator.image}
                      alt={collaborator.name}
                      width={96}
                      height={96}
                      className="rounded-full mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{collaborator.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{collaborator.role}</p>
                    <p className="text-xs text-gray-500 text-center">{collaborator.institution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <RollingLogos logos={collaboratorLogos} />
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" ref={articlesRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Articles and Whitepapers</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ESG White Paper on the Pharmaceutical Manufacturing Industry</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Explore our latest research on ESG practices in the pharmaceutical manufacturing industry.
                  </p>
                  <Button variant="outline" className="w-full text-sm" onClick={() => window.open("http://rongxuesg.com/archives/757", "_blank")}>
                    <Book className="mr-2 h-4 w-4" />
                    Read Whitepaper
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ESG White Paper on the New Energy Industry</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Discover insights on ESG integration in the new energy sector.
                  </p>
                  <Button variant="outline" className="w-full text-sm" onClick={() => window.open("http://rongxuesg.com/archives/782", "_blank")}>
                    <Book className="mr-2 h-4 w-4" />
                    Read Whitepaper
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="map" ref={mapRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Global Impact</h2>
            <div className="h-[400px] md:h-[600px] w-full">
              <DynamicMap />
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" ref={communityRef} className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Join Our Community</h2>
            <p className="text-sm md:text-base mb-8">
              Connect with like-minded professionals and stay updated on the latest in ESG-driven business models.
            </p>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Join Slack <Slack className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join our Slack Community</DialogTitle>
                  <DialogDescription>Fill in your details to receive an invitation</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSlackFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input id="organization" name="organization" placeholder="Your organization" />
                  </div>
                  <Button type="submit" className="w-full">
                    Request Invitation
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollTo(overviewRef)} className="hover:text-green-400">Overview</button></li>
                <li><button onClick={() => scrollTo(workshopsRef)} className="hover:text-green-400">Workshops</button></li>
                <li><button onClick={() => scrollTo(collaboratorsRef)} className="hover:text-green-400">Collaborators</button></li>
                <li><button onClick={() => scrollTo(articlesRef)} className="hover:text-green-400">Articles</button></li>
                <li><button onClick={() => scrollTo(mapRef)} className="hover:text-green-400">Global Impact</button></li>
                <li><button onClick={() => scrollTo(communityRef)} className="hover:text-green-400">Community</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm">Email: cbit@ntu.ac.uk</p>
              <p className="text-sm">Phone: +44 123 456 7890</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <Button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} MOSMOP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

