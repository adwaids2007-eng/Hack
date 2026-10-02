'use client';

import React from 'react';
import { Order, Profile } from '../types';

interface OrdersViewProps {
  currentUser: Profile;
  orders: Order[];
  onOpenReview: (order: Order) => void;
  onOpenMessage: (userId: string, userName: string) => void;
  onBrowseExplore: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  currentUser,
  orders,
  onOpenReview,
  onOpenMessage,
  onBrowseExplore,
}) => {
  const customerOrders = orders.filter((o) => o.customer_id === currentUser.id);

  return (
    <div className="space-y-6">
      <section className="bg-surface-container p-space-md rounded-xl border border-outline-variant space-y-1 shadow-xs">
        <h2 className="text-headline-md font-headline-md text-on-surface">Your Campus Orders</h2>
        <p className="text-body-sm text-on-surface-variant">
          Track handcrafted requests, approvals, and dorm handoffs
        </p>
      </section>

      {customerOrders.length === 0 ? (
        <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-outline-variant/60 space-y-3">
          <span className="material-symbols-outlined text-[42px] text-outline">shopping_bag</span>
          <h3 className="text-title-lg font-title-lg text-on-surface font-semibold">No Orders Yet</h3>
          <p className="text-body-sm text-outline max-w-sm mx-auto">
            Discover student artisans on campus or request a custom commission piece.
          </p>
          <button
            onClick={onBrowseExplore}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary-container transition-colors shadow-xs"
          >
            Explore Campus Creations
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {customerOrders.map((order) => {
            const isPending = order.status === 'PENDING';
            const isAccepted = order.status === 'ACCEPTED';
            const isCompleted = order.status === 'COMPLETED';
            const isDeclined = order.status === 'DECLINED';

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
                        className="w-16 h-16 rounded-xl object-cover border border-outline-variant shrink-0"
                      />
                    )}
                    <div>
                      <h4 className="text-title-md font-semibold text-on-surface">{order.product_name}</h4>
                      <p className="text-body-sm text-on-surface-variant">
                        Maker: <strong>{order.maker_name || 'Campus Creator'}</strong>
                      </p>
                      <div className="flex items-center gap-2 text-body-sm text-outline mt-0.5">
                        <span>Qty: {order.quantity}</span>
                        <span>•</span>
                        <span className="text-primary font-bold">
                          ₹{(order.product_price || 0) * (order.quantity || 1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isPending
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : isAccepted
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isDeclined
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-stone-100 text-stone-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {order.message && (
                  <div className="p-2.5 rounded-lg bg-surface border border-outline-variant/40 text-body-sm">
                    <span className="text-[11px] text-outline block font-medium">Your Note to Maker:</span>
                    <p className="text-on-surface italic">"{order.message}"</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30 text-body-sm">
                  <button
                    onClick={() => onOpenMessage(order.maker_id, order.maker_name || 'Maker')}
                    className="text-primary hover:underline flex items-center gap-1 text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Message Maker
                  </button>

                  {isCompleted && !order.reviewed && (
                    <button
                      onClick={() => onOpenReview(order)}
                      className="px-3.5 py-1 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors shadow-xs"
                    >
                      ★ Rate & Review
                    </button>
                  )}

                  {isCompleted && order.reviewed && (
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">check</span>
                      Review Submitted
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
