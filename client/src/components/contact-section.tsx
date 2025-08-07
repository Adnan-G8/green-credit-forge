
import { useLanguage } from './language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              {t('contact-title') || 'Get In Touch'}
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              {t('contact-subtitle') || 'Ready to transform your digital future? Contact us today.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-600 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                  <p className="text-slate-300">contact@fagri.digital</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                  <p className="text-slate-300">+41 XX XXX XX XX</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-600 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
                  <p className="text-slate-300">Switzerland</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input id="name" placeholder="Your name" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea id="message" placeholder="Your message" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" rows={4} />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
