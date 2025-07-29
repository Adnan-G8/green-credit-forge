import { Navigation } from '@/components/navigation';
import { ProjectTrackingDashboard } from '@/components/project-tracking-dashboard';
import { useLanguage } from '@/components/language-provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock, ArrowLeft, Key, LogIn, User, Folder, FileText, Info, Building2, Euro, Settings } from 'lucide-react';
import { useLocation } from 'wouter';
import backgroundImage from '@assets/image_1753623059363.png';
import { SecurityDashboardModal } from '@/components/security-dashboard-modal';
import { OrganizationInformationModal } from '@/components/organization-information-modal';
import { CertificationPricingModal } from '@/components/certification-pricing-modal';
import { AdminUserManagementModal } from '@/components/admin-user-management-modal';
import { ProjectCreationModal } from '@/components/project-creation-modal';
import { MyProjectsDisplay } from '@/components/my-projects-display';
import KYCAlphaG8Integration from '@/components/kyc-alphag8-integration';
import { PaymentStatusSection } from '@/components/payment-status-section';
import { AuditTrailDisplay } from '@/components/audit-trail-display';


export default function Dashboard() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alphaG8Id, setAlphaG8Id] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Start with false for faster loading
  const [loginId, setLoginId] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSecurityDashboard, setShowSecurityDashboard] = useState(false);
  const [showOrganizationInfo, setShowOrganizationInfo] = useState(false);
  const [showPricingInfo, setShowPricingInfo] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showProjectCreation, setShowProjectCreation] = useState(false);
  const [showMyProjects, setShowMyProjects] = useState(false);
  const [showKycSection, setShowKycSection] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);

  const [currentUserRole, setCurrentUserRole] = useState('FAGRI Member');
  const [kycStatus, setKycStatus] = useState('pending');
  const [userProjects, setUserProjects] = useState<any[]>([]);

  const loadUserData = (fagriId: string) => {
    try {
      // Load user profile data
      const storedProfiles = JSON.parse(localStorage.getItem('userProfiles') || '[]');
      const userProfile = storedProfiles.find((profile: any) => profile.fagriIdKey === fagriId);
      
      if (userProfile) {
        setCurrentUserRole(userProfile.userRole || 'FAGRI Member');
        setKycStatus(userProfile.kycStatus || 'pending');
      }

      // Load user projects
      const storedProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      const projects = storedProjects.filter((project: any) => project.alphaG8Id === fagriId);
      setUserProjects(projects);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleKycUpdate = () => {
    loadUserData(alphaG8Id);
  };

  const handlePaymentUpdate = () => {
    loadUserData(alphaG8Id);
  };

  useEffect(() => {
    // Clear all old data and force refresh for ID format conversion
    const migrationDone = localStorage.getItem('fagri-migration-done');
    if (!migrationDone) {
      // Clear all localStorage data to ensure clean migration
      localStorage.clear();
      // Mark migration as completed
      localStorage.setItem('fagri-migration-done', 'true');
    }
    
    // Fast authentication check - immediate, no loading delay
    let storedId = localStorage.getItem('alphaG8Id');
    const sessionActive = localStorage.getItem('sessionActive');
    
    // Convert old ALPHAG8- format to new FAGRI- format
    if (storedId && storedId.startsWith('ALPHAG8-')) {
      const newId = storedId.replace('ALPHAG8-', 'FAGRI-');
      localStorage.setItem('alphaG8Id', newId);
      storedId = newId;
    }
    
    if (storedId && sessionActive === 'true') {
      setIsAuthenticated(true);
      setAlphaG8Id(storedId);
      loadUserData(storedId);
    } else {
      setIsAuthenticated(false);
    }
    
    // Listen for auth changes
    const handleStorageChange = () => {
      let storedId = localStorage.getItem('alphaG8Id');
      const sessionActive = localStorage.getItem('sessionActive');
      
      // Convert old ALPHAG8- format to new FAGRI- format
      if (storedId && storedId.startsWith('ALPHAG8-')) {
        const newId = storedId.replace('ALPHAG8-', 'FAGRI-');
        localStorage.setItem('alphaG8Id', newId);
        storedId = newId;
      }
      
      if (storedId && sessionActive === 'true') {
        setIsAuthenticated(true);
        setAlphaG8Id(storedId);
        loadUserData(storedId);
      } else {
        setIsAuthenticated(false);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleGoHome = () => {
    // Use fast SPA navigation instead of page reload
    setLocation('/');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginId.trim()) return;
    
    setIsLoggingIn(true);
    
    // Instant authentication for better UX
    if (loginId.trim().length >= 8) { // Basic validation
      // Convert old ALPHAG8- format to new FAGRI- format if needed
      let processedId = loginId.trim();
      if (processedId.startsWith('ALPHAG8-')) {
        processedId = processedId.replace('ALPHAG8-', 'FAGRI-');
      }
      
      localStorage.setItem('alphaG8Id', processedId);
      localStorage.setItem('sessionActive', 'true');
      setIsAuthenticated(true);
      setAlphaG8Id(processedId);
    }
    setIsLoggingIn(false);
  };

  // Removed loading state for instant page rendering

  // Replace the empty second screen with functional dashboard navigation
  const handleViewProjects = () => {
    setShowMyProjects(true);
  };

  const handleUploadProject = () => {
    setShowProjectCreation(true);
  };

  const handleOrganizationInformation = () => {
    setShowOrganizationInfo(true);
  };

  const handleViewPricing = () => {
    setShowPricingInfo(true);
  };

  const handleAdminPanel = () => {
    setShowAdminPanel(true);
  };



  // Mock: determine user role based on FAGRI ID (in real app, this comes from backend)
  useEffect(() => {
    if (alphaG8Id === 'FAGRI-2MKQW8X9-PLVNR4T6-A2' || alphaG8Id === 'FAGRI-5ZXCV9L4-ASDFGH34-C1') {
      setCurrentUserRole('FAGRI Sales Team');
    } else {
      setCurrentUserRole('FAGRI Member');
    }
  }, [alphaG8Id]);

  const handleViewKeyCard = () => {
    setShowSecurityDashboard(true);
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen relative flex items-center justify-center p-4"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Main content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Glass morphism card */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            {/* Header with logo styling */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-white mb-2">
                FAGRI.Digital
              </h1>
              <div className="w-16 h-0.5 bg-emerald-400 mx-auto mb-6"></div>
              <h2 className="text-xl font-light text-white/90 mb-4">
                {t('access-restricted')}
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('dashboard-requires-authentication')}
              </p>
            </div>

            {/* Access requirements */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-emerald-400/30">
                  <Lock className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-white font-medium mb-2">{t('required-access')}</h3>
                <p className="text-white/70 text-sm">
                  {t('enter-alphag8-id-key-to-access')}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4 mb-6">
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                  <Input
                    type="text"
                    placeholder="ALPHAG8 ID KEY"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:border-emerald-400 focus:ring-emerald-400"
                    disabled={isLoggingIn}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn || !loginId.trim()}
                  className="w-full bg-emerald-600/80 hover:bg-emerald-600 disabled:bg-gray-500/50 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-emerald-500/30 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      {t('authenticating')}...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      {t('access-dashboard')}
                    </>
                  )}
                </button>
              </form>

              {/* Return button */}
              <button
                onClick={handleGoHome}
                className="w-full bg-gray-600/80 hover:bg-gray-600 backdrop-blur-sm text-white font-medium py-2 px-6 rounded-xl transition-all duration-200 border border-gray-500/30 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('return-home')}
              </button>
            </div>

            {/* Features showcase */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="text-white/70">
                <div className="text-xs font-medium text-emerald-400 mb-1">CO₂ Certification</div>
                <div className="text-xs">EUFD2025-001</div>
                <div className="text-xs">Standard</div>
              </div>
              <div className="text-white/70">
                <div className="text-xs font-medium text-emerald-400 mb-1">Blockchain</div>
                <div className="text-xs">Secure &</div>
                <div className="text-xs">Transparent</div>
              </div>
              <div className="text-white/70">
                <div className="text-xs font-medium text-emerald-400 mb-1">Global Network</div>
                <div className="text-xs">Agricultural</div>
                <div className="text-xs">Excellence</div>
              </div>
            </div>
          </div>

          {/* Photo credit */}
          <div className="mt-4 text-center">
            <p className="text-white/60 text-xs">
              Foto By Gildo Cancelli
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Beautiful Agricultural Hero Strip */}
      <div 
        className="relative h-60 overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-emerald-800/50 to-transparent"></div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-light text-white mb-3">
                {t('project-tracking-dashboard')}
              </h1>
              <p className="text-emerald-100 text-lg font-light mb-4">
                {t('monitor-co2-certification-projects')}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-emerald-300 flex-shrink-0" />
                    <span className="text-white font-medium">{t('authenticated-session')}</span>
                  </div>
                </div>
                <div className="bg-emerald-600/30 backdrop-blur-sm rounded-lg px-6 py-3 border border-emerald-400/50 w-full sm:w-auto sm:min-w-[280px]">
                  <div className="text-xs text-emerald-200 font-medium">ALPHAG8 ID KEY</div>
                  <div className="text-white font-mono text-sm">{alphaG8Id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Photo credit */}
        <div className="absolute bottom-2 right-4">
          <p className="text-white/60 text-xs">
            Foto By Gildo Cancelli
          </p>
        </div>
      </div>

      <main className="relative -mt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation Options Card */}
          <div className="mb-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-light text-slate-900 mb-2">
                  {t('platform-workspace')}
                </h2>
                <p className="text-slate-600">
                  {t('access-co2-certification-tools')}
                </p>
              </div>
              <div className="text-right">
                <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-sm font-medium mb-2 flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  {t('id-verified')}
                </div>
                <div className="text-xs text-emerald-600 font-medium">
                  {t('valid-for-one-year')}
                </div>
              </div>
            </div>
            
            {/* Navigation Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              <button
                onClick={handleViewKeyCard}
                className="flex flex-col items-center justify-center space-y-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-6 h-32 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <Shield className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-blue-800 font-medium text-center leading-tight">{t('security-id-key-card')}</span>
              </button>
              
              <button
                onClick={handleViewProjects}
                className="flex flex-col items-center justify-center space-y-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl p-6 h-32 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <Folder className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-emerald-800 font-medium text-center leading-tight">{t('my-projects')}</span>
              </button>
              
              <button
                onClick={handleUploadProject}
                className="flex flex-col items-center justify-center space-y-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-6 h-32 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <FileText className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-green-800 font-medium text-center leading-tight">{t('upload-new-project')}</span>
              </button>
              
              <button
                onClick={handleOrganizationInformation}
                className="flex flex-col items-center justify-center space-y-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-6 h-32 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <Building2 className="h-6 w-6 text-slate-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-slate-800 font-medium text-center leading-tight">{t('organization-information')}</span>
              </button>
              
              <button
                onClick={handleViewPricing}
                className="flex flex-col items-center justify-center space-y-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl p-6 h-32 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <Euro className="h-7 w-7 text-orange-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-orange-800 font-medium text-center leading-tight">{t('view-certification-pricing')}</span>
              </button>

              <button
                onClick={() => setShowKycSection(true)}
                className="flex flex-col items-center justify-center space-y-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-6 h-32 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <Shield className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-blue-800 font-medium text-center leading-tight">KYC Verifica</span>
              </button>

              <button
                onClick={() => setShowPaymentSection(true)}
                className="flex flex-col items-center justify-center space-y-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-6 h-32 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <Euro className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-green-800 font-medium text-center leading-tight">Pagamenti</span>
              </button>

              <button
                onClick={() => setShowAuditTrail(true)}
                className="flex flex-col items-center justify-center space-y-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-6 h-32 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <FileText className="h-6 w-6 text-gray-600 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-gray-800 font-medium text-center leading-tight">Cronologia</span>
              </button>
              
              {/* Admin Panel - only show for Sales Team */}
              {currentUserRole === 'FAGRI Sales Team' && (
                <button
                  onClick={handleAdminPanel}
                  className="flex flex-col items-center justify-center space-y-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl p-6 h-32 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center h-8 w-8">
                    <Settings className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-purple-800 font-medium text-center leading-tight">Admin Panel</span>
                </button>
              )}
            </div>
          </div>
          
          <ProjectTrackingDashboard userId={alphaG8Id} />
        </div>
      </main>

      {/* Security Dashboard Modal */}
      <SecurityDashboardModal
        isOpen={showSecurityDashboard}
        onClose={() => setShowSecurityDashboard(false)}
        alphaG8Id={alphaG8Id}
      />

      {/* Organization Information Modal */}
      <OrganizationInformationModal
        isOpen={showOrganizationInfo}
        onClose={() => setShowOrganizationInfo(false)}
        alphaG8Id={alphaG8Id}
      />

      {/* Certification Pricing Modal */}
      <CertificationPricingModal
        isOpen={showPricingInfo}
        onClose={() => setShowPricingInfo(false)}
      />

      {/* Admin User Management Modal */}
      <AdminUserManagementModal
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        currentUserRole={currentUserRole}
      />

      {/* Project Creation Modal */}
      <ProjectCreationModal
        isOpen={showProjectCreation}
        onClose={() => setShowProjectCreation(false)}
        alphaG8Id={alphaG8Id}
        onProjectCreated={() => {
          // Refresh projects list when new project is created
          setShowProjectCreation(false);
          setShowMyProjects(true);
          // Dispatch custom event to refresh projects
          window.dispatchEvent(new Event('projectsUpdated'));
        }}
      />

      {/* KYC ALPHAG8 Integration Modal */}
      <KYCAlphaG8Integration 
        isOpen={showKycSection}
        onClose={() => setShowKycSection(false)}
        userRole={currentUserRole}
        onIdKeyGenerated={(idKey) => {
          setAlphaG8Id(idKey);
          loadUserData(idKey);
        }}
      />

      {/* Payment Status Section Modal */}
      {showPaymentSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Gestione Pagamenti</h2>
              <Button
                variant="outline"
                onClick={() => setShowPaymentSection(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna al Dashboard
              </Button>
            </div>
            <div className="p-6 overflow-y-auto h-full">
              <PaymentStatusSection 
                fagriIdKey={alphaG8Id}
                userRole={currentUserRole}
                projects={userProjects}
                onPaymentUpdate={handlePaymentUpdate}
              />
            </div>
          </div>
        </div>
      )}

      {/* Audit Trail Display Modal */}
      {showAuditTrail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Cronologia Attività</h2>
              <Button
                variant="outline"
                onClick={() => setShowAuditTrail(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna al Dashboard
              </Button>
            </div>
            <div className="p-6 overflow-y-auto h-full">
              <AuditTrailDisplay 
                fagriIdKey={alphaG8Id}
                userRole={currentUserRole}
              />
            </div>
          </div>
        </div>
      )}

      {/* My Projects Display Modal */}
      {showMyProjects && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{t('my-projects')}</h2>
              <Button
                variant="outline"
                onClick={() => setShowMyProjects(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('back-to-dashboard')}
              </Button>
            </div>
            <div className="p-6 overflow-y-auto h-full">
              <MyProjectsDisplay 
                userId={alphaG8Id}
                onCreateNew={() => {
                  setShowMyProjects(false);
                  setShowProjectCreation(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}