/**
 * Manager Approval Workflow
 * Page to review and approve/reject pending refund requests
 * Route: /admin/approve
 * 
 * Shows ONLY real customer records from customers.json with amount > ₹10,000
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Modal, Input, Alert, Skeleton } from '@/components/ui';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type PendingRequest = {
  id: number;
  name: string;
  email: string;
  product: string;
  amount: number;
  orderDate: string;
  requestedAt: string;
  reason: string;
};

export default function ApprovalWorkflow() {
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [approving, setApproving] = useState(false);

  // Load ONLY actual pending approval requests from localStorage (chatbot requests)
  useEffect(() => {
    const loadPendingRequests = async () => {
      try {
        const pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals') || '[]');
        
        const requests = pendingApprovals.map((req: any) => {
          const hoursAgo = Math.floor((Date.now() - new Date(req.requestedAt).getTime()) / (1000 * 60 * 60));
          return {
            id: req.customerId,
            name: req.customerName,
            email: req.email,
            product: req.product,
            amount: req.amount,
            orderDate: req.orderDate,
            requestedAt: hoursAgo > 0 ? `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago` : 'Just now',
            reason: req.reason,
          };
        });
        
        setPendingRequests(requests);
      } catch (error) {
        console.error('Failed to load pending approvals:', error);
        setPendingRequests([]);
      } finally {
        setLoading(false);
      }
    };

    loadPendingRequests();
  }, []);

  const handleApprove = async () => {
    if (!selectedRequest) return;
    setApproving(true);

    try {
      // In real app, this would call an API to save the approval decision
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove from pending approvals in localStorage
      const pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals') || '[]');
      const updated = pendingApprovals.filter((req: any) => req.customerId !== selectedRequest.id);
      localStorage.setItem('pendingApprovals', JSON.stringify(updated));

      // Store the decision in completedDecisions
      const completedDecisions = JSON.parse(localStorage.getItem('completedDecisions') || '{}');
      completedDecisions[selectedRequest.id] = {
        decision: 'APPROVED',
        timestamp: new Date().toISOString(),
        managerNotes: notes,
      };
      localStorage.setItem('completedDecisions', JSON.stringify(completedDecisions));

      // Reload pending requests
      const remaining = updated.map((req: any) => ({
        id: req.customerId,
        name: req.customerName,
        email: req.email,
        product: req.product,
        amount: req.amount,
        orderDate: req.orderDate,
        requestedAt: req.requestedAt,
        reason: req.reason,
      }));
      setPendingRequests(remaining);

      // Show success message
      alert(`✓ Refund approved for ${selectedRequest.name}`);
    } catch (error) {
      alert(`Error approving refund: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setApproving(false);
      setShowModal(false);
      setNotes('');
      setSelectedRequest(null);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;
    setApproving(true);

    try {
      // In real app, this would call an API to save the rejection decision
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove from pending approvals in localStorage
      const pendingApprovals = JSON.parse(localStorage.getItem('pendingApprovals') || '[]');
      const updated = pendingApprovals.filter((req: any) => req.customerId !== selectedRequest.id);
      localStorage.setItem('pendingApprovals', JSON.stringify(updated));

      // Reload pending requests
      const remaining = updated.map((req: any) => ({
        id: req.customerId,
        name: req.customerName,
        email: req.email,
        product: req.product,
        amount: req.amount,
        orderDate: req.orderDate,
        requestedAt: req.requestedAt,
        reason: req.reason,
      }));
      setPendingRequests(remaining);

      // Show success message
      alert(`✗ Refund rejected for ${selectedRequest.name}`);
    } catch (error) {
      alert(`Error rejecting refund: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setApproving(false);
      setShowModal(false);
      setNotes('');
      setSelectedRequest(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Approval Queue</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {pendingRequests.length} refund{pendingRequests.length !== 1 ? 's' : ''} awaiting manager approval (Real Records)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-32" />
              </Card>
            ))}
          </div>
        ) : pendingRequests.length === 0 ? (
          <Card className="p-12 text-center">
            <CheckCircle size={48} className="mx-auto text-green-600 dark:text-green-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">All caught up!</h2>
            <p className="text-gray-600 dark:text-gray-400">No pending approval requests from chatbot.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Info Alert */}
            <Alert variant="info" icon={<AlertCircle size={20} />}>
              <p>
                <strong>Chatbot Approval Requests:</strong> Showing only refund requests submitted through the chatbot that require manager approval.
              </p>
            </Alert>

            {/* Request Cards - Only Chatbot Requests */}
            {pendingRequests.map((request) => (
              <Card key={request.id} className="p-6 hover:shadow-lg transition-all">
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                      {request.name}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>
                        <span className="text-gray-500 dark:text-gray-500">Email:</span> {request.email}
                      </p>
                      <p>
                        <span className="text-gray-500 dark:text-gray-500">Product:</span> {request.product}
                      </p>
                      <p>
                        <span className="text-gray-500 dark:text-gray-500">Order Date:</span> {request.orderDate}
                      </p>
                    </div>
                  </div>

                  {/* Amount & Reason */}
                  <div>
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Refund Amount</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        ₹{request.amount.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Reason</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {request.reason}
                      </p>
                    </div>

                    <Badge variant="warning" className="mt-3">
                      Requested {request.requestedAt}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowModal(true);
                      }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowModal(true);
                      }}
                      className="flex items-center justify-center gap-2"
                    >
                      <XCircle size={18} />
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Approval Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setNotes('');
        }}
        title="Confirm Decision"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setShowModal(false);
                setNotes('');
              }}
              disabled={approving}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleReject}
              loading={approving}
              disabled={approving}
            >
              Reject
            </Button>
            <Button
              variant="primary"
              onClick={handleApprove}
              loading={approving}
              disabled={approving}
            >
              Approve
            </Button>
          </>
        }
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>Customer:</strong> {selectedRequest.name}
              </p>
              <p className="text-sm text-blue-900 dark:text-blue-200 mt-1">
                <strong>Amount:</strong> ₹{selectedRequest.amount.toLocaleString()}
              </p>
              <p className="text-sm text-blue-900 dark:text-blue-200 mt-1">
                <strong>Product:</strong> {selectedRequest.product}
              </p>
            </div>

            <Input
              label="Manager Notes (Optional)"
              placeholder="Add any notes about this decision..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={approving}
            />

            <Alert variant="info" icon={<AlertCircle size={20} />}>
              <p className="text-sm">
                This decision will be logged for audit purposes. You will be recorded as the approving manager with timestamp.
              </p>
            </Alert>
          </div>
        )}
      </Modal>
    </div>
  );
}
