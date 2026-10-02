'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Profile,
  Product,
  Order,
  CampusRequest,
  Proposal,
  Review,
  Message,
  UserRole,
  AISearchIntent,
  OrderStatus,
} from '../types';
import {
  initStorage,
  getCurrentUser,
  setCurrentUser,
  getProfiles,
  getProducts,
  addProduct,
  getOrders,
  createOrder,
  updateOrderStatus,
  getRequests,
  createRequest,
  getProposals,
  createProposal,
  acceptProposal,
  getMessages,
  sendMessage,
  getReviews,
  addReview,
} from '../lib/storage';
import { filterAndRankProducts } from '../lib/aiSearch';

import { Header } from '../components/Header';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { RolePreviewCapsule } from '../components/RolePreviewCapsule';
import { AISearchBar } from '../components/AISearchBar';
import { CategoryChips } from '../components/CategoryChips';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { OrderModal } from '../components/OrderModal';
import { MakerProfileModal } from '../components/MakerProfileModal';
import { MakerDashboard } from '../components/MakerDashboard';
import { AddProductModal } from '../components/AddProductModal';
import { RequestSomethingCard } from '../components/RequestSomethingCard';
import { PostRequestModal } from '../components/PostRequestModal';
import { RequestsView } from '../components/RequestsView';
import { SendProposalModal } from '../components/SendProposalModal';
import { MessagingModal } from '../components/MessagingModal';
import { OrdersView } from '../components/OrdersView';
import { ReviewModal } from '../components/ReviewModal';
import { AuthModal } from '../components/AuthModal';
import { BottomNavBar, NavTab } from '../components/BottomNavBar';

