-- CampusCraft Supabase Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table if not exists profiles (
  id text primary key,
  name text not null,
  email text not null unique,
  role text not null check (role in ('customer', 'maker')),
  bio text,
  profile_image text,
  college text default 'Adi Shankara Institute of Engineering and Technology (ASIET)',
  verified boolean default false,
  skills text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Products Table
create table if not exists products (
  id text primary key,
  maker_id text references profiles(id) on delete cascade not null,
  maker_name text,
  maker_rating numeric(2,1) default 5.0,
  maker_verified boolean default false,
  maker_image text,
  name text not null,
  description text not null,
  price numeric(10,2) not null,
  category text not null,
  image_url text not null,
  available_quantity integer default 1,
  customization_available boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Orders Table
create table if not exists orders (
  id text primary key,
  customer_id text references profiles(id) on delete cascade not null,
  customer_name text,
  maker_id text references profiles(id) on delete cascade not null,
  maker_name text,
  product_id text not null,
  product_name text,
  product_image text,
  product_price numeric(10,2),
  quantity integer default 1,
  message text,
  status text not null check (status in ('PENDING', 'ACCEPTED', 'DECLINED', 'COMPLETED', 'CANCELLED')) default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Messages Table
create table if not exists messages (
  id text primary key,
  sender_id text references profiles(id) on delete cascade not null,
  sender_name text,
  receiver_id text references profiles(id) on delete cascade not null,
  receiver_name text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Reviews Table
create table if not exists reviews (
  id text primary key,
  order_id text references orders(id) on delete cascade not null,
  customer_id text references profiles(id) on delete cascade not null,
  customer_name text,
  customer_image text,
  maker_id text references profiles(id) on delete cascade not null,
  rating integer check (rating between 1 and 5) not null,
  comment text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Requests Table (Request Something)
create table if not exists requests (
  id text primary key,
  customer_id text references profiles(id) on delete cascade not null,
  customer_name text,
  customer_image text,
  description text not null,
  budget numeric(10,2) not null,
  category text not null,
  deadline text not null,
  status text not null check (status in ('OPEN', 'FULFILLED', 'CLOSED')) default 'OPEN',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Proposals Table
create table if not exists proposals (
  id text primary key,
  request_id text references requests(id) on delete cascade not null,
  maker_id text references profiles(id) on delete cascade not null,
  maker_name text,
  maker_image text,
  maker_verified boolean default false,
  maker_rating numeric(2,1) default 5.0,
  price numeric(10,2) not null,
  message text not null,
  estimated_completion text not null,
  status text not null check (status in ('PENDING', 'ACCEPTED', 'REJECTED')) default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Real-time Publication
alter publication supabase_realtime add table orders, messages, requests, proposals;
