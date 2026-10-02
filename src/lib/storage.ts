import { Profile, Product, Order, CampusRequest, Proposal, Review, Message, OrderStatus } from '../types';
import { INITIAL_PROFILES, INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REQUESTS, INITIAL_PROPOSALS, INITIAL_REVIEWS, INITIAL_MESSAGES } from './mockData';
import { supabase, isSupabaseConfigured } from './supabase';

const KEYS = {
  PROFILES: 'campuscraft_profiles',
  PRODUCTS: 'campuscraft_products',
  ORDERS: 'campuscraft_orders',
  REQUESTS: 'campuscraft_requests',
  PROPOSALS: 'campuscraft_proposals',
  REVIEWS: 'campuscraft_reviews',
  MESSAGES: 'campuscraft_messages',
  CURRENT_USER: 'campuscraft_current_user',
};

function getLocal<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.error('Error reading localStorage', e);
    return defaultVal;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to localStorage', e);
  }
}

function scrubLegacyBranding<T extends { email?: string; college?: string; bio?: string; id?: string }>(item: T): T {
  const seed = INITIAL_PROFILES.find((p) => p.id === item.id);
  const blob = `${item.email || ''} ${item.college || ''} ${item.bio || ''}`;
  if (!/stanford|wilbur/i.test(blob)) return item;
  if (seed) {
    return { ...item, email: seed.email, college: seed.college, bio: seed.bio };
  }
  return {
    ...item,
    email: (item.email || '').replace(/@stanford\.edu/gi, '@adishankara.ac.in'),
    college: /stanford/i.test(item.college || '')
      ? 'Adi Shankara Institute of Engineering and Technology (ASIET)'
      : item.college,
    bio: (item.bio || '').replace(/Wilbur Hall/gi, 'the ASIET campus'),
  };
}

export function initStorage() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(KEYS.PROFILES)) setLocal(KEYS.PROFILES, INITIAL_PROFILES);
  if (!localStorage.getItem(KEYS.PRODUCTS)) setLocal(KEYS.PRODUCTS, INITIAL_PRODUCTS);
  if (!localStorage.getItem(KEYS.ORDERS)) setLocal(KEYS.ORDERS, INITIAL_ORDERS);
  if (!localStorage.getItem(KEYS.REQUESTS)) setLocal(KEYS.REQUESTS, INITIAL_REQUESTS);
  if (!localStorage.getItem(KEYS.PROPOSALS)) setLocal(KEYS.PROPOSALS, INITIAL_PROPOSALS);
  if (!localStorage.getItem(KEYS.REVIEWS)) setLocal(KEYS.REVIEWS, INITIAL_REVIEWS);
  if (!localStorage.getItem(KEYS.MESSAGES)) setLocal(KEYS.MESSAGES, INITIAL_MESSAGES);
  if (!localStorage.getItem(KEYS.CURRENT_USER)) setLocal(KEYS.CURRENT_USER, INITIAL_PROFILES[0]);

  const profiles = getLocal<Profile[]>(KEYS.PROFILES, INITIAL_PROFILES).map(scrubLegacyBranding);
  setLocal(KEYS.PROFILES, profiles);
  setLocal(KEYS.CURRENT_USER, scrubLegacyBranding(getLocal<Profile>(KEYS.CURRENT_USER, INITIAL_PROFILES[0])));
}

// Current User Session
export function getCurrentUser(): Profile {
  return getLocal<Profile>(KEYS.CURRENT_USER, INITIAL_PROFILES[0]);
}

export function setCurrentUser(user: Profile): void {
  setLocal(KEYS.CURRENT_USER, user);
}

// Profiles
export async function getProfiles(): Promise<Profile[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('profiles').select('*');
      if (!error && data && data.length > 0) return data as Profile[];
    } catch (e) {
      console.warn('Supabase query error, fallback to local', e);
    }
  }
  return getLocal<Profile[]>(KEYS.PROFILES, INITIAL_PROFILES);
}

