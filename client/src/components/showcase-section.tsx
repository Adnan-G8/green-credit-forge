import { useLanguage } from './language-provider';
import heroImage from '@assets/image_1752936487549.png';
import standardImage from '@assets/image_1752936515114.png';
import { Leaf, Target, Globe2, Award } from 'lucide-react';

export function ShowcaseSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-emerald-800 mb-6 font-sans">
              Our Agricultural Vision
            </h2>
            <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
              Bridging traditional farming with cutting-edge technology for sustainable agriculture
            </p>
          </div>

          {/* Creative Image Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* First Image Block */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Agricultural landscape"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-amber-600/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Globe2 className="text-white h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Global Scale</h3>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Sustainable farming practices across diverse agricultural landscapes
                  </p>
                </div>
              </div>
            </div>

            {/* Second Image Block */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={standardImage}
                  alt="Wheat field detail"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-600/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Leaf className="text-white h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Quality Focus</h3>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Precision agriculture ensuring optimal crop quality and sustainability
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="text-white h-8 w-8" />
              </div>
              <h4 className="text-3xl font-bold text-emerald-800 mb-2">110,000+</h4>
              <p className="text-emerald-700">Active Members</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe2 className="text-white h-8 w-8" />
              </div>
              <h4 className="text-3xl font-bold text-blue-800 mb-2">80,000+</h4>
              <p className="text-blue-700">Italian Enterprises</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="text-white h-8 w-8" />
              </div>
              <h4 className="text-3xl font-bold text-amber-800 mb-2">30+</h4>
              <p className="text-amber-700">Years Experience</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-white h-8 w-8" />
              </div>
              <h4 className="text-3xl font-bold text-purple-800 mb-2">5</h4>
              <p className="text-purple-700">Continents</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}