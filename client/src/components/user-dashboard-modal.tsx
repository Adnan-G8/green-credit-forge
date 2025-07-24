import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
  Settings,
  Lock
} from 'lucide-react';


interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
  userRole?: string;
}

export function UserDashboardModal({ isOpen, onClose, alphaG8Id, userRole = "FAGRI Member" }: UserDashboardModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();


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
        <DialogContent className="max-w-3xl max-h-[85vh] bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 shadow-2xl p-0 overflow-y-auto z-[10005]">
          <DialogTitle className="sr-only">User Dashboard</DialogTitle>
          <DialogDescription className="sr-only">Access your account dashboard and manage projects</DialogDescription>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 px-6 py-4 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-emerald-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-light mb-1">User Dashboard</h2>
                  <p className="text-emerald-100 text-sm">FAGRI.Digital Platform Access</p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white px-3 py-1">
                {userRole}
              </Badge>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* ALPHAG8 ID Section */}
              <div className="lg:col-span-2">
                <Card className="border-2 border-blue-200 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <pattern id="key-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3"/>
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#key-pattern)" />
                      </svg>
                    </div>
                    <div className="relative flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <Key className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl font-light mb-2">
                          Your ALPHAG8 ID KEY
                        </CardTitle>
                        <CardDescription className="text-blue-100">
                          {t('secure-identity-verification')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 bg-gradient-to-br from-slate-50 to-blue-50">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="bg-white rounded-xl p-4 border-2 border-dashed border-blue-300 shadow-inner">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Shield className="h-6 w-6 text-blue-600" />
                            </div>
                            <p className="text-xs text-slate-600 mb-2 font-medium">ALPHAG8 ID KEY</p>
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-4 mb-4">
                              <p className="font-mono text-lg font-bold tracking-wider">
                                {alphaG8Id}
                              </p>
                            </div>
                            <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                              <Shield className="h-3 w-3" />
                              <span>Swiss Banking Security</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={handleCopyId}
                          variant="outline"
                          className="border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {t('copy-id')}
                        </Button>
                        <Button
                          onClick={handleDownloadCertificate}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white transition-all duration-200"
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
                <Card className="border-slate-200 shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-4">
                    <CardTitle className="text-white text-lg font-light flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Settings className="h-4 w-4 text-white" />
                      </div>
                      <span>{t('quick-actions')}</span>
                    </CardTitle>
                  </div>
                  <CardContent className="p-4 bg-gradient-to-br from-slate-50 to-gray-50">
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('logout')}
                    </Button>
                  </CardContent>
                </Card>

                {/* User Profile Card */}
                <Card className="border-slate-200 shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                    <div className="flex items-center space-x-3 text-white">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">FAGRI Member</p>
                        <p className="text-xs text-blue-100">Active Session</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex items-center space-x-2 text-xs text-slate-600">
                      <Shield className="h-3 w-3 text-blue-600" />
                      <span>Swiss Security Verified</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Platform Features */}
            <div className="mt-6">
              <h3 className="text-lg font-light text-slate-800 mb-4">Platform Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Document Management */}
                <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className="relative h-24 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                    {/* Document Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <pattern id="doc-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                            <rect x="8" y="8" width="9" height="12" fill="currentColor" opacity="0.3" rx="1"/>
                            <rect x="8" y="8" width="7" height="2" fill="currentColor" opacity="0.5" rx="0.5"/>
                            <rect x="8" y="12" width="9" height="1" fill="currentColor" opacity="0.4" rx="0.5"/>
                            <rect x="8" y="15" width="6" height="1" fill="currentColor" opacity="0.4" rx="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#doc-pattern)" />
                      </svg>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <Folder className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="text-lg font-light mb-1">{t('document-management')}</h4>
                      <div className="flex items-center space-x-1 text-orange-100">
                        <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                        <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                        <div className="w-2 h-2 bg-white rounded-full opacity-20"></div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 bg-gradient-to-br from-orange-50 to-red-50">
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                      {t('manage-upload-organize-documents')}
                    </p>
                    <Button
                      disabled
                      className="w-full bg-gray-400 text-white cursor-not-allowed"
                    >
                      <Folder className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>

                {/* Project Registration */}
                <Card className="border-emerald-200 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className="relative h-24 bg-gradient-to-br from-emerald-500 to-green-600 overflow-hidden">
                    {/* Agricultural Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <pattern id="agri-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="8" r="2" fill="currentColor" opacity="0.4"/>
                            <path d="M10 10 L10 16 M8 12 L12 12 M8 14 L12 14" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#agri-pattern)" />
                      </svg>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="text-lg font-light mb-1">{t('project-registration')}</h4>
                      <div className="flex items-center space-x-1 text-emerald-100">
                        <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                        <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                        <div className="w-2 h-2 bg-white rounded-full opacity-20"></div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 bg-gradient-to-br from-emerald-50 to-green-50">
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                      {t('register-co2-certification-projects')}
                    </p>
                    <Button
                      disabled
                      className="w-full bg-gray-400 text-white cursor-not-allowed"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Security Info */}
            <div className="mt-6">
              <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg overflow-hidden">
                <div className="relative">
                  {/* Swiss Mountains Background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 200 60" className="w-full h-full">
                      <path d="M0 50 L30 20 L60 35 L90 10 L120 30 L150 15 L180 25 L200 20 L200 60 L0 60 Z" fill="currentColor" />
                      <path d="M0 55 L25 30 L50 40 L80 25 L110 35 L140 20 L170 30 L200 25 L200 60 L0 60 Z" fill="currentColor" opacity="0.5" />
                    </svg>
                  </div>
                  <CardContent className="p-4 relative">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800 mb-2 text-lg">
                          {t('secure-session')}
                        </h4>
                        <p className="text-sm text-green-700 leading-relaxed mb-3">
                          {t('session-protected-swiss-security')}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-green-600">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Active Security</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="h-3 w-3" />
                            <span>Encrypted Session</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>


    </>
  );
}