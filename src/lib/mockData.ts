import { Profile, Product, Order, CampusRequest, Proposal, Review, Message } from '../types';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'user_cust_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@adishankara.ac.in',
    role: 'customer',
    bio: 'Junior studying Economics. Always looking for unique dorm decor and thoughtful gifts for friends.',
    profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    college: 'Adi Shankara Institute of Engineering and Technology (ASIET)',
    verified: true,
    skills: ['Gift Hunting', 'Art Collector'],
    created_at: '2025-01-10T10:00:00Z'
  },
  {
    id: 'maker_ananya',
    name: 'Ananya Crafts',
    email: 'ananya.k@adishankara.ac.in',
    role: 'maker',
    bio: 'Turning ideas into handmade yarn memories. Specializing in timeless crochet bouquets, dorm amigurumi, and custom floral arrangements that never wilt.',
    profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    college: 'ASIET Art & Design',
    verified: true,
    skills: ['Crochet', 'Handmade', 'Gift Wrapping', 'Botanical Crafts'],
    created_at: '2024-09-15T08:30:00Z'
  },
  {
    id: 'maker_claire',
    name: 'Claire Studio',
    email: 'claire.designs@adishankara.ac.in',
    role: 'maker',
    bio: 'Handcrafted freshwater pearl jewelry, beaded personalized charms, and wire-wrapped crystal keepsakes crafted on the ASIET campus.',
    profile_image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    college: 'ASIET Materials Engineering',
    verified: true,
    skills: ['Jewelry Design', 'Pearl Threading', 'Wire Wrapping', 'Custom Engraving'],
    created_at: '2024-10-01T12:00:00Z'
  },
  {
    id: 'maker_dev',
    name: 'Dev Atelier',
    email: 'dev.paintings@adishankara.ac.in',
    role: 'maker',
    bio: 'Fine arts sophomore capturing campus sunsets, personalized architectural watercolors, and mini desktop canvases.',
    profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    college: 'ASIET Arts & Humanities',
    verified: true,
    skills: ['Oil Painting', 'Watercolor', 'Campus Landscapes', 'Portraits'],
    created_at: '2024-08-20T14:15:00Z'
  },
  {
    id: 'maker_botanica',
    name: 'Botanica Dorm',
    email: 'botanica@adishankara.ac.in',
    role: 'maker',
    bio: 'Small-batch botanical soy wax candles infused with campus garden scents, pressed flowers, and lavender notes.',
    profile_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    college: 'ASIET Environmental Science',
    verified: true,
    skills: ['Soy Candle Pouring', 'Aromatherapy', 'Pressed Florals'],
    created_at: '2024-11-05T09:45:00Z'
  },
  {
    id: 'maker_kavya',
    name: 'Kavya Pixels',
    email: 'kavya.pixels@adishankara.ac.in',
    role: 'maker',
    bio: 'CS + Design double major creating whimsical digital portraits, cute stickers, and custom college event posters in 24 hours.',
    profile_image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    college: 'ASIET Computer Science & Design',
    verified: true,
    skills: ['Digital Illustration', 'Vector Art', 'Sticker Packs', 'Portraits'],
    created_at: '2024-12-01T16:00:00Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    maker_id: 'maker_ananya',
    maker_name: 'Ananya Crafts',
    maker_rating: 4.8,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    name: 'Handmade Crochet Bouquet',
    description: 'A vibrant, everlasting bouquet crocheted with premium milk cotton yarn. Includes 3 tulips, 2 daisies, lavender sprigs, and custom craft wrapping paper with a personalized handwritten card.',
    price: 450,
    category: 'Handmade',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPqOE2fdDnESVMSnEzYZvIupyqUFiKFfQSc4ike2FFw5ySVNSNEtL1aN5Y61uY68AAB3mcr6MhW4ewaeuhd8n9LJ6iO3Bvz2KfqYKII9VMuCmFtandHCJTS0o4K0Dz3hLDmFARmmQMXyUTHSn4eZOurRDJs4pZvCytuk3xbhhLMNGkz57u3iH30EiggRS3CoJC-qVuT7Y4F-VIUOzpL6FREIKswFBk865y-pfdskH71H0VZpLbS0A',
    available_quantity: 6,
    customization_available: true,
    created_at: '2025-01-15T11:00:00Z'
  },
  {
    id: 'prod_2',
    maker_id: 'maker_claire',
    maker_name: 'Claire Studio',
    maker_rating: 4.9,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    name: 'Personalized Pearl Bracelet',
    description: 'Genuine baroque freshwater pearl bracelet accented with 14k gold-plated hypoallergenic beads. Hand-strung with high-durability cord. Custom initial charms available.',
    price: 320,
    category: 'Customized',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi9E53KN-qzGVyNO3BIzIcUJcWfFYOzaJsL4Oxvn8kmhINj5JUCysEoR59fizrjyjvd6MaVhXnIf8hi1TCSzs0qjnLtiEkz0YX-Om2-QC3VqWSHq88XugbJgdUQbnRX9sjiDW6od9WMI-SSNtn_1-WuKWhNZpsriR4lEpSsreCemvLsf6fSQ5atOAwSQfE2esU_EP_D2rqOQd_hfaIrnN0LZ5hAbrk1JkTJ1PSDbceZnVDcJAY_eo',
    available_quantity: 12,
    customization_available: true,
    created_at: '2025-01-18T14:30:00Z'
  },
  {
    id: 'prod_3',
    maker_id: 'maker_botanica',
    maker_name: 'Botanica Dorm',
    maker_rating: 5.0,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    name: 'Wildflower Botanical Soy Candle',
    description: 'Hand-poured 100% natural soy wax candle nestled in an artisan ceramic vessel. Embedded with dried campus flora and infused with organic sandalwood and lavender essential oils. Clean 45-hour burn.',
    price: 390,
    category: 'Gifts',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_oUKTjF38kaySyU02cY3uOsF1M3Bsp8fWF_Nd85TgiPlzTvKN4_QgGXq411v1SnSuTEuGkTLlgNkhLdfMijYMITrqaWxQd2UGDlj108miHNxUgJWACYqSy2fUo_l0kGOq7oHz1-vFZQZaYxDtsK4fDvfAogoMxk5HtKTIxTwZWyAi-QHeAZ6MFMzylGArN8v7l-wviHRK6oF5gaiwS3qsgNwyVKz2FvIng7My9hT5Ih5w4LXtPrU',
    available_quantity: 8,
    customization_available: false,
    created_at: '2025-01-20T10:15:00Z'
  },
  {
    id: 'prod_4',
    maker_id: 'maker_dev',
    maker_name: 'Dev Atelier',
    maker_rating: 4.9,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    name: 'Mini Sunset Campus Canvas',
    description: 'An original 6x6-inch textured acrylic painting depicting golden hour over the campus quad. Comes with a matching wooden desktop easel and protective varnish finish.',
    price: 650,
    category: 'Art',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTSkrHntrlxk6ZpItlN7G2bvKE4MYRMWLrH_TzwwQDz5jTjSgYYwaE7M5ffom2ksUZDd57sgSZCN7VUdOwlhAoaDmKCrdXL2YaBfDAxnrGnEzMAq75yrn5UDuLi96RAzSNzlSlPHRp2Mb1MFPDCpeShNTTbiE5e1xI8fdz0WBBla3mGKilRz2-DmT81gg_KWlwU9mt6vrgv3NTq4UuzsC_3iVhp7Zh6OA98ltNPqUU0AV7VMEmqeY',
    available_quantity: 3,
    customization_available: true,
    created_at: '2025-01-22T17:00:00Z'
  },
  {
    id: 'prod_5',
    maker_id: 'maker_claire',
    maker_name: 'Claire Studio',
    maker_rating: 4.9,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    name: 'Customized Friendship Bracelet Set',
    description: 'Set of two intricately hand-woven macrame friendship bracelets with waterproof waxed cords and stainless steel letter beads of your choice.',
    price: 199,
    category: 'Handmade',
    image_url: 'https://images.unsplash.com/photo-1611591475870-76c243f72166?auto=format&fit=crop&w=600&q=80',
    available_quantity: 15,
    customization_available: true,
    created_at: '2025-01-25T12:00:00Z'
  },
  {
    id: 'prod_6',
    maker_id: 'maker_ananya',
    maker_name: 'Ananya Crafts',
    maker_rating: 4.8,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    name: 'Custom Birthday Explosion Box',
    description: 'Handcrafted layered origami box that cascades open into photo slots, heartfelt quotes, and a miniature sweet treat compartment in the center. Perfect surprise birthday gift.',
    price: 499,
    category: 'Gifts',
    image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    available_quantity: 5,
    customization_available: true,
    created_at: '2025-01-28T09:30:00Z'
  },
  {
    id: 'prod_7',
    maker_id: 'maker_kavya',
    maker_name: 'Kavya Pixels',
    maker_rating: 4.9,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    name: 'Digital Campus Portrait & Chibi',
    description: 'High-res hand-drawn digital cartoon portrait of you and your best friend or pet! Delivered within 24 hours as 300DPI print-ready PDF and transparent PNGs.',
    price: 249,
    category: 'Digital',
    image_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    available_quantity: 20,
    customization_available: true,
    created_at: '2025-02-01T15:00:00Z'
  },
  {
    id: 'prod_8',
    maker_id: 'maker_dev',
    maker_name: 'Dev Atelier',
    maker_rating: 4.9,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    name: 'Custom Hand-Painted Heavy Tote Bag',
    description: '100% thick canvas tote bag with hand-painted floral motifs or custom campus architectural line art. Waterproof acrylic fabric sealed.',
    price: 399,
    category: 'Fashion',
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    available_quantity: 7,
    customization_available: true,
    created_at: '2025-02-03T18:20:00Z'
  },
  {
    id: 'prod_9',
    maker_id: 'maker_claire',
    maker_name: 'Claire Studio',
    maker_rating: 4.9,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    name: 'Handmade Ocean Resin Keychain',
    description: 'Crystal-clear epoxy resin initial keychain with real miniature shells, ocean sand, and gold flakes. Scratch-resistant with sturdy keyring.',
    price: 199,
    category: 'Handmade',
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    available_quantity: 14,
    customization_available: true,
    created_at: '2025-02-05T13:45:00Z'
  },
  {
    id: 'prod_10',
    maker_id: 'maker_botanica',
    maker_name: 'Botanica Dorm',
    maker_rating: 5.0,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    name: 'Matcha & Dark Chocolate Fudge Box',
    description: 'Freshly baked batch of 4 fudgy brownies made with ceremonial grade Uji matcha and 70% dark Belgian chocolate. Baked fresh on campus every weekend morning!',
    price: 280,
    category: 'Food',
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    available_quantity: 10,
    customization_available: false,
    created_at: '2025-02-08T08:00:00Z'
  },
  {
    id: 'prod_11',
    maker_id: 'maker_ananya',
    maker_name: 'Ananya Crafts',
    maker_rating: 4.8,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    name: 'Crochet Strawberry Headphone Covers',
    description: 'Cute handcrafted strawberry slip-covers for Sony, AirPods Max, and Beats headphones. Protects ear-pads while adding cozy collegiate flair.',
    price: 299,
    category: 'Fashion',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    available_quantity: 8,
    customization_available: true,
    created_at: '2025-02-10T11:20:00Z'
  },
  {
    id: 'prod_12',
    maker_id: 'maker_kavya',
    maker_name: 'Kavya Pixels',
    maker_rating: 4.9,
    maker_verified: true,
    maker_image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    name: 'Custom Collegiate Birthday Card',
    description: 'Personalized folded greeting card with inside watercolor illustrations, funny campus inside jokes, and premium textured linen cardstock.',
    price: 149,
    category: 'Gifts',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    available_quantity: 25,
    customization_available: true,
    created_at: '2025-02-12T14:10:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order_101',
    customer_id: 'user_cust_1',
    customer_name: 'Aarav Sharma',
    maker_id: 'maker_ananya',
    maker_name: 'Ananya Crafts',
    product_id: 'prod_1',
    product_name: 'Handmade Crochet Bouquet',
    product_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPqOE2fdDnESVMSnEzYZvIupyqUFiKFfQSc4ike2FFw5ySVNSNEtL1aN5Y61uY68AAB3mcr6MhW4ewaeuhd8n9LJ6iO3Bvz2KfqYKII9VMuCmFtandHCJTS0o4K0Dz3hLDmFARmmQMXyUTHSn4eZOurRDJs4pZvCytuk3xbhhLMNGkz57u3iH30EiggRS3CoJC-qVuT7Y4F-VIUOzpL6FREIKswFBk865y-pfdskH71H0VZpLbS0A',
    product_price: 450,
    quantity: 1,
    message: 'Could you please make 2 of the flowers pastel pink and include a "Happy Birthday Shreya" card?',
    status: 'ACCEPTED',
    created_at: '2025-02-14T09:12:00Z',
    reviewed: false
  },
  {
    id: 'order_102',
    customer_id: 'user_cust_1',
    customer_name: 'Aarav Sharma',
    maker_id: 'maker_claire',
    maker_name: 'Claire Studio',
    product_id: 'prod_2',
    product_name: 'Personalized Pearl Bracelet',
    product_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi9E53KN-qzGVyNO3BIzIcUJcWfFYOzaJsL4Oxvn8kmhINj5JUCysEoR59fizrjyjvd6MaVhXnIf8hi1TCSzs0qjnLtiEkz0YX-Om2-QC3VqWSHq88XugbJgdUQbnRX9sjiDW6od9WMI-SSNtn_1-WuKWhNZpsriR4lEpSsreCemvLsf6fSQ5atOAwSQfE2esU_EP_D2rqOQd_hfaIrnN0LZ5hAbrk1JkTJ1PSDbceZnVDcJAY_eo',
    product_price: 320,
    quantity: 1,
    message: 'Initial charm: "S". Thanks so much!',
    status: 'COMPLETED',
    created_at: '2025-02-10T14:22:00Z',
    reviewed: true
  },
  {
    id: 'order_103',
    customer_id: 'user_cust_1',
    customer_name: 'Aarav Sharma',
    maker_id: 'maker_dev',
    maker_name: 'Dev Atelier',
    product_id: 'prod_4',
    product_name: 'Mini Sunset Campus Canvas',
    product_price: 650,
    quantity: 1,
    message: 'Please focus on the Hoover Tower sunset angle if possible.',
    status: 'PENDING',
    created_at: '2025-02-15T18:05:00Z',
    reviewed: false
  }
];