export async function getProfile(id: string): Promise<Profile | undefined> {
  const profiles = await getProfiles();
  return profiles.find((p) => p.id === id);
}

// Products
export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data && data.length > 0) return data as Product[];
    } catch (e) {
      console.warn('Supabase query error, fallback to local', e);
    }
  }
  return getLocal<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
}

export async function addProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
  const newProduct: Product = {
    ...product,
    id: 'prod_' + Date.now(),
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('products').insert([newProduct]).select().single();
      if (!error && data) return data as Product;
    } catch (e) {
      console.warn('Supabase insert error, fallback to local', e);
    }
  }

  const products = getLocal<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const updated = [newProduct, ...products];
  setLocal(KEYS.PRODUCTS, updated);
  return newProduct;
}

// Orders
export async function getOrders(): Promise<Order[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Order[];
    } catch (e) {
      console.warn('Supabase query error, fallback to local', e);
    }
  }
  return getLocal<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
}

export async function createOrder(orderData: Omit<Order, 'id' | 'status' | 'created_at'>): Promise<Order> {
  const newOrder: Order = {
    ...orderData,
    id: 'order_' + Date.now(),
    status: 'PENDING',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('orders').insert([newOrder]).select().single();
      if (!error && data) return data as Order;
    } catch (e) {
      console.warn('Supabase insert error, fallback to local', e);
    }
  }

  const orders = getLocal<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
  const updated = [newOrder, ...orders];
  setLocal(KEYS.ORDERS, updated);
  return newOrder;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('orders').update({ status }).eq('id', orderId).select().single();
      if (!error && data) return data as Order;
    } catch (e) {
      console.warn('Supabase update error, fallback to local', e);
    }
  }

  const orders = getLocal<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
  let updatedOrder: Order | null = null;
  const updated = orders.map((o) => {
    if (o.id === orderId) {
      updatedOrder = { ...o, status };
      return updatedOrder;
    }
    return o;
  });
  setLocal(KEYS.ORDERS, updated);
  return updatedOrder;
}

// Requests
export async function getRequests(): Promise<CampusRequest[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as CampusRequest[];
    } catch (e) {
      console.warn('Supabase query error, fallback to local', e);
    }
  }
  return getLocal<CampusRequest[]>(KEYS.REQUESTS, INITIAL_REQUESTS);
}

export async function createRequest(requestData: Omit<CampusRequest, 'id' | 'status' | 'created_at'>): Promise<CampusRequest> {
  const newReq: CampusRequest = {
    ...requestData,
    id: 'req_' + Date.now(),
    status: 'OPEN',
    created_at: new Date().toISOString(),
    proposals_count: 0,
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('requests').insert([newReq]).select().single();
      if (!error && data) return data as CampusRequest;
    } catch (e) {
      console.warn('Supabase insert error, fallback to local', e);
    }
  }

  const requests = getLocal<CampusRequest[]>(KEYS.REQUESTS, INITIAL_REQUESTS);
  const updated = [newReq, ...requests];
  setLocal(KEYS.REQUESTS, updated);
  return newReq;
}

// Proposals
export async function getProposals(requestId?: string): Promise<Proposal[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from('proposals').select('*');
      if (requestId) query = query.eq('request_id', requestId);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as Proposal[];
    } catch (e) {
      console.warn('Supabase query error, fallback to local', e);
    }
  }

  const proposals = getLocal<Proposal[]>(KEYS.PROPOSALS, INITIAL_PROPOSALS);
  if (requestId) {
    return proposals.filter((p) => p.request_id === requestId);
  }
  return proposals;
}

