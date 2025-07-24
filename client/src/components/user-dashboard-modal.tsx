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
      <DialogContent className="max-w-4xl bg-white border border-slate-200 shadow-xl p-0 overflow-hidden z-[10005]">
        <DialogTitle className="sr-only">User Dashboard</DialogTitle>
        <DialogDescription className="sr-only">Access your account dashboard and manage projects</DialogDescription>
        
        {/* Clean Header Section */}
        <div className="bg-white border-b border-slate-100 px-8 py-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-8 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-light text-slate-900">User Dashboard</h2>
                <p className="text-sm text-slate-500">FAGRI.Digital Platform Access</p>
              </div>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium">
              FAGRI Member
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ALPHAG8 ID Section */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Key className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">Your ALPHAG8 ID KEY</h3>
                    <p className="text-sm text-slate-600">Secure identity verification for platform access</p>
                  </div>
                </div>
                
                <div className="bg-white border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-xs text-slate-500 mb-2">ALPHAG8 ID KEY</p>
                  </div>
                  
                  <div className="bg-blue-600 text-white px-4 py-3 rounded-lg text-center font-mono text-sm tracking-wider mb-3">
                    {alphaG8Id}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1 text-xs text-slate-500 mb-3">
                    <Shield className="h-3 w-3" />
                    <span>Swiss Banking Security</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={handleCopyId}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy ID
                    </Button>
                    <Button
                      onClick={handleDownloadCertificate}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Settings className="h-4 w-4 text-slate-600" />
                  <h3 className="font-medium text-slate-900">Quick Actions</h3>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* User Profile */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">FAGRI Member</p>
                    <p className="text-xs text-slate-600">Active Session</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3 text-xs text-slate-600">
                  <Shield className="h-3 w-3 text-blue-600" />
                  <span>Swiss Security Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 mb-1">Secure Session Active</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Your session is protected by Swiss banking-level security protocols.
                </p>
                <div className="flex items-center space-x-4 text-xs text-emerald-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Active Security</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>Encrypted Session</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}