export const INITIAL_REQUESTS: CampusRequest[] = [
  {
    id: 'req_1',
    customer_id: 'user_cust_1',
    customer_name: 'Aarav Sharma',
    customer_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    description: 'I need a customized crochet flower bouquet for my friend\'s birthday with sunflowers and blue lavender.',
    budget: 400,
    category: 'Gifts',
    deadline: '3 days',
    status: 'OPEN',
    created_at: '2025-02-15T10:00:00Z',
    proposals_count: 2
  },
  {
    id: 'req_2',
    customer_id: 'user_cust_2',
    customer_name: 'Meera Patel',
    customer_image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Looking for someone to paint a custom graduation cap with botanical vines and "Class of 25" in gold calligraphy.',
    budget: 600,
    category: 'Art',
    deadline: '5 days',
    status: 'OPEN',
    created_at: '2025-02-14T16:45:00Z',
    proposals_count: 1
  }
];

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop_1',
    request_id: 'req_1',
    maker_id: 'maker_ananya',
    maker_name: 'Ananya Crafts',
    maker_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    maker_verified: true,
    maker_rating: 4.8,
    price: 350,
    message: 'I can create this with premium yellow sunflowers, soft blue lavender, and include ribbon wrapping. Can deliver in 2 days right to your dorm!',
    estimated_completion: '2 days',
    status: 'PENDING',
    created_at: '2025-02-15T11:30:00Z'
  },
  {
    id: 'prop_2',
    request_id: 'req_1',
    maker_id: 'maker_claire',
    maker_name: 'Claire Studio',
    maker_image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    maker_verified: true,
    maker_rating: 4.9,
    price: 380,
    message: 'I have crochet yarn and can also add a small matching beaded pearl charm to the stems!',
    estimated_completion: '3 days',
    status: 'PENDING',
    created_at: '2025-02-15T13:10:00Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    order_id: 'order_102',
    customer_id: 'user_cust_1',
    customer_name: 'Aarav Sharma',
    customer_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    maker_id: 'maker_claire',
    rating: 5,
    comment: 'The pearl bracelet exceeded my expectations! The initials were so cleanly done, and Claire even brought it straight to the dining hall. 10/10 recommend!',
    created_at: '2025-02-11T16:00:00Z'
  },
  {
    id: 'rev_2',
    order_id: 'order_past_1',
    customer_id: 'user_cust_2',
    customer_name: 'Pooja V.',
    customer_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    maker_id: 'maker_ananya',
    rating: 5,
    comment: 'Ananya made the most gorgeous crochet tulip bouquet for my roommate\'s birthday. She cried when she saw it! Lasts forever unlike real flowers.',
    created_at: '2025-02-08T19:30:00Z'
  },
  {
    id: 'rev_3',
    order_id: 'order_past_2',
    customer_id: 'user_cust_3',
    customer_name: 'Rohan M.',
    customer_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    maker_id: 'maker_dev',
    rating: 5,
    comment: 'Dev\'s sunset canvas hangs right over my study desk. Amazing student painter and great communication.',
    created_at: '2025-02-05T12:15:00Z'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    sender_id: 'user_cust_1',
    sender_name: 'Aarav Sharma',
    receiver_id: 'maker_ananya',
    receiver_name: 'Ananya Crafts',
    message: 'Hi Ananya! I loved your crochet bouquets. Can you do a customized color palette with lavender and peach?',
    created_at: '2025-02-14T09:00:00Z'
  },
  {
    id: 'msg_2',
    sender_id: 'maker_ananya',
    sender_name: 'Ananya Crafts',
    receiver_id: 'user_cust_1',
    receiver_name: 'Aarav Sharma',
    message: 'Hey Aarav! Absolutely, I have fresh pastel peach and lavender milk cotton yarn in my studio right now. It takes about 2 days!',
    created_at: '2025-02-14T09:05:00Z'
  }
];