export default function CampusCraftApp() {
  // App state
  const [currentUser, setCurrentUserState] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<CampusRequest[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Navigation & View state
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Search & AI Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIntent, setActiveIntent] = useState<AISearchIntent | null>(null);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderingProduct, setOrderingProduct] = useState<Product | null>(null);
  const [viewingMakerId, setViewingMakerId] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showPostRequest, setShowPostRequest] = useState(false);
  const [proposalRequest, setProposalRequest] = useState<CampusRequest | null>(null);
  const [reviewingOrder, setReviewingOrder] = useState<Order | null>(null);
  const [chatTarget, setChatTarget] = useState<{ id: string; name: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize data
  useEffect(() => {
    initStorage();
    const user = getCurrentUser();
    setCurrentUserState(user);
    setCurrentRole(user.role);

    async function loadData() {
      const [pfs, prds, ords, reqs, props, revs] = await Promise.all([
        getProfiles(),
        getProducts(),
        getOrders(),
        getRequests(),
        getProposals(),
        getReviews(),
      ]);
      setProfiles(pfs);
      setProducts(prds);
      setOrders(ords);
      setRequests(reqs);
      setProposals(props);
      setReviews(revs);
    }
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (currentUser) {
      const updatedUser = { ...currentUser, role };
      setCurrentUserState(updatedUser);
      setCurrentUser(updatedUser);
    }
  };

  const handleSwitchUser = (user: Profile) => {
    setCurrentUserState(user);
    setCurrentRole(user.role);
    setCurrentUser(user);
    showToast(`Switched persona to ${user.name} (${user.role.toUpperCase()})`);
  };

  const handleCreateAccount = (name: string, email: string, role: UserRole, college: string) => {
    const newProfile: Profile = {
      id: 'user_' + Date.now(),
      name,
      email,
      role,
      college,
      verified: true,
      bio: `Student at ${college}`,
      profile_image: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80`,
      skills: role === 'maker' ? ['Campus Crafting'] : [],
      created_at: new Date().toISOString(),
    };
    const updated = [newProfile, ...profiles];
    setProfiles(updated);
    handleSwitchUser(newProfile);
    showToast(`Welcome to CampusCraft, ${name}!`);
  };

  const handleLogout = () => {
    if (profiles.length > 0) {
      handleSwitchUser(profiles[0]);
    }
  };

  // Search logic
  const handleAISearch = (query: string, intent: AISearchIntent | null) => {
    setSearchQuery(query);
    setActiveIntent(intent);
  };

  // Filtered products calculation
  let displayedProducts = products;
  if (selectedCategory !== 'All') {
    displayedProducts = displayedProducts.filter((p) => p.category === selectedCategory);
  }

  let aiMatchedTags: string[] = [];
  if (activeIntent && activeIntent.rawQuery) {
    const { ranked, matchedTags } = filterAndRankProducts(displayedProducts, activeIntent);
    displayedProducts = ranked;
    aiMatchedTags = matchedTags;
  }

  // Segmenting products for Stitch layout
  const trendingProducts = displayedProducts.slice(0, 2);
  const pickedProducts = displayedProducts.slice(2, 4);
  const remainingProducts = displayedProducts.slice(4);

  // Maker Specific Data
  const currentMakerProducts = products.filter((p) => p.maker_id === currentUser?.id);
  const currentMakerOrders = orders.filter((o) => o.maker_id === currentUser?.id);

  // Order Handlers
  const handlePlaceOrder = async (orderData: {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
    makerId: string;
    makerName: string;
    quantity: number;
    message: string;
  }) => {
    if (!currentUser) return;
    const newOrder = await createOrder({
      customer_id: currentUser.id,
      customer_name: currentUser.name,
      maker_id: orderData.makerId,
      maker_name: orderData.makerName,
      product_id: orderData.productId,
      product_name: orderData.productName,
      product_price: orderData.productPrice,
      product_image: orderData.productImage,
      quantity: orderData.quantity,
      message: orderData.message,
    });
    setOrders([newOrder, ...orders]);
    setOrderingProduct(null);
    setSelectedProduct(null);
    showToast(`Order request submitted for "${orderData.productName}"! Maker notified.`);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const updated = await updateOrderStatus(orderId, status);
    if (updated) {
      setOrders(orders.map((o) => (o.id === orderId ? updated : o)));
      showToast(`Order #${orderId.slice(-4)} marked as ${status}`);
    }
  };

  // Add Product Handler
  const handleAddProduct = async (productData: Omit<Product, 'id' | 'created_at'>) => {
    const newProd = await addProduct(productData);
    setProducts([newProd, ...products]);
    setShowAddProduct(false);
    showToast(`"${newProd.name}" published to campus marketplace!`);
  };

  // Request Something Handlers
  const handlePostRequest = async (
    reqData: Omit<CampusRequest, 'id' | 'status' | 'created_at' | 'proposals_count'>
  ) => {
    const newReq = await createRequest(reqData);
    setRequests([newReq, ...requests]);
    setShowPostRequest(false);
    showToast('Your custom commission request is now live for campus makers!');
    setActiveTab('requests');
  };

  const handleSendProposal = async (propData: Omit<Proposal, 'id' | 'status' | 'created_at'>) => {
    const newProp = await createProposal(propData);
    setProposals([newProp, ...proposals]);
    // update request proposal count in state
    setRequests(
      requests.map((r) =>
        r.id === propData.request_id ? { ...r, proposals_count: (r.proposals_count || 0) + 1 } : r
      )
    );
    setProposalRequest(null);
    showToast(`Proposal sent for ₹${propData.price}!`);
  };

  const handleAcceptProposal = async (proposalId: string) => {
    if (!currentUser) return;
    const newOrder = await acceptProposal(proposalId, currentUser);
    if (newOrder) {
      setOrders([newOrder, ...orders]);
      // update proposals state
      setProposals(proposals.map((p) => (p.id === proposalId ? { ...p, status: 'ACCEPTED' } : p)));
      showToast('Proposal accepted! Order created in your Orders tab.');
    }
  };

  // Message Handlers
  const handleOpenMessage = async (targetId: string, targetName: string) => {
    if (!currentUser) return;
    const msgs = await getMessages(currentUser.id, targetId);
    setMessages(msgs);
    setChatTarget({ id: targetId, name: targetName });
  };

  const handleSendMessage = async (text: string) => {
    if (!currentUser || !chatTarget) return;
    const newMsg = await sendMessage({
      sender_id: currentUser.id,
      sender_name: currentUser.name,
      receiver_id: chatTarget.id,
      receiver_name: chatTarget.name,
      message: text,
    });
    setMessages([...messages, newMsg]);
  };

  // Review Handlers
  const handleSubmitReview = async (revData: Omit<Review, 'id' | 'created_at'>) => {
    const newRev = await addReview(revData);
    setReviews([newRev, ...reviews]);
    setOrders(orders.map((o) => (o.id === revData.order_id ? { ...o, reviewed: true } : o)));
    setReviewingOrder(null);
    showToast('Thank you! Your verified review has been published.');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-body-sm text-outline">Loading CampusCraft Atelier...</p>
        </div>
      </div>
    );
  }

  // Active maker profile for modal
  const viewingMaker = profiles.find((p) => p.id === viewingMakerId) || null;
  const viewingMakerProducts = products.filter((p) => p.maker_id === viewingMakerId);

  // Active orders badge for customer
  const pendingCustomerOrdersCount = orders.filter(
    (o) => o.customer_id === currentUser.id && o.status === 'PENDING'
  ).length;

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased font-body-md text-body-md selection:bg-secondary-container selection:text-on-secondary-container pb-28">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <span>✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TopAppBar */}
      <Header
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onFocusSearch={() => {
          setActiveTab('home');
          setTimeout(() => searchInputRef.current?.focus(), 100);
        }}
        notificationCount={pendingCustomerOrdersCount > 0 ? pendingCustomerOrdersCount : 2}
      />

      {/* Role Switcher Toggle Bar */}
      <RoleSwitcher currentRole={currentRole} onRoleChange={handleRoleChange} />

      <main className="max-w-screen-md mx-auto px-gutter-mobile space-y-space-xl pt-space-md">
        {/* Render Tab Views */}
        {activeTab === 'orders' ? (
          <OrdersView
            currentUser={currentUser}
            orders={orders}
            onOpenReview={(order) => setReviewingOrder(order)}
            onOpenMessage={(uid, uname) => handleOpenMessage(uid, uname)}
            onBrowseExplore={() => {
              setActiveTab('home');
              setSelectedCategory('All');
            }}
          />
        ) : activeTab === 'requests' ? (
          <RequestsView
            currentUser={currentUser}
            requests={requests}
            proposals={proposals}
            onOpenPostRequest={() => setShowPostRequest(true)}
            onOpenSendProposal={(req) => setProposalRequest(req)}
            onAcceptProposal={handleAcceptProposal}
            onOpenMessage={(uid, uname) => handleOpenMessage(uid, uname)}
            onViewMaker={(mid) => setViewingMakerId(mid)}
          />
        ) : activeTab === 'explore' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-headline-md font-headline-md text-on-surface">Explore Campus Crafts</h2>
                <p className="text-body-sm text-outline">{displayedProducts.length} items from student artisans</p>
              </div>
            </div>

            <AISearchBar onSearch={handleAISearch} searchRef={searchInputRef} />
            <CategoryChips selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

            <div className="grid grid-cols-2 gap-space-sm">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                  onOrder={(p) => setOrderingProduct(p)}
                  onViewMaker={(mid) => setViewingMakerId(mid)}
                />
              ))}
            </div>
          </div>
        ) : activeTab === 'profile' ? (
          <div className="space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 shadow-sm text-center space-y-4">
              <div className="relative inline-block">
                <img
                  src={
                    currentUser.profile_image ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                  }
                  alt={currentUser.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary/20 shadow-xs mx-auto"
                />
                {currentUser.verified && (
                  <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center border-2 border-surface">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">{currentUser.name}</h2>
                <p className="text-body-sm text-outline">{currentUser.email}</p>
                <p className="text-xs text-primary font-semibold mt-1 uppercase tracking-wider">
                  {currentUser.college || 'Adi Shankara Institute of Engineering and Technology (ASIET)'}
                </p>
                <p className="text-body-sm text-on-surface-variant italic mt-2 max-w-sm mx-auto">
                  "{currentUser.bio || 'Active collegiate creator on CampusCraft'}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 max-w-xs mx-auto text-left">
                <div className="p-3 rounded-lg bg-surface border border-outline-variant/40">
                  <span className="text-[11px] text-outline block">Role</span>
                  <span className="font-semibold text-on-surface capitalize">{currentUser.role}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface border border-outline-variant/40">
                  <span className="text-[11px] text-outline block">Affiliation</span>
                  <span className="font-semibold text-primary">✓ Verified .edu</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 rounded-lg border border-primary text-primary text-xs font-semibold hover:bg-surface-container"
                >
                  Switch Demo Account
                </button>
                <button
                  onClick={() => handleRoleChange(currentRole === 'maker' ? 'customer' : 'maker')}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container"
                >
                  Switch to {currentRole === 'maker' ? 'Customer' : 'Maker'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* HOME TAB */
          <>
            {currentRole === 'maker' ? (
              <MakerDashboard
                currentMaker={currentUser}
                makerProducts={currentMakerProducts}
                makerOrders={currentMakerOrders}
                campusRequests={requests.filter((r) => r.status === 'OPEN')}
                onOpenAddProduct={() => setShowAddProduct(true)}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onOpenProposalModal={(req) => setProposalRequest(req)}
                onOpenMessage={(uid, uname) => handleOpenMessage(uid, uname)}
                onViewProduct={(p) => setSelectedProduct(p)}
              />
            ) : (
              /* CUSTOMER HOME VIEW (MATCHING STITCH DESIGN EXACTLY) */
              <>
                {/* Role Selection Quick-Preview Capsule */}
                <RolePreviewCapsule currentRole={currentRole} onRoleChange={handleRoleChange} />

                {/* Hero Section & AI Search Bar */}
                <AISearchBar onSearch={handleAISearch} searchRef={searchInputRef} />

                {/* Category Chips */}
                <CategoryChips selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

                {/* AI Search Matches Indicator if active */}
                {searchQuery && (
                  <div className="p-3 rounded-xl bg-secondary-container/60 border border-secondary-container flex items-center justify-between text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">✦ AI Match Active:</span>
                      <span className="text-on-secondary-container">
                        Found <strong>{displayedProducts.length}</strong> creations matching "{searchQuery}"
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveIntent(null);
                      }}
                      className="text-primary font-semibold text-xs hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                )}

                {/* Trending on Campus Section */}
                <section className="space-y-space-md">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="text-headline-md font-headline-md text-on-surface">Trending on Campus</h3>
                      <p className="text-body-sm font-body-sm text-outline">Most requested crafts this semester</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('explore')}
                      className="text-label-md font-label-md text-primary font-semibold flex items-center hover:underline"
                    >
                      View all
                      <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">
                        arrow_forward
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-space-sm">
                    {trendingProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onOpenDetails={(p) => setSelectedProduct(p)}
                        onOrder={(p) => setOrderingProduct(p)}
                        onViewMaker={(mid) => setViewingMakerId(mid)}
                      />
                    ))}
                  </div>
                </section>

                {/* 'Picked for You' Section */}
                <section className="space-y-space-md">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="text-headline-md font-headline-md text-on-surface">Picked for You</h3>
                      <p className="text-body-sm font-body-sm text-outline">Artisanal selections tailored to your taste</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('explore')}
                      className="text-label-md font-label-md text-primary font-semibold flex items-center hover:underline"
                    >
                      See more
                      <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">
                        arrow_forward
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-space-sm">
                    {pickedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onOpenDetails={(p) => setSelectedProduct(p)}
                        onOrder={(p) => setOrderingProduct(p)}
                        onViewMaker={(mid) => setViewingMakerId(mid)}
                      />
                    ))}
                  </div>
                </section>

                {/* Additional campus creations if available */}
                {remainingProducts.length > 0 && (
                  <section className="space-y-space-md">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <h3 className="text-headline-md font-headline-md text-on-surface">More From Campus Studios</h3>
                        <p className="text-body-sm font-body-sm text-outline">Explore verified dorm artisans</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-space-sm">
                      {remainingProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenDetails={(p) => setSelectedProduct(p)}
                          onOrder={(p) => setOrderingProduct(p)}
                          onViewMaker={(mid) => setViewingMakerId(mid)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* 'Request Something' Feature Showcase Card */}
                <RequestSomethingCard onOpenPostRequest={() => setShowPostRequest(true)} />
              </>
            )}
          </>
        )}
      </main>

      {/* Interactive Overlays / Modals */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrder={(p) => {
            setSelectedProduct(null);
            setOrderingProduct(p);
          }}
          onMessageMaker={(mid, mname) => handleOpenMessage(mid, mname)}
          onViewMaker={(mid) => setViewingMakerId(mid)}
        />
      )}

      {orderingProduct && (
        <OrderModal
          product={orderingProduct}
          currentUser={currentUser}
          onClose={() => setOrderingProduct(null)}
          onSubmitOrder={handlePlaceOrder}
        />
      )}

      {viewingMaker && (
        <MakerProfileModal
          maker={viewingMaker}
          makerProducts={viewingMakerProducts}
          onClose={() => setViewingMakerId(null)}
          onOpenProduct={(p) => setSelectedProduct(p)}
          onMessageMaker={(mid, mname) => {
            setViewingMakerId(null);
            handleOpenMessage(mid, mname);
          }}
        />
      )}

      {showAddProduct && (
        <AddProductModal
          currentUser={currentUser}
          onClose={() => setShowAddProduct(false)}
          onProductAdded={handleAddProduct}
        />
      )}

      {showPostRequest && (
        <PostRequestModal
          currentUser={currentUser}
          onClose={() => setShowPostRequest(false)}
          onSubmitRequest={handlePostRequest}
        />
      )}

      {proposalRequest && (
        <SendProposalModal
          request={proposalRequest}
          currentMaker={currentUser}
          onClose={() => setProposalRequest(null)}
          onSubmitProposal={handleSendProposal}
        />
      )}

      {chatTarget && (
        <MessagingModal
          currentUser={currentUser}
          targetUserId={chatTarget.id}
          targetUserName={chatTarget.name}
          messages={messages}
          onClose={() => setChatTarget(null)}
          onSendMessage={handleSendMessage}
        />
      )}

      {reviewingOrder && (
        <ReviewModal
          order={reviewingOrder}
          currentUser={currentUser}
          onClose={() => setReviewingOrder(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {showAuthModal && (
        <AuthModal
          currentUser={currentUser}
          profiles={profiles}
          onClose={() => setShowAuthModal(false)}
          onSwitchUser={handleSwitchUser}
          onCreateAccount={handleCreateAccount}
          onLogout={handleLogout}
        />
      )}

      {/* BottomNavBar */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        requestsBadge={requests.filter((r) => r.status === 'OPEN').length}
        ordersBadge={orders.filter((o) => o.customer_id === currentUser.id && o.status === 'PENDING').length}
      />
    </div>
  );
}
