import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './language-provider';
import { useSupabaseAuth } from '../hooks/use-supabase-auth';
import { useLocation } from 'wouter';
import { X, User, Key, Shield, Copy, Download, LogOut, Settings, Navigation, Folder, FileText } from 'lucide-react';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphaG8Id: string;
  userRole: string;
}

export function UserDashboardModal({ isOpen, onClose, alphaG8Id, userRole }: UserDashboardModalProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { signOut } = useSupabaseAuth();
  const [, setLocation] = useLocation();

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
    a.download = `FAGRI-Certificate-${alphaG8Id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: t('certificate-downloaded'),
      description: t('certificate-downloaded-desc'),
    });
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    } else {
      toast({
        title: t('logged-out'),
        description: t('session-ended-successfully'),
      });
      onClose();
      setLocation('/auth');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
           onClick={(e) => e.stopPropagation()}>
        <div className="sr-only">User Dashboard</div>
        <div className="sr-only">Access your account dashboard and manage projects</div>
        
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-slate-50/80 to-white border-b border-slate-200/80 px-10 py-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-8 w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
          
          <div className="flex items-center justify-between pr-16">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-light text-slate-900 mb-2">User Dashboard</h1>
                <p className="text-slate-600">FAGRI.Digital Platform Access</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl font-medium shadow-lg">
              FAGRI Member
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-10 bg-gradient-to-br from-slate-50/50 to-white min-h-[600px]">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">
            {/* ALPHAG8 ID Section */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-10 shadow-lg">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Key className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-light text-slate-900 mb-3">Your ALPHAG8 ID KEY</h2>
                    <p className="text-slate-600">Secure identity verification for platform access</p>
                  </div>
                </div>
                
                {/* ID Display */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                      <Shield className="h-10 w-10 text-blue-600" />
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-widest">ALPHAG8 ID KEY</p>
                    
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-2xl font-mono text-lg tracking-wide mb-6 shadow-lg">
                      {alphaG8Id}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="text-center">
                        <p className="text-slate-500 mb-1">Issue Date</p>
                        <p className="font-medium text-slate-700">{new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-500 mb-1">Valid Until</p>
                        <p className="font-medium text-emerald-600">{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-3 text-sm text-slate-500 mb-8">
                      <Shield className="h-4 w-4" />
                      <span>Swiss Banking Security</span>
                      <span className="text-emerald-600 font-medium">• Valid for 1 Year</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={handleCopyId}
                        variant="outline"
                        size="lg"
                        className="border-slate-300 hover:bg-slate-50 text-slate-700 font-medium"
                      >
                        <Copy className="h-5 w-5 mr-2" />
                        Copy ID
                      </Button>
                      <Button
                        onClick={handleDownloadCertificate}
                        size="lg"
                        className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg font-medium"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-8">
              {/* Navigation Options */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center shadow-sm">
                    <Navigation className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Platform Access</h3>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={() => window.location.href = '/dashboard'}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Folder className="h-5 w-5 mr-3" />
                    My Projects
                  </Button>
                  <Button
                    onClick={() => console.log('Upload new project')}
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FileText className="h-5 w-5 mr-3" />
                    Upload New Project
                  </Button>
                  <Button
                    onClick={() => console.log('My Information')}
                    size="lg"
                    variant="outline"
                    className="w-full border-slate-300 hover:bg-slate-50 text-slate-700 font-medium"
                  >
                    <User className="h-5 w-5 mr-3" />
                    My Information
                  </Button>
                  <Button
                    onClick={handleLogout}
                    size="lg"
                    className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </Button>
                </div>
              </div>

              {/* User Profile */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-900">FAGRI Member</p>
                    <p className="text-sm text-slate-500">Active Session</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-600">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span>Swiss Security Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="mt-10 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/80 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium text-slate-900 mb-2">Secure Session Active</h3>
                <p className="text-slate-600">Your session is protected by Swiss banking-level security protocols.</p>
              </div>
              <div className="flex items-center space-x-8 text-sm text-emerald-600">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Active Security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4" />
                  <span>Encrypted Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}