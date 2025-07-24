import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { useAuthentication } from '../hooks/use-authentication';
import { FagriLogo } from '@/assets/fagri-logo';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, UserPlus, User, Key, LogIn, FileText, Folder, Lightbulb } from 'lucide-react';
import { MembershipModal } from './membership-modal';
import { AlphaG8RegistrationModal } from './alphag8-registration-modal';
import { UserRoleSelectionModal } from './user-role-selection-modal';
import { FagriMemberRegistrationModal } from './fagri-member-registration-modal';
import { ProjectRegistrationModal } from './project-registration-modal';
import { ProjectRecommendationsModal } from './project-recommendations-modal';
import { SignInModal } from './sign-in-modal-enhanced';
import { DocumentManagementModal } from './document-management-modal';
import { useLocation } from 'wouter';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const { logout } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showAlphaG8Modal, setShowAlphaG8Modal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showFagriMemberModal, setShowFagriMemberModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'sales-team' | 'fagri-member' | 'non-member' | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showProjectRegistrationModal, setShowProjectRegistrationModal] = useState(false);
  const [showDocumentManagementModal, setShowDocumentManagementModal] = useState(false);
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    // If we're on the home page, scroll to section
    if (location === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on a different page, navigate to home with hash
      setLocation(`/#${sectionId}`);
    }
    setIsOpen(false);
  };

  // Handle navigation to home page when coming from other pages
  useEffect(() => {
    if (location === '/' && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button onClick={() => setLocation('/')} className="flex items-center">
                <FagriLogo className="w-20 h-12" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => navigateToSection('home')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-home')}
              </button>
              <button
                onClick={() => setLocation('/eufd-standard')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-standard')}
              </button>

              <button
                onClick={() => navigateToSection('platform')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-platform')}
              </button>
              <button
                onClick={() => setLocation('/security')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-security')}
              </button>
              <button
                onClick={() => navigateToSection('contact')}
                className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
              >
                {t('nav-contact')}
              </button>

            </div>

            {/* Language Switcher & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="bg-emerald-700 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setLanguage('it')}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    language === 'it' 
                      ? 'bg-white text-emerald-700' 
                      : 'text-white hover:bg-emerald-600'
                  }`}
                >
                  IT
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    language === 'en' 
                      ? 'bg-white text-emerald-700' 
                      : 'text-white hover:bg-emerald-600'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Clean Navigation Buttons */}
              <Button
                onClick={() => setShowSignInModal(true)}
                variant="outline"
                size="sm"
                className="hidden md:flex items-center px-4 py-2 text-emerald-700 border-emerald-700 hover:bg-emerald-50 transition-colors duration-200"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {t('sign-in')}
              </Button>
              
              <Button
                onClick={() => setShowRoleModal(true)}
                size="sm"
                className="hidden md:flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
              >
                <Key className="h-4 w-4 mr-2" />
                {language === 'it' ? 'Crea ID KEY' : 'Create ID KEY'}
              </Button>
              
              <Button
                onClick={() => setShowRecommendationsModal(true)}
                size="sm"
                className="hidden md:flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {language === 'it' ? 'Raccomandazioni' : 'Recommendations'}
              </Button>
              
              <Button
                onClick={() => setShowProjectRegistrationModal(true)}
                size="sm"
                className="hidden md:flex items-center px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white transition-colors duration-200"
              >
                <FileText className="h-4 w-4 mr-2" />
                {language === 'it' ? 'Registra Progetto' : 'Register Project'}
              </Button>



              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-slate-800 hover:text-emerald-700 transition-colors duration-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => navigateToSection('home')}
                  className="text-slate-800 hover:text-emerald-700 transition-colors duration-300 text-left font-medium"
                >
                  {t('nav-home')}
                </button>
                <button
                  onClick={() => {
                    setLocation('/eufd-standard');
                    setIsOpen(false);
                  }}
                  className="text-slate-800 hover:text-emerald-700 transition-colors duration-300 text-left font-medium"
                >
                  {t('nav-standard')}
                </button>

                <button
                  onClick={() => navigateToSection('platform')}
                  className="text-slate-800 hover:text-emerald-700 transition-colors duration-300 text-left font-medium"
                >
                  {t('nav-platform')}
                </button>
                <button
                  onClick={() => {
                    setLocation('/security');
                    setIsOpen(false);
                  }}
                  className="text-slate-800 hover:text-emerald-700 transition-colors duration-300 text-left font-medium"
                >
                  {t('nav-security')}
                </button>
                <button
                  onClick={() => navigateToSection('contact')}
                  className="text-slate-800 hover:text-emerald-700 transition-colors duration-300 text-left font-medium"
                >
                  {t('nav-contact')}
                </button>
                
                {/* Clean Mobile Navigation */}
                <button
                  onClick={() => {
                    setShowSignInModal(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center text-emerald-700 hover:text-emerald-800 transition-colors duration-300 text-left font-medium"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('sign-in')}
                </button>
                
                <button
                  onClick={() => {
                    setShowRoleModal(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 text-left font-medium"
                >
                  <Key className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Crea ID KEY' : 'Create ID KEY'}
                </button>
                
                <button
                  onClick={() => {
                    setShowRecommendationsModal(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-300 text-left font-medium"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Raccomandazioni' : 'Recommendations'}
                </button>
                
                <button
                  onClick={() => {
                    setShowProjectRegistrationModal(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center text-emerald-700 hover:text-emerald-800 transition-colors duration-300 text-left font-medium"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Registra Progetto' : 'Register Project'}
                </button>
                

              </div>
            </div>
          )}
        </div>
      </nav>

      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
      />
      
      <UserRoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onRoleSelected={(role) => {
          setSelectedRole(role);
          setShowRoleModal(false);
          if (role === 'non-member') {
            setShowMembershipModal(true);
          } else if (role === 'fagri-member') {
            setShowFagriMemberModal(true);
          } else {
            setShowAlphaG8Modal(true);
          }
        }}
        onMembershipApplicationOpen={() => {
          setShowRoleModal(false);
          setShowMembershipModal(true);
        }}
      />
      
      <FagriMemberRegistrationModal
        isOpen={showFagriMemberModal}
        onClose={() => {
          setShowFagriMemberModal(false);
          setSelectedRole(null);
        }}
        onRegistrationComplete={(memberData) => {
          setShowFagriMemberModal(false);
          setShowAlphaG8Modal(true);
        }}
      />
      
      <AlphaG8RegistrationModal
        isOpen={showAlphaG8Modal}
        onClose={() => {
          setShowAlphaG8Modal(false);
          setSelectedRole(null);
        }}
        userRole={selectedRole || undefined}
      />

      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
      />

      <ProjectRegistrationModal
        isOpen={showProjectRegistrationModal}
        onClose={() => setShowProjectRegistrationModal(false)}
      />

      <DocumentManagementModal
        isOpen={showDocumentManagementModal}
        onClose={() => setShowDocumentManagementModal(false)}
      />

      <ProjectRecommendationsModal
        isOpen={showRecommendationsModal}
        onClose={() => setShowRecommendationsModal(false)}
      />
    </>
  );
}
