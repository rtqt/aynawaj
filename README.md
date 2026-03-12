👟 Aynawaj Shoes (አይናዋጅ ጫማዎች)Aynawaj Shoes is a premium, bilingual e-commerce experience tailored specifically for the Ethiopian footwear market. By bridging the gap between modern web browsing and local commerce habits, Aynawaj offers a seamless journey from discovery to a personalized Telegram-based checkout.

✨ Key Features

   🇪🇹 Bilingual by Design – Full native support for Amharic and English, ensuring accessibility for all users with persistent language detection.
  
  📱 Mobile-First PWA – Optimized for mobile networks in Ethiopia; installable as a Progressive Web App for a native-like experience.
  
  ✈️ Telegram Checkout – Skip the complex payment forms. Orders are formatted and sent directly to the seller via Telegram for manual fulfillment.
  
  ⚡ High-Performance Catalog – Instant brand filtering, size availability checks, and smooth animations powered by Framer Motion.🛠️ Robust Admin Suite –              Integrated Supabase storage for effortless product management and image uploads.

🛠️ The Tech Stack
Layer                        	Technology
Frontend	                    React 18 + TypeScript
Styling	                      Tailwind CSS + Framer Motion
State	                        Custom Hooks (useProducts, useCart)
Storage	                      Supabase (Images) + LocalStorage (Cart)
I18n	                        i18next (Amharic/English)
Deployment	                  Vercel

# Install dependencies
bun install
2. DevelopmentBashbun run dev
Navigate to http://localhost:3000 to see the magic happen.3. Production BuildBashbun run build
# Preview the build locally
bun run preview
🏗️ Project ArchitectureThe project follows a clean, modular structure designed for scalability:/src/components: Atomic UI pieces like the ProductGrid and CartSidebar./src/hooks: Dedicated logic for state persistence and data fetching./src/locales: The heart of our bilingual support (am.json & en.json)./src/lib: Third-party configurations (i18n, Supabase client).Note on Checkout Logic: > We utilize a "Direct-to-Consumer" model. When a user checks out, the CartSidebar generates a pre-filled message and triggers window.open(), handing the transaction over to Telegram's secure and familiar environment.🤝 ContributingWe welcome contributions to make Aynawaj even better!Fork the project.Create your Feature Branch (git checkout -b feature/AmazingFeature).Commit your changes (git commit -m 'Add some AmazingFeature').Push to the branch (git push origin feature/AmazingFeature).Open a Pull Request.📜 License© 2026 AYNAWAJ SHOES. All rights reserved. Built with ❤️ for the Ethiopian community.
