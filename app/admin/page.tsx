/**
 * Admin Dashboard - Enterprise Dashboard
 * Overview of refund requests, approvals, and metrics
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import { TrendingUp, CheckCircle, XCircle, Clock, Search, Plus } from 'lucide-react';
import Link from 'next/link';

const mockData = {
  stats: [
    { label: 'Total Requests', value: '342', change: '+12%', icon: TrendingUp, color: 'blue' },
    { label: 'Approved', value: '287', change: '+8%', icon: CheckCircle, color: 'green' },
    { label: 'Denied', value: '45', change: '-2%', icon: XCircle, color: 'red' },
    { label: 'Pending Review', value: '10', change: '+3', icon: Clock, color: 'yellow' },
  ],
  recentDecisions: [
    { id: 1, customer: 'Rajesh Kumar', email: 'rajesh.kumar@gmail.com', amount: '₹24,999', status: 'PENDING_MANAGER_APPROVAL', date: '2 min ago' },
    { id: 2, customer: 'Priya Singh', email: 'priya.singh@gmail.com', amount: '₹6,299', status: 'DENIED', date: '15 min ago' },
    { id: 3, customer: 'Amit Patel', email: 'amit.patel@gmail.com', amount: '₹54,999', status: 'APPROVED', date: '1 hour ago' },
    { id: 4, customer: 'Neha Gupta', email: 'neha.gupta@gmail.com', amount: '₹89,999', status: 'DENIED', date: '2 hours ago' },
    { id: 5, customer: 'Vikram Reddy', email: 'vikram.reddy@gmail.com', amount: '₹45,000', status: 'APPROVED', date: '3 hours ago' },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200' };
    case 'DENIED':
      return { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200' };
    case 'PENDING_MANAGER_APPROVAL':
      return { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-200' };
    default:
      return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-800 dark:text-gray-200' };
  }
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'denied' | 'pending'>('all');

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Refund request overview and management</p>
            </div>
            <Link href="/admin/approve">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus size={18} />
                View Approvals
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {mockData.stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</h3>
                  <Icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <span className="text-sm text-green-600 dark:text-green-400">{stat.change}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Decisions Section */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Decisions</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest refund request outcomes</p>
              </div>

              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                {(['all', 'approved', 'denied', 'pending'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      filter === f
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by customer ID or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Customer</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Time</th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockData.recentDecisions.map((decision) => (
                  <tr key={decision.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{decision.customer}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{decision.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 dark:text-white">{decision.amount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          decision.status === 'APPROVED'
                            ? 'success'
                            : decision.status === 'DENIED'
                              ? 'error'
                              : 'warning'
                        }
                        size="sm"
                      >
                        {decision.status === 'APPROVED'
                          ? 'Approved'
                          : decision.status === 'DENIED'
                            ? 'Denied'
                            : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{decision.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
