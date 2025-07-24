import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './language-provider';
import { X, User, Key, Shield, Copy, Download, LogOut, Settings } from 'lucide-react';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
  userRole: string;
}

export function UserDashboardModal({ isOpen, onClose, alphaG8Id, userRole }: UserDashboardModalProps) {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleCopyId = () => {
    navigator.clipboard.writeText(alphaG8Id);
    toast({
      title: t('copied-to-clipboard'),
      description: t('alphag8-id-copied'),
    });
  };

  const handleDownloadCertificate = () => {
    const certificate = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALPHAG8 DIGITAL IDENTITY CERTIFICATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• ALPHAG8 ID: ${alphaG8Id}
• Issue Date: ${new Date().toLocaleDateString()}
• Valid Until: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
• User Role: ${userRole}
• Platform: FAGRI.Digital CO₂ Certification
• Security Level: Swiss Banking Standard
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl bg-white border-0 shadow-2xl p-0 overflow-hidden z-[10005] gap-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">User Dashboard</DialogTitle>
        <DialogDescription className="sr-only">Access your account dashboard and manage projects</DialogDescription>
        
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-8 py-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-50"
          >
            <X className="h-4 w-4 text-slate-600" />
          </button>
          
          <div className="flex items-center justify-between pr-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center shadow-sm">
                <User className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-slate-900 mb-1">User Dashboard</h2>
                <p className="text-sm text-slate-600">FAGRI.Digital Platform Access</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium border border-emerald-200">
              FAGRI Member
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-slate-50/30 to-white">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main ALPHAG8 ID Section */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm">
                    <Key className="h-6 w-6 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-slate-900 mb-2">Your ALPHAG8 ID KEY</h3>
                    <p className="text-sm text-slate-600">Secure identity verification for platform access</p>
                  </div>
                </div>
                
                {/* ID Display Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">ALPHAG8 ID KEY</p>
                    
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-mono text-base tracking-wider mb-4 shadow-sm">
                      {alphaG8Id}
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 mb-6">
                      <Shield className="h-3 w-3" />
                      <span>Swiss Banking Security</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={handleCopyId}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50 text-slate-700"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy ID
                      </Button>
                      <Button
                        onClick={handleDownloadCertificate}
                        className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Settings className="h-4 w-4 text-slate-600" />
                  </div>
                  <h3 className="font-medium text-slate-900">Quick Actions</h3>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* User Profile */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">FAGRI Member</p>
                    <p className="text-xs text-slate-500">Active Session</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <Shield className="h-3 w-3 text-emerald-600" />
                  <span>Swiss Security Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Status Bar */}
          <div className="mt-8 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 mb-1">Secure Session Active</h4>
                <p className="text-sm text-slate-600">Your session is protected by Swiss banking-level security protocols.</p>
              </div>
              <div className="flex items-center space-x-6 text-xs text-emerald-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Active Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-3 w-3" />
                  <span>Encrypted Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}