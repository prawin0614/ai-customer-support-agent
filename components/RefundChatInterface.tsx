/**
 * Modern Chat Interface - 3-Column Layout
 * ChatGPT-style refund request interface with real-time reasoning
 * Left: AI Avatar & Status | Center: Chat | Right: Customer Profile
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Badge, Avatar, Skeleton } from '@/components/ui';
import { Send, Loader, User, Package, TrendingUp, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { RefundDecision } from '@/types';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  decision?: RefundDecision;
  timestamp: Date;
}

const suggestedPrompts = [
  { text: 'Request refund for customer ID 1', emoji: '💬' },
  { text: 'Check refund eligibility for customer 5', emoji: '🔍' },
  { text: 'Review pending approvals', emoji: '📋' },
];

export default function RefundChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId.trim()) {
      alert('Please enter a customer ID');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `Request refund for customer ID ${customerId}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCustomerId('');
    setLoading(true);

    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: parseInt(customerId) }),
      });

      const decision: RefundDecision = await response.json();
      setSelectedCustomer(decision.customerDetails);

      // Simulate streaming response
      await new Promise((resolve) => setTimeout(resolve, 500));

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: decision.reason,
        decision,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to process request'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedPrompt = (text: string) => {
    const id = text.match(/\d+/)?.[0];
    if (id) {
      setCustomerId(id);
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'APPROVED':
        return { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-300' };
      case 'DENIED':
        return { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-300' };
      case 'PENDING_MANAGER_APPROVAL':
        return { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-700 dark:text-yellow-300' };
      default:
        return { bg: 'bg-gray-50 dark:bg-gray-800', border: 'border-gray-200 dark:border-gray-700', text: 'text-gray-700 dark:text-gray-300' };
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white dark:bg-gray-900 gap-4 p-4">
      {/* LEFT SIDEBAR - AI Avatar & Status */}
      <div className="w-64 hidden lg:flex flex-col gap-4">
        {/* AI Avatar Card */}
        <Card className="p-6 flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar initials="AI" size="xl" status="online" gradient />
            <div className="absolute inset-0 rounded-full animate-pulse opacity-20 bg-blue-400"></div>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">RefundAI Assistant</h3>
            <p className="text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-1 mt-1">
              <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
              Online
            </p>
          </div>
        </Card>

        {/* Policy Summary */}
        <Card className="p-6 flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Policy Summary</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">30-Day Window</p>
                <p className="text-gray-600 dark:text-gray-400">From order date</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Manager Approval</p>
                <p className="text-gray-600 dark:text-gray-400">Over ₹10,000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Physical Only</p>
                <p className="text-gray-600 dark:text-gray-400">No digital products</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* CENTER - CHAT AREA */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome to RefundAI
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs">
                  Enter a customer ID to request a refund. I'll analyze it against our policy in seconds.
                </p>

                {/* Suggested Prompts */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Try these:</p>
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                      className="block w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 transition text-left text-sm"
                    >
                      <span className="mr-2">{prompt.emoji}</span>
                      {prompt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-bl-none'
                  }`}>
                    <p className="text-sm">{message.content}</p>

                    {/* Decision Result */}
                    {message.decision && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
                        <div
                          className={`px-3 py-2 rounded-lg border text-center text-sm font-semibold ${
                            getDecisionColor(message.decision.decision).bg
                          } ${getDecisionColor(message.decision.decision).border} ${
                            getDecisionColor(message.decision.decision).text
                          }`}
                        >
                          {message.decision.decision === 'APPROVED' && '✓ APPROVED'}
                          {message.decision.decision === 'DENIED' && '✗ DENIED'}
                          {message.decision.decision === 'PENDING_MANAGER_APPROVAL' && '⏳ PENDING APPROVAL'}
                        </div>

                        {message.decision.refundAmount && (
                          <p className="text-sm font-semibold">
                            Amount: <span className="text-green-600 dark:text-green-400">₹{message.decision.refundAmount}</span>
                          </p>
                        )}

                        <details className="text-xs">
                          <summary className="cursor-pointer font-semibold hover:opacity-80">View Reasoning ({message.decision.logs.length} steps)</summary>
                          <div className="mt-2 space-y-1 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                            {message.decision.logs.map((log, idx) => (
                              <div key={idx} className="text-xs text-gray-700 dark:text-gray-300">
                                <span className="font-medium">{idx + 1}. {log.tool}</span>
                                <p className="text-gray-600 dark:text-gray-400">{log.details}</p>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )}

                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-700 rounded-lg rounded-bl-none p-4 text-gray-900 dark:text-white">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="number"
            min="1"
            max="15"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter customer ID..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading || !customerId}
            className="px-6"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>

      {/* RIGHT SIDEBAR - Customer Profile */}
      {selectedCustomer ? (
        <div className="w-64 hidden xl:flex flex-col gap-4">
          <Card className="p-6 space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <Avatar initials={selectedCustomer.name.slice(0, 2).toUpperCase()} size="lg" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{selectedCustomer.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{selectedCustomer.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Product</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedCustomer.product}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Order Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedCustomer.orderDate}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">₹{selectedCustomer.amount}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Badge variant={selectedCustomer.productType === 'physical' ? 'success' : 'error'} size="sm">
                  {selectedCustomer.productType}
                </Badge>
                {selectedCustomer.damagedProduct && (
                  <Badge variant="error" size="sm">Damaged</Badge>
                )}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="w-64 hidden xl:flex">
          <Card className="p-6 w-full flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">Customer profile will appear here</p>
          </Card>
        </div>
      )}
    </div>
  );
}
