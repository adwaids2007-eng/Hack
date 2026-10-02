'use client';

import React, { useState } from 'react';
import { Profile, Product, Order, CampusRequest, OrderStatus } from '../types';

interface MakerDashboardProps {
  currentMaker: Profile;
  makerProducts: Product[];
  makerOrders: Order[];
  campusRequests: CampusRequest[];
  onOpenAddProduct: () => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onOpenProposalModal: (request: CampusRequest) => void;
  onOpenMessage: (userId: string, userName: string) => void;
  onViewProduct: (product: Product) => void;
}

export const MakerDashboard: React.FC<MakerDashboardProps> = ({
  currentMaker,
  makerProducts,
  makerOrders,
  campusRequests,
  onOpenAddProduct,
  onUpdateOrderStatus,
  onOpenProposalModal,
  onOpenMessage,
  onViewProduct,
}) => {
  const [orderFilter, setOrderFilter] = useState<'ALL' | 'PENDING' | 'ACCEPTED' | 'COMPLETED'>('ALL');

  // Stats calculation
  const totalOrdersCount = makerOrders.length;
  const pendingOrders = makerOrders.filter((o) => o.status === 'PENDING');
  const acceptedOrders = makerOrders.filter((o) => o.status === 'ACCEPTED');
  const completedOrders = makerOrders.filter((o) => o.status === 'COMPLETED');

  const totalSales = makerOrders
    .filter((o) => o.status === 'ACCEPTED' || o.status === 'COMPLETED')
    .reduce((sum, o) => sum + (o.product_price || 0) * (o.quantity || 1), 0);

  const filteredOrders = makerOrders.filter((o) => {
    if (orderFilter === 'ALL') return true;
    return o.status === orderFilter;
  });

  return (
    <div className="space-y-6">
      {/* Studio Banner */}
      <section className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/60 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={
                currentMaker.profile_image ||
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
              }
              alt={currentMaker.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-headline-sm font-headline-sm text-primary font-bold">{currentMaker.name}</h2>
                {currentMaker.verified && (
                  <span className="material-symbols-outlined text-[16px] text-primary" title="Campus Verified">
                    verified
                  </span>
                )}
              </div>
              <p className="text-body-sm text-outline">Creator Studio Dashboard • {currentMaker.college || 'ASIET'}</p>
            </div>
          </div>

          <button
            onClick={onOpenAddProduct}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Add Product
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-outline-variant/30">
          <div className="p-3 rounded-lg bg-surface border border-outline-variant/40">
            <span className="text-[11px] text-outline font-semibold uppercase tracking-wider block">Total Earnings</span>
            <span className="text-title-lg font-bold text-primary">₹{totalSales}</span>
          </div>
          <div className="p-3 rounded-lg bg-surface border border-outline-variant/40">
            <span className="text-[11px] text-outline font-semibold uppercase tracking-wider block">All Orders</span>
            <span className="text-title-lg font-bold text-on-surface">{totalOrdersCount}</span>
          </div>
          <div className="p-3 rounded-lg bg-surface border border-outline-variant/40">
            <span className="text-[11px] text-outline font-semibold uppercase tracking-wider block">Pending Requests</span>
            <span className="text-title-lg font-bold text-amber-700">{pendingOrders.length}</span>
          </div>
          <div className="p-3 rounded-lg bg-surface border border-outline-variant/40">
            <span className="text-[11px] text-outline font-semibold uppercase tracking-wider block">Campus Rating</span>
            <span className="text-title-lg font-bold text-on-surface">⭐ 4.9</span>
          </div>
        </div>
      </section>

      {/* Orders Inbox */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-headline-md font-headline-md text-on-surface">Order Requests Inbox</h3>
            <p className="text-body-sm text-outline">Manage student commissions and dorm handoffs</p>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {(['ALL', 'PENDING', 'ACCEPTED', 'COMPLETED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setOrderFilter(tab)}
                className={`px-3 py-1 rounded-full text-xs font-label-md transition-colors ${
                  orderFilter === tab
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                }`}
              >
                {tab} {tab === 'PENDING' && pendingOrders.length > 0 && `(${pendingOrders.length})`}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/60">
            <span className="material-symbols-outlined text-[36px] text-outline">inbox</span>
            <p className="text-body-md text-on-surface-variant mt-2 font-medium">No {orderFilter.toLowerCase()} orders right now.</p>
            <p className="text-body-sm text-outline">New orders from campus customers will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const isPending = order.status === 'PENDING';
              const isAccepted = order.status === 'ACCEPTED';
              const isCompleted = order.status === 'COMPLETED';

              return (
                <article
                  key={order.id}
                  className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/70 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {order.product_image && (
                        <img
                          src={order.product_image}
                          alt={order.product_name || 'Product'}
                          className="w-14 h-14 rounded-lg object-cover border border-outline-variant shrink-0"
                        />
                      )}
                      <div>
                        <h4 className="text-title-md font-semibold text-on-surface">{order.product_name}</h4>
                        <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                          <span>From: <strong>{order.customer_name || 'Campus Student'}</strong></span>
                          <span>•</span>
                          <span>Qty: {order.quantity}</span>
                          <span>•</span>
                          <span className="text-primary font-bold">₹{(order.product_price || 0) * (order.quantity || 1)}</span>
                        </div>
                        <span className="text-[11px] text-outline">
                          {new Date(order.created_at).toLocaleDateString()} at{' '}
                          {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isPending
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : isAccepted
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-stone-100 text-stone-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Customer Custom Note */}
                  {order.message && (
                    <div className="p-2.5 rounded-lg bg-surface border border-outline-variant/40 text-body-sm">
                      <span className="text-outline text-[11px] block font-medium">Customer Customization Note:</span>
                      <p className="text-on-surface italic">"{order.message}"</p>
                    </div>
                  )}

                  {/* Maker Action Controls */}
                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/30 text-body-sm">
                    <button
                      onClick={() => onOpenMessage(order.customer_id, order.customer_name || 'Customer')}
                      className="text-primary hover:underline flex items-center gap-1 text-xs font-medium"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      Message Customer
                    </button>

                    <div className="flex items-center gap-2">
                      {isPending && (
                        <>
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'DECLINED')}
                            className="px-3 py-1 rounded-lg border border-outline text-on-surface-variant hover:bg-surface text-xs font-medium"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, 'ACCEPTED')}
                            className="px-3.5 py-1 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold shadow-xs"
                          >
                            Accept Order
                          </button>
                        </>
                      )}

                      {isAccepted && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'COMPLETED')}
                          className="px-3.5 py-1 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-semibold shadow-xs"
                        >
                          Mark Completed / Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Campus Custom Requests / Opportunities */}
      <section className="space-y-3 pt-2">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-headline-md font-headline-md text-on-surface">Campus Custom Requests</h3>
            <p className="text-body-sm text-outline">Open student commissions looking for campus creators</p>
          </div>
        </div>

        {campusRequests.length === 0 ? (
          <p className="text-body-sm text-outline italic">No open requests right now.</p>
        ) : (
          <div className="space-y-3">
            {campusRequests.map((req) => (
              <div
                key={req.id}
                className="bg-surface-container p-4 rounded-xl border border-outline-variant space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-label-sm uppercase px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                      {req.category}
                    </span>
                    <h4 className="text-title-md font-semibold text-on-surface mt-1">"{req.description}"</h4>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      Posted by <strong>{req.customer_name || 'Student'}</strong> • Needed in{' '}
                      <span className="text-primary font-medium">{req.deadline}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-outline block">Budget</span>
                    <span className="text-headline-sm font-bold text-primary">₹{req.budget}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40">
                  <span className="text-xs text-outline">
                    {req.proposals_count || 0} creator proposal{(req.proposals_count || 0) === 1 ? '' : 's'} submitted
                  </span>
                  <button
                    onClick={() => onOpenProposalModal(req)}
                    className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs"
                  >
                    Send Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Maker's Active Product Listings */}
      <section className="space-y-3 pt-2">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-headline-md font-headline-md text-on-surface">Your Published Products</h3>
            <p className="text-body-sm text-outline">{makerProducts.length} items currently visible on campus</p>
          </div>
          <button
            onClick={onOpenAddProduct}
            className="text-label-md font-label-md text-primary font-semibold hover:underline"
          >
            + Add Another
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {makerProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => onViewProduct(p)}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 overflow-hidden cursor-pointer hover:border-primary transition-all group"
            >
              <div className="aspect-square relative overflow-hidden bg-surface-container">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-label-sm bg-surface-container-lowest/90 text-on-surface backdrop-blur">
                  ₹{p.price}
                </span>
              </div>
              <div className="p-2.5">
                <h5 className="text-title-md font-semibold text-on-surface truncate">{p.name}</h5>
                <div className="flex items-center justify-between text-body-sm text-outline mt-1">
                  <span>{p.category}</span>
                  <span className="text-primary font-medium text-xs">Stock: {p.available_quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