export async function createProposal(propData: Omit<Proposal, 'id' | 'status' | 'created_at'>): Promise<Proposal> {
  const newProp: Proposal = {
    ...propData,
    id: 'prop_' + Date.now(),
    status: 'PENDING',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('proposals').insert([newProp]).select().single();
      if (!error && data) return data as Proposal;
    } catch (e) {
      console.warn('Supabase insert error, fallback to local', e);
    }
  }

  const proposals = getLocal<Proposal[]>(KEYS.PROPOSALS, INITIAL_PROPOSALS);
  setLocal(KEYS.PROPOSALS, [newProp, ...proposals]);

  // increment proposals_count on request
  const requests = getLocal<CampusRequest[]>(KEYS.REQUESTS, INITIAL_REQUESTS);
  const updatedReqs = requests.map((r) =>
    r.id === newProp.request_id ? { ...r, proposals_count: (r.proposals_count || 0) + 1 } : r
  );
  setLocal(KEYS.REQUESTS, updatedReqs);

  return newProp;
}

export async function acceptProposal(proposalId: string, currentUser: Profile): Promise<Order | null> {
  const proposals = getLocal<Proposal[]>(KEYS.PROPOSALS, INITIAL_PROPOSALS);
  const proposal = proposals.find((p) => p.id === proposalId);
  if (!proposal) return null;

  // Mark proposal accepted
  const updatedProposals = proposals.map((p) => (p.id === proposalId ? { ...p, status: 'ACCEPTED' as const } : p));
  setLocal(KEYS.PROPOSALS, updatedProposals);

  // Mark request fulfilled
  const requests = getLocal<CampusRequest[]>(KEYS.REQUESTS, INITIAL_REQUESTS);
  const updatedReqs = requests.map((r) =>
    r.id === proposal.request_id ? { ...r, status: 'FULFILLED' as const } : r
  );
  setLocal(KEYS.REQUESTS, updatedReqs);

  // Create an active order
  const newOrder: Order = {
    id: 'order_prop_' + Date.now(),
    customer_id: currentUser.id,
    customer_name: currentUser.name,
    maker_id: proposal.maker_id,
    maker_name: proposal.maker_name,
    product_id: 'custom_commission',
    product_name: `Custom Commission (Proposal #${proposal.id.slice(-4)})`,
    product_image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    product_price: proposal.price,
    quantity: 1,
    message: proposal.message,
    status: 'ACCEPTED',
    created_at: new Date().toISOString(),
  };

  const orders = getLocal<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
  setLocal(KEYS.ORDERS, [newOrder, ...orders]);
  return newOrder;
}

// Messages
export async function getMessages(userId1: string, userId2: string): Promise<Message[]> {
  const messages = getLocal<Message[]>(KEYS.MESSAGES, INITIAL_MESSAGES);
  return messages.filter(
    (m) =>
      (m.sender_id === userId1 && m.receiver_id === userId2) ||
      (m.sender_id === userId2 && m.receiver_id === userId1)
  );
}

export async function sendMessage(msg: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
  const newMsg: Message = {
    ...msg,
    id: 'msg_' + Date.now(),
    created_at: new Date().toISOString(),
  };

  const messages = getLocal<Message[]>(KEYS.MESSAGES, INITIAL_MESSAGES);
  setLocal(KEYS.MESSAGES, [...messages, newMsg]);
  return newMsg;
}

// Reviews
export async function getReviews(makerId?: string): Promise<Review[]> {
  const reviews = getLocal<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
  if (makerId) {
    return reviews.filter((r) => r.maker_id === makerId);
  }
  return reviews;
}

export async function addReview(reviewData: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
  const newReview: Review = {
    ...reviewData,
    id: 'rev_' + Date.now(),
    created_at: new Date().toISOString(),
  };

  const reviews = getLocal<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
  setLocal(KEYS.REVIEWS, [newReview, ...reviews]);

  // Mark order as reviewed
  const orders = getLocal<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
  const updatedOrders = orders.map((o) =>
    o.id === reviewData.order_id ? { ...o, reviewed: true } : o
  );
  setLocal(KEYS.ORDERS, updatedOrders);

  return newReview;
}

export function resetDemoData() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.PROFILES, JSON.stringify(INITIAL_PROFILES));
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  localStorage.setItem(KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
  localStorage.setItem(KEYS.PROPOSALS, JSON.stringify(INITIAL_PROPOSALS));
  localStorage.setItem(KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(INITIAL_MESSAGES));
  localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_PROFILES[0]));
}
