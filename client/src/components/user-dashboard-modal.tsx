import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from './language-provider';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Key, 
  FileText, 
  Folder, 
  Shield, 
  LogOut, 
  Copy, 
  Download,
  ChevronRight,
  X,
  Settings
} from 'lucide-react';
import { DocumentManagementModal } from './document-management-modal';
import { ProjectRegistrationModal } from './project-registration-modal';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
  userRole?: string;
}

export function UserDashboardModal({ isOpen, onClose, alphaG8Id, userRole = "FAGRI Member" }: UserDashboardModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showDocumentManagement, setShowDocumentManagement] = useState(false);
  const [showProjectRegistration, setShowProjectRegistration] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(alphaG8Id);
    toast({
      title: t('copied-to-clipboard'),
      description: t('alphag8-id-copied'),
    });
  };

  const handleDownloadCertificate = () => {
    const certificate = `ALPHAG8 ID CERTIFICATE
    
Identity Verification Document
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALPHAG8 ID KEY: ${alphaG8Id}
Role: ${userRole}
Platform: FAGRI.Digital CO₂ Certification
Issue Date: ${new Date().toLocaleDateString()}
Valid Until: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}

Security Features:
• Swiss Banking-Level Encryption
• Multi-Factor Authentication
• Blockchain-Verified Identity
• ISO 14064 Compliance Ready

Certificate Authority: ALPHAG8 Switzerland
Digital Signature: SHA-256 Encrypted
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This certificate confirms identity verification for
access to FAGRI.Digital CO₂ certification platform.

For support: Contact@fagri.digital
Security: swiss-security@alphag8.digital`;

    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ALPHAG8-Certificate-${alphaG8Id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: t('certificate-downloaded'),
      description: t('certificate-downloaded-desc'),
    });
  };

  const handleLogout = () => {
    toast({
      title: t('logged-out'),
      description: t('session-ended-successfully'),
    });
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 shadow-2xl p-0 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 px-8 py-6 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-emerald-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-light mb-1">User Dashboard</h2>
                  <p className="text-emerald-100 text-sm">FAGRI.Digital Platform Access</p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white px-3 py-1">
                {userRole}
              </Badge>
            </div>
          </div>

          <div className="px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ALPHAG8 ID Section */}
              <div className="lg:col-span-2">
                <Card className="border-2 border-blue-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                    <CardTitle className="text-blue-800 flex items-center space-x-3">
                      <Key className="h-6 w-6" />
                      <span>Your ALPHAG8 ID KEY</span>
                    </CardTitle>
                    <CardDescription className="text-blue-700">
                      {t('secure-identity-verification')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="bg-slate-100 rounded-lg p-4 border-2 border-dashed border-slate-300">
                        <div className="text-center">
                          <p className="text-xs text-slate-600 mb-2">ALPHAG8 ID KEY</p>
                          <p className="font-mono text-lg font-bold text-slate-800 tracking-wider">
                            {alphaG8Id}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={handleCopyId}
                          variant="outline"
                          className="flex-1 border-blue-300 hover:bg-blue-50"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {t('copy-id')}
                        </Button>
                        <Button
                          onClick={handleDownloadCertificate}
                          variant="outline"
                          className="flex-1 border-green-300 hover:bg-green-50"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {t('download-certificate')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <Card className="border-slate-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-slate-800 text-lg">
                      {t('quick-actions')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('logout')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Platform Features */}
            <div className="mt-8">
              <h3 className="text-xl font-light text-slate-800 mb-6">Platform Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Document Management */}
                <Card className="border-orange-200 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Folder className="h-6 w-6 text-orange-700" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-orange-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-800 mb-2">
                      {t('document-management')}
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      {t('manage-upload-organize-documents')}
                    </p>
                    <Button
                      onClick={() => setShowDocumentManagement(true)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      {t('open-documents')}
                    </Button>
                  </CardContent>
                </Card>

                {/* Project Registration */}
                <Card className="border-emerald-200 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-emerald-700" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-emerald-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h4 className="text-lg font-medium text-slate-800 mb-2">
                      {t('project-registration')}
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      {t('register-co2-certification-projects')}
                    </p>
                    <Button
                      onClick={() => setShowProjectRegistration(true)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      {t('register-project')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Security Info */}
            <div className="mt-8">
              <Card className="border-slate-200 bg-slate-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Shield className="h-6 w-6 text-slate-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">
                        {t('secure-session')}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {t('session-protected-swiss-security')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sub-modals */}
      <DocumentManagementModal
        isOpen={showDocumentManagement}
        onClose={() => setShowDocumentManagement(false)}
      />
      
      <ProjectRegistrationModal
        isOpen={showProjectRegistration}
        onClose={() => setShowProjectRegistration(false)}
      />
    </>
  );
}