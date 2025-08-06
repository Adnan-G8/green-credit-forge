import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { useSupabaseAuth } from '../hooks/use-supabase-auth';
import { FagriLogo } from '@/assets/fagri-logo';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, UserPlus, User, Key, LogIn, FileText, Folder, Lightbulb } from 'lucide-react';
import { MembershipModal } from './membership-modal';
import { AlphaG8RegistrationModal } from './alphag8-registration-modal';
import { UserRoleSelectionModal } from './user-role-selection-modal';
import { FagriMemberRegistrationModal } from './fagri-member-registration-modal';
import { SignInModal } from './sign-in-modal-enhanced';
import { RoleBasedSignInModal } from './role-based-signin-modal';
import { RegisterProjectModal } from './register-project-modal';
import { CreateAccountModal } from './create-account-modal';
import { AccountTypeSelectionModal } from './account-type-selection-modal';
import { useLocation } from 'wouter';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, signOut, profile } = useSupabaseAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showAlphaG8Modal, setShowAlphaG8Modal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showFagriMemberModal, setShowFagriMemberModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'sales-team' | 'fagri-member' | 'non-member' | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRoleBasedSignInModal, setShowRoleBasedSignInModal] = useState(false);
  const [showRegisterProjectModal, setShowRegisterProjectModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const [createdFagriId, setCreatedFagriId] = useState<string>('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signedInAlphaG8Id, setSignedInAlphaG8Id] = useState<string>('');

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = () => {
      const sessionActive = localStorage.getItem('sessionActive');
      const alphaG8Id = localStorage.getItem('alphaG8Id');
      
      // Check if we're on any authenticated dashboard pages
      const authenticatedPaths = [
        '/team-dashboard',
        '/user-dashboard', 
        '/admin-dashboard',
        '/certification-dashboard',
        '/admin-authorization',
        '/employee-profile',
        '/project/'
      ];
      const isOnAuthenticatedPage = authenticatedPaths.some(path => 
        window.location.pathname === path || window.location.pathname.startsWith(path)
      );
      
      if ((sessionActive === 'true' && alphaG8Id) || isOnAuthenticatedPage) {
        setIsSignedIn(true);
        // If on dashboard but no stored ID, create a temporary one
        if (!alphaG8Id && isOnAuthenticatedPage) {
          setSignedInAlphaG8Id('FAGRI-TEAM-MEMBER-AUTHENTICATED');
        } else {
          setSignedInAlphaG8Id(alphaG8Id || 'FAGRI-AUTHENTICATED-USER');
        }
      }
    };
    
    checkSession();
    
    // Listen for localStorage changes (when user signs in from another component)
    const handleStorageChange = () => {
      checkSession();
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also check periodically in case localStorage changed in same tab
    const interval = setInterval(checkSession, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const [activeModal, setActiveModal] = useState<string | null>(null);
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
            <div className="flex items-center space-x-8">
              <button onClick={() => setLocation('/')} className="flex items-center">
                <FagriLogo className="w-20 h-12" />
              </button>
              
              {/* Desktop Navigation - Next to Logo */}
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => navigateToSection('home')}
                  className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
                >
                  {t('nav-home')}
                </button>
                <button
                  onClick={() => navigateToSection('contact')}
                  className="text-slate-800 hover:text-emerald-700 transition-colors duration-200 font-medium text-base"
                >
                  {t('nav-contact')}
                </button>
              </div>
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

              {/* Simplified Smart Navigation Buttons */}
              {!isAuthenticated ? (
                <>
                  <Button
                    onClick={() => setLocation('/auth')}
                    variant="outline"
                    size="sm"
                    className="hidden md:flex items-center px-4 py-2 text-emerald-700 border-emerald-700 hover:bg-emerald-50 transition-colors duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Accedi' : 'Sign In'}
                  </Button>
                  
                  <Button
                    onClick={() => setLocation('/auth')}
                    size="sm"
                    className="hidden md:flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Crea Account' : 'Create Account'}
                  </Button>
                </>
              ) : (
                <>
                  {/* Show My ID KEY for authenticated users */}
                  <span className="hidden md:flex items-center px-3 py-2 text-sm text-slate-600 bg-slate-100 rounded-lg">
                    <Key className="h-4 w-4 mr-2" />
                    {profile?.alphag8_id || 'Loading...'}
                  </span>
                  
                  <Button
                    onClick={async () => {
                      await signOut();
                      setLocation('/auth');
                    }}
                    variant="outline"
                    size="sm"
                    className="hidden md:flex items-center px-4 py-2 text-red-700 border-red-700 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Disconnetti' : 'Logout'}
                  </Button>
                </>
              )}
              




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
                  onClick={() => navigateToSection('contact')}
                  className="text-slate-800 hover:text-emerald-700 transition-colors duration-300 text-left font-medium"
                >
                  {t('nav-contact')}
                </button>
                
                {/* Simplified Mobile Navigation */}
                {!isSignedIn ? (
                  <>
                    <button
                      onClick={() => {
                        if (activeModal) return;
                        setActiveModal('role-signin');
                        setShowRoleBasedSignInModal(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center text-emerald-700 hover:text-emerald-800 transition-colors duration-300 text-left font-medium"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Accedi' : 'Sign In'}
                    </button>
                    
                    <button
                      onClick={() => {
                        if (activeModal) return;
                        setActiveModal('create-account');
                        setShowCreateAccountModal(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 text-left font-medium"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Crea Identità' : 'Create Digital Identity'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setLocation(`/user-dashboard?fagriId=${signedInAlphaG8Id}`);
                        setIsOpen(false);
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 text-left font-medium"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'La Mia ID KEY' : 'My ID KEY'}
                    </button>
                    
                    <button
                      onClick={() => {
                        localStorage.removeItem('sessionActive');
                        localStorage.removeItem('alphaG8Id');
                        setIsSignedIn(false);
                        setSignedInAlphaG8Id('');
                        setIsOpen(false);
                        setLocation('/');
                        console.log('Mobile user logged out');
                      }}
                      className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-300 text-left font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Disconnetti' : 'Logout'}
                    </button>
                  </>
                )}
                

                

              </div>
            </div>
          )}
        </div>
      </nav>

      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => {
          setShowMembershipModal(false);
          setActiveModal(null);
        }}
      />
      
      <UserRoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => {
          setShowRoleModal(false);
          setActiveModal(null);
        }}
        onRoleSelected={(role) => {
          setSelectedRole(role);
          setShowRoleModal(false);
          setActiveModal(null);
          if (role === 'non-member') {
            setActiveModal('membership');
            setShowMembershipModal(true);
          } else if (role === 'fagri-member') {
            setActiveModal('fagri-member');
            setShowFagriMemberModal(true);
          } else {
            setActiveModal('alphag8');
            setShowAlphaG8Modal(true);
          }
        }}
        onMembershipApplicationOpen={() => {
          setShowRoleModal(false);
          setActiveModal('membership');
          setShowMembershipModal(true);
        }}
      />
      
      <FagriMemberRegistrationModal
        isOpen={showFagriMemberModal}
        onClose={() => {
          setShowFagriMemberModal(false);
          setSelectedRole(null);
          setActiveModal(null);
        }}
        onRegistrationComplete={(memberData) => {
          setShowFagriMemberModal(false);
          setActiveModal('alphag8');
          setShowAlphaG8Modal(true);
        }}
      />
      
      <AlphaG8RegistrationModal
        isOpen={showAlphaG8Modal}
        onClose={() => {
          setShowAlphaG8Modal(false);
          setSelectedRole(null);
          setActiveModal(null);
        }}
        userRole={selectedRole || undefined}
      />

      <SignInModal
        isOpen={showSignInModal}
        onClose={() => {
          setShowSignInModal(false);
          setActiveModal(null);
        }}
        onSignInSuccess={(alphaG8Id: string) => {
          setIsSignedIn(true);
          setSignedInAlphaG8Id(alphaG8Id);
          setShowSignInModal(false);
          setActiveModal(null);
        }}
      />

      <RoleBasedSignInModal
        isOpen={showRoleBasedSignInModal}
        onClose={() => {
          setShowRoleBasedSignInModal(false);
          setActiveModal(null);
        }}
        onSignInSuccess={(alphaG8Id: string, userRole: string) => {
          setIsSignedIn(true);
          setSignedInAlphaG8Id(alphaG8Id);
          setShowRoleBasedSignInModal(false);
          setActiveModal(null);
          
          // Navigate to appropriate dashboard based on role
          if (userRole === 'fagri-member') {
            setLocation('/dashboard');
          } else if (userRole === 'team-member') {
            setLocation('/team-dashboard');
          } else if (userRole === 'certification') {
            setLocation('/certification-dashboard');
          } else if (userRole === 'administration') {
            setLocation('/admin-dashboard');
          }
        }}
      />

      <RegisterProjectModal
        isOpen={showRegisterProjectModal}
        onClose={() => setShowRegisterProjectModal(false)}
      />

      {/* New Account Creation System */}
      <CreateAccountModal
        isOpen={showCreateAccountModal}
        onClose={() => {
          setShowCreateAccountModal(false);
          setActiveModal(null);
        }}
        onAccountCreated={(fagriId: string) => {
          setCreatedFagriId(fagriId);
          setShowCreateAccountModal(false);
          setActiveModal('account-type');
          setShowAccountTypeModal(true);
        }}
      />

      <AccountTypeSelectionModal
        isOpen={showAccountTypeModal}
        onClose={() => {
          setShowAccountTypeModal(false);
          setActiveModal(null);
          setCreatedFagriId('');
        }}
        fagriId={createdFagriId}
        onAccountTypeSelected={(accountType: string, fagriId: string) => {
          setShowAccountTypeModal(false);
          setActiveModal(null);
          setCreatedFagriId('');
          // Account creation completed, user can now sign in with their new account
          console.log(`Account created: ${accountType} account for FAGRI ID: ${fagriId}`);
        }}
      />
    </>
  );
}
