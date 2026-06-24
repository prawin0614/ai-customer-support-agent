/**
 * Modern Landing Page / Home
 */

'use client';

import Link from 'next/link';
import { ArrowRight, Zap, CheckCircle, Brain, Clock } from 'lucide-react';
import { Button, Card, Badge, Avatar } from '@/components/ui';

const features = [
  {
    icon: Zap,
    title: 'Instant Decisions',
    description: 'AI-powered refund decisions in milliseconds',
  },
  {
    icon: Brain,
    title: 'Policy Validation',
    description: 'Intelligent rule engine with business logic',
  },
  {
    icon: CheckCircle,
    title: 'Reasoning Logs',
    description: 'Complete transparency in every decision',
  },
  {
    icon: Clock,
    title: 'Manager Approval',
    description: 'Seamless workflow for high-value refunds',
  },
];

const stats = [
  { label: 'Approval Rate', value: '94%', icon: '✅' },
  { label: 'Avg Response', value: '< 100ms', icon: '⚡' },
  { label: 'Satisfaction', value: '4.9/5', icon: '⭐' },
  { label: 'Requests', value: '10K+', icon: '📊' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6 hover:scale-105 transition-transform">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Enterprise-Grade AI</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Intelligent Refund Automation
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Process refund requests instantly with AI-powered decision logic. Transparent reasoning, manager approvals, and complete audit trails.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chat">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Start Chat <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/admin/login">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Admin Portal
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-96 flex items-center justify-center">
                <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-10 blur-3xl animate-pulse" />
                <div className="animate-bounce">
                  <Avatar size="lg" initials="AI" className="w-32 h-32" />
                </div>
              </div>

              <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
                <span className="font-semibold text-slate-900 dark:text-white">RefundAI Assistant</span>
                <br />
                Ready to process refund requests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
            >
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">Everything you need for intelligent refund management</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="hover:scale-105 transition-transform">
                <Card className="h-full p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 p-12">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to transform your refund process?</h3>
            <p className="text-blue-100 text-lg mb-8">Start automating refund decisions with AI today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Start Chat Now
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto border border-white text-white hover:bg-white/10">
                  Admin Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="font-bold">RefundAI</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">© 2026 AI Customer Support Agent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
