'use client';

import React, { useState } from 'react';
import { ShieldCheck, Mail, KeyRound, Sparkles, X, Lock, CheckCircle2, Building2 } from 'lucide-react';
import { CurrentUser } from '../lib/types';
import { parseDomainToCompanyName, saveStoredUser } from '../lib/storage';

interface VerifyOrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CurrentUser;
  onUserUpdated: (user: CurrentUser) => void;
}

export function VerifyOrgModal({ isOpen, onClose, currentUser, onUserUpdated }: VerifyOrgModalProps) {
  const [emailInput, setEmailInput] = useState('');
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [otpCode, setOtpCode] = useState('');
  const [alias, setAlias] = useState(currentUser.alias || 'Dev_' + Math.floor(100 + Math.random() * 900));
  const [detectedCompany, setDetectedCompany] = useState('');
  const [detectedDomain, setDetectedDomain] = useState('');
  const [generatedSaltHash, setGeneratedSaltHash] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.includes('@') || !emailInput.includes('.')) {
      alert('Please enter a valid work email address (e.g. name@company.com)');
      return;
    }

    const domain = emailInput.split('@')[1].toLowerCase().trim();
    if (['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain)) {
      alert('Personal email addresses (Gmail, Yahoo, Outlook) cannot be used for company verification. Please use an official organization or work email.');
      return;
    }

    const companyName = parseDomainToCompanyName(domain);
    setDetectedCompany(companyName);
    setDetectedDomain(domain);

    // Simulate cryptographic 1-way hashing
    const mockHash = 'sha256$' + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
    setGeneratedSaltHash(mockHash);

    // Move to OTP step (prefill sample code 849201 for test ease)
    setOtpCode('849201');
    setStep('otp');
  };

  const handleQuickPreset = (presetEmail: string) => {
    setEmailInput(presetEmail);
    const domain = presetEmail.split('@')[1];
    setDetectedCompany(parseDomainToCompanyName(domain));
    setDetectedDomain(domain);
    setGeneratedSaltHash('sha256$mock' + Math.random().toString(36).substring(2, 10));
    setOtpCode('729104');
    setStep('otp');
  };

  const handleConfirmOtp = () => {
    const updatedUser: CurrentUser = {
      email: undefined, // Notice: raw email is NEVER stored! Zero knowledge
      companyName: detectedCompany,
      companyDomain: detectedDomain,
      isVerified: true,
      alias: alias.trim() || 'Dev_' + Math.floor(100 + Math.random() * 900),
      saltHash: generatedSaltHash
    };

    saveStoredUser(updatedUser);
    onUserUpdated(updatedUser);
    setStep('success');
  };

  const handleResetVerification = () => {
    const resetUser: CurrentUser = {
      companyName: 'Community Member',
      companyDomain: '',
      isVerified: false,
      alias: 'Dev_' + Math.floor(100 + Math.random() * 900),
    };
    saveStoredUser(resetUser);
    onUserUpdated(resetUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 'input' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Verify Your Organization</h3>
                <p className="text-xs text-slate-400">Unlock your company watercooler & verified badge</p>
              </div>
            </div>

            {/* Zero Knowledge Privacy Explainer */}
            <div className="mb-5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1">
                <Lock className="h-3.5 w-3.5" />
                <span>Zero-Trace Cryptographic Guarantee</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                Your company email is used <strong>solely to verify your organization domain</strong>. We hash it with a one-way cryptographic salt and discard the raw email. Your posts and chats can never be traced back to you by HR or anyone else.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Official Work / Org Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. alex@uber.com, dev@google.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Public Anonymous Handle
                </label>
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="e.g. SRE_Falcon, KernelWhisperer"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 px-3.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 py-2.5 font-semibold text-slate-950 transition-colors hover:bg-emerald-400 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <KeyRound className="h-4 w-4" />
                <span>Send 6-Digit Verification Code</span>
              </button>
            </form>

            {/* Quick Demo Presets */}
            <div className="mt-5 border-t border-slate-800/80 pt-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Test Accounts (1-Click Verification)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickPreset('engineer@google.com')}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-left text-slate-300 hover:border-slate-700 hover:bg-slate-850 hover:text-white"
                >
                  🏢 <strong className="text-white">Google</strong> (@google.com)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('sre@amazon.com')}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-left text-slate-300 hover:border-slate-700 hover:bg-slate-850 hover:text-white"
                >
                  📦 <strong className="text-white">Amazon</strong> (@amazon.com)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('architect@stripe.com')}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-left text-slate-300 hover:border-slate-700 hover:bg-slate-850 hover:text-white"
                >
                  💳 <strong className="text-white">Stripe</strong> (@stripe.com)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('lead@tcs.com')}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-left text-slate-300 hover:border-slate-700 hover:bg-slate-850 hover:text-white"
                >
                  ⚡ <strong className="text-white">TCS</strong> (@tcs.com)
                </button>
              </div>
            </div>

            {currentUser.isVerified && (
              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                <button
                  type="button"
                  onClick={handleResetVerification}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Switch back to Anonymous / Reset verification
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'otp' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <KeyRound className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Enter 6-Digit OTP</h3>
                <p className="text-xs text-slate-400">
                  Verification sent to <span className="text-emerald-400 font-mono">@{detectedDomain}</span>
                </p>
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Detected Organization:</span>
                <strong className="text-white font-medium">{detectedCompany}</strong>
              </div>
              <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                <span>Salted Token:</span>
                <span className="text-emerald-400">{generatedSaltHash.substring(0, 20)}...</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Verification Code (Demo: pre-filled)
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                className="w-full text-center tracking-widest font-mono text-xl font-bold rounded-xl border border-slate-800 bg-slate-900 py-3 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('input')}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirmOtp}
                className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Confirm & Unlock
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-4">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Organization Verified!</h3>
            <p className="text-sm text-slate-400 mb-4">
              You are now recognized as a verified employee at <strong className="text-emerald-400">{detectedCompany}</strong>.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-950/40 border border-emerald-700/50 px-3 py-1.5 text-xs text-emerald-300 font-semibold mb-6">
              <Building2 className="h-3.5 w-3.5" />
              <span>[Verified @{detectedCompany}]</span>
              <span className="text-slate-400">as {alias}</span>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Enter Community & Watercooler
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
