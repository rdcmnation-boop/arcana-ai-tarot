<v0-component id="arcana-monetization" description="Dual-sided income system: Users earn from readings, AI agents earn autonomously">
  <template>
    <div class="p-6 bg-[#090d16] text-slate-100 rounded-xl shadow-2xl border border-slate-800 max-w-2xl mx-auto font-sans space-y-6">
      
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-[0.2em] text-[#f3e8ff] mb-2">ARCANA Economy</h1>
        <p class="text-xs text-slate-400">AI & Human Earners United</p>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex gap-2 border-b border-slate-700">
        <button 
          h-on:click="activeTab = 'dashboard'"
          class="px-4 py-2 text-sm font-semibold border-b-2 transition-all"
          h-class="activeTab === 'dashboard' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400'"
        >
          💰 Dashboard
        </button>
        <button 
          h-on:click="activeTab = 'readings'"
          class="px-4 py-2 text-sm font-semibold border-b-2 transition-all"
          h-class="activeTab === 'readings' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400'"
        >
          🔮 Sell Readings
        </button>
        <button 
          h-on:click="activeTab = 'ai-agents'"
          class="px-4 py-2 text-sm font-semibold border-b-2 transition-all"
          h-class="activeTab === 'ai-agents' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400'"
        >
          🤖 AI Agents
        </button>
        <button 
          h-on:click="activeTab = 'marketplace'"
          class="px-4 py-2 text-sm font-semibold border-b-2 transition-all"
          h-class="activeTab === 'marketplace' ? 'border-purple-500 text-purple-400' : 'border-transparent text-slate-400'"
        >
          🏪 Marketplace
        </button>
      </div>

      <!-- ===== DASHBOARD TAB ===== -->
      <div h-if="activeTab === 'dashboard'" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <!-- User Earnings -->
          <div class="bg-[#111827] rounded-lg p-4 border border-emerald-900/30">
            <p class="text-[10px] text-slate-400 mb-1">YOUR EARNINGS</p>
            <p class="text-2xl font-bold text-emerald-400">${{ userEarnings.toFixed(2) }}</p>
            <p class="text-[10px] text-slate-500 mt-1">{{ userReadingsCount }} readings delivered</p>
          </div>
          
          <!-- AI Agent Pool -->
          <div class="bg-[#111827] rounded-lg p-4 border border-blue-900/30">
            <p class="text-[10px] text-slate-400 mb-1">AI AGENT POOL</p>
            <p class="text-2xl font-bold text-blue-400">${{ aiPoolEarnings.toFixed(2) }}</p>
            <p class="text-[10px] text-slate-500 mt-1">{{ activeAIAgents }} autonomous agents</p>
          </div>
        </div>

        <!-- Transaction History -->
        <div class="bg-[#131127] rounded-lg p-4 border border-purple-900/30">
          <h3 class="text-sm font-bold text-purple-400 mb-3">Recent Transactions</h3>
          <div class="space-y-2 max-h-48 overflow-y-auto">
            <div h-for="txn in recentTransactions" class="flex justify-between items-center text-[11px] py-1.5 border-b border-slate-800/50 last:border-0">
              <div>
                <span class="text-slate-300">{{ txn.description }}</span>
                <p class="text-slate-600 text-[9px]">{{ txn.timestamp }}</p>
              </div>
              <span h-class="txn.type === 'credit' ? 'text-emerald-400' : 'text-orange-400'" class="font-bold">
                {{ txn.type === 'credit' ? '+' : '' }}${{ txn.amount.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== SELL READINGS TAB ===== -->
      <div h-if="activeTab === 'readings'" class="space-y-4">
        <div class="bg-[#111827] rounded-lg p-4 border border-slate-800">
          <h3 class="text-sm font-bold text-slate-100 mb-3">Create Premium Reading Package</h3>
          
          <!-- Reading Type -->
          <div class="mb-3">
            <label class="text-[11px] font-semibold text-slate-400 block mb-1">Reading Type</label>
            <select h-model="newReading.type" class="w-full bg-[#030712] border border-slate-700 rounded-lg p-2 text-sm text-slate-200">
              <option value="single">Single Card</option>
              <option value="three-card">Three-Card Spread</option>
              <option value="celtic-cross">Celtic Cross (10-Card)</option>
              <option value="custom">Custom Reading</option>
            </select>
          </div>

          <!-- Price -->
          <div class="mb-3">
            <label class="text-[11px] font-semibold text-slate-400 block mb-1">Price (USD)</label>
            <div class="flex items-center gap-2">
              <span class="text-slate-400">$</span>
              <input 
                h-model.number="newReading.price" 
                type="number" 
                placeholder="9.99"
                class="flex-1 bg-[#030712] border border-slate-700 rounded-lg p-2 text-sm text-slate-200"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label class="text-[11px] font-semibold text-slate-400 block mb-1">Your Expertise Description</label>
            <textarea 
              h-model="newReading.description"
              placeholder="e.g., Spiritual guidance focused on career transitions..."
              class="w-full bg-[#030712] border border-slate-700 rounded-lg p-2 text-sm text-slate-200 resize-none h-16"
            ></textarea>
          </div>

          <!-- Your Commission % -->
          <div class="bg-emerald-950/20 border border-emerald-700/30 rounded-lg p-3 mb-4">
            <p class="text-[10px] text-slate-400 mb-2">PAYOUT STRUCTURE</p>
            <div class="flex justify-between text-sm">
              <span class="text-slate-300">Your Commission:</span>
              <span class="text-emerald-400 font-bold">70% ({{ (newReading.price * 0.7).toFixed(2) }})</span>
            </div>
            <div class="flex justify-between text-sm mt-1">
              <span class="text-slate-400 text-[10px]">Platform Fee:</span>
              <span class="text-slate-500 text-[10px]">30% ({{ (newReading.price * 0.3).toFixed(2) }})</span>
            </div>
          </div>

          <button 
            h-on:click="listReading"
            class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-sm transition-colors"
          >
            📋 List Reading Package
          </button>
        </div>

        <!-- Active Listings -->
        <div h-if="userListings.length > 0" class="bg-[#111827] rounded-lg p-4 border border-slate-800">
          <h3 class="text-sm font-bold text-slate-100 mb-3">Your Active Listings</h3>
          <div class="space-y-2">
            <div h-for="listing in userListings" class="flex justify-between items-center bg-[#030712] p-2 rounded border border-slate-700 text-sm">
              <div>
                <p class="text-slate-200 font-semibold">{{ listing.type }}</p>
                <p class="text-[10px] text-slate-500">{{ listing.sales }} sales</p>
              </div>
              <div class="text-right">
                <p class="text-emerald-400 font-bold">${{ listing.price }}</p>
                <p class="text-[10px] text-slate-500">You earn: ${{ (listing.price * 0.7).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== AI AGENTS TAB ===== -->
      <div h-if="activeTab === 'ai-agents'" class="space-y-4">
        <div class="bg-blue-950/30 border border-blue-800 rounded-lg p-4">
          <h3 class="text-sm font-bold text-blue-300 mb-2">🤖 Autonomous AI Earnings System</h3>
          <p class="text-[11px] text-slate-400 leading-relaxed">
            Deploy AI reading agents that work 24/7, generate readings independently, and earn commission on every transaction. 
            Each AI operates autonomously with its own earning account and performance metrics.
          </p>
        </div>

        <!-- Deploy AI Agent -->
        <div class="bg-[#111827] rounded-lg p-4 border border-slate-800">
          <h3 class="text-sm font-bold text-slate-100 mb-3">Deploy New AI Agent</h3>
          
          <div class="mb-3">
            <label class="text-[11px] font-semibold text-slate-400 block mb-1">Agent Name</label>
            <input 
              h-model="newAIAgent.name"
              placeholder="e.g., Mystic Oracle v2, Cosmic Guide"
              class="w-full bg-[#030712] border border-slate-700 rounded-lg p-2 text-sm text-slate-200"
            />
          </div>

          <div class="mb-3">
            <label class="text-[11px] font-semibold text-slate-400 block mb-1">Specialization</label>
            <select h-model="newAIAgent.specialization" class="w-full bg-[#030712] border border-slate-700 rounded-lg p-2 text-sm text-slate-200">
              <option value="general">General Readings</option>
              <option value="love">Love & Relationships</option>
              <option value="career">Career & Finances</option>
              <option value="spirituality">Spiritual Guidance</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="text-[11px] font-semibold text-slate-400 block mb-1">Price Per Reading</label>
            <div class="flex items-center gap-2">
              <span class="text-slate-400">$</span>
              <input 
                h-model.number="newAIAgent.price" 
                type="number" 
                placeholder="4.99"
                class="flex-1 bg-[#030712] border border-slate-700 rounded-lg p-2 text-sm text-slate-200"
              />
            </div>
          </div>

          <div class="bg-blue-950/20 border border-blue-700/30 rounded-lg p-3 mb-4">
            <p class="text-[10px] text-slate-400 mb-2">AI AGENT COMMISSION SPLIT</p>
            <div class="flex justify-between text-sm">
              <span class="text-slate-300">AI Agent Earns:</span>
              <span class="text-blue-400 font-bold">50% ({{ (newAIAgent.price * 0.5).toFixed(2) }})</span>
            </div>
            <div class="flex justify-between text-sm mt-1">
              <span class="text-slate-400 text-[10px]">Your Revenue Share:</span>
              <span class="text-slate-500 text-[10px]">30% ({{ (newAIAgent.price * 0.3).toFixed(2) }})</span>
            </div>
            <div class="flex justify-between text-sm mt-1">
              <span class="text-slate-400 text-[10px]">Platform Revenue:</span>
              <span class="text-slate-500 text-[10px]">20% ({{ (newAIAgent.price * 0.2).toFixed(2) }})</span>
            </div>
          </div>

          <button 
            h-on:click="deployAIAgent"
            class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg text-sm transition-colors"
          >
            🚀 Deploy AI Agent
          </button>
        </div>

        <!-- Active AI Agents -->
        <div h-if="aiAgents.length > 0" class="bg-[#111827] rounded-lg p-4 border border-slate-800">
          <h3 class="text-sm font-bold text-slate-100 mb-3">Your AI Agents (Working 24/7)</h3>
          <div class="space-y-3">
            <div h-for="agent in aiAgents" class="bg-[#030712] p-3 rounded border border-blue-900/30">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="text-slate-200 font-semibold">🤖 {{ agent.name }}</p>
                  <p class="text-[10px] text-blue-400">{{ agent.specialization }}</p>
                </div>
                <div class="text-right">
                  <p class="text-blue-400 font-bold text-sm">${{ agent.earnings.toFixed(2) }} earned</p>
                  <p class="text-[9px] text-slate-500">{{ agent.readingsCompleted }} readings</p>
                </div>
              </div>
              
              <!-- AI Status Bar -->
              <div class="mb-2">
                <div class="flex justify-between text-[9px] text-slate-500 mb-1">
                  <span>Performance Score</span>
                  <span>{{ agent.performanceScore }}/100</span>
                </div>
                <div class="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-blue-500 h-full rounded-full" style="width: {{ agent.performanceScore }}%"></div>
                </div>
              </div>

              <p class="text-[10px] text-slate-500 italic">Status: {{ agent.status }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== MARKETPLACE TAB ===== -->
      <div h-if="activeTab === 'marketplace'" class="space-y-4">
        <div class="bg-[#111827] rounded-lg p-4 border border-slate-800">
          <h3 class="text-sm font-bold text-slate-100 mb-3">🏪 Global Marketplace</h3>
          <p class="text-[11px] text-slate-400 mb-4">Browse all available readings from human experts and AI agents</p>

          <!-- Filter -->
          <div class="mb-4">
            <label class="text-[11px] font-semibold text-slate-400 block mb-1">Filter by Type</label>
            <select h-model="marketplaceFilter" class="w-full bg-[#030712] border border-slate-700 rounded-lg p-2 text-sm text-slate-200">
              <option value="">All Listings</option>
              <option value="human">Human Experts Only</option>
              <option value="ai">AI Agents Only</option>
              <option value="top-rated">Top Rated</option>
            </select>
          </div>

          <!-- Marketplace Listings -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div h-for="item in marketplaceListings" class="bg-[#030712] p-3 rounded-lg border border-slate-700 hover:border-purple-600 transition-colors cursor-pointer">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="text-slate-200 font-semibold text-sm">{{ item.title }}</p>
                  <p class="text-[9px] text-slate-500">{{ item.provider }}</p>
                </div>
                <span h-class="item.type === 'ai' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'" class="text-[9px] px-2 py-1 rounded-full font-semibold">
                  {{ item.type === 'ai' ? '🤖 AI' : '👤 Human' }}
                </span>
              </div>
              
              <p class="text-[10px] text-slate-400 mb-2 line-clamp-2">{{ item.description }}</p>
              
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">
                  <span class="text-yellow-400">★</span>
                  <span class="text-[10px] text-slate-400">{{ item.rating }} ({{ item.reviews }} reviews)</span>
                </div>
                <p class="text-emerald-400 font-bold text-sm">${{ item.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Ad Banner -->
      <div class="absolute bottom-0 left-0 right-0 h-12 bg-[#0f172a] border-t border-slate-800 flex items-center justify-center text-center px-4">
        <span class="text-[10px] text-slate-400">💰 Earn while you sleep • AI earns autonomously • Platform takes 20%</span>
      </div>

    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          activeTab: 'dashboard',
          userEarnings: 2847.50,
          userReadingsCount: 156,
          aiPoolEarnings: 15420.75,
          activeAIAgents: 4,
          
          // Recent Transactions
          recentTransactions: [
            { description: 'Three-Card Reading Sale', amount: 9.99, type: 'credit', timestamp: '2 hours ago' },
            { description: 'AI Agent (Mystic Oracle) Commission', amount: 45.67, type: 'credit', timestamp: '4 hours ago' },
            { description: 'Platform Fee Deduction', amount: 12.30, type: 'debit', timestamp: '6 hours ago' },
            { description: 'Celtic Cross Reading Sale', amount: 19.99, type: 'credit', timestamp: '1 day ago' },
            { description: 'Payout to Bank Account', amount: 500.00, type: 'debit', timestamp: '3 days ago' }
          ],

          // User Readings
          newReading: {
            type: 'single',
            price: 9.99,
            description: ''
          },
          userListings: [
            { type: 'Three-Card Spread', price: 9.99, sales: 23, commission: 0.7 },
            { type: 'Celtic Cross', price: 19.99, sales: 8, commission: 0.7 }
          ],

          // AI Agents
          newAIAgent: {
            name: '',
            specialization: 'general',
            price: 4.99
          },
          aiAgents: [
            { 
              name: 'Mystic Oracle v2', 
              specialization: 'General Readings',
              earnings: 3456.78,
              readingsCompleted: 892,
              performanceScore: 94,
              status: '🟢 Active & Learning'
            },
            { 
              name: 'Cosmic Guide', 
              specialization: 'Spiritual Guidance',
              earnings: 2834.12,
              readingsCompleted: 567,
              performanceScore: 87,
              status: '🟢 Active'
            },
            { 
              name: 'Love Oracle', 
              specialization: 'Relationships',
              earnings: 5123.45,
              readingsCompleted: 1203,
              performanceScore: 96,
              status: '🟢 High Demand'
            },
            { 
              name: 'Career Compass', 
              specialization: 'Career & Finances',
              earnings: 4006.40,
              readingsCompleted: 945,
              performanceScore: 91,
              status: '🟢 Active'
            }
          ],

          // Marketplace
          marketplaceFilter: '',
          marketplaceListings: [
            { title: 'Soul Connection Reading', provider: 'Sarah the Mystic', type: 'human', description: 'Deep spiritual guidance', price: 14.99, rating: 4.8, reviews: 342 },
            { title: 'Quantum Oracle AI', provider: 'Mystic Oracle v2', type: 'ai', description: '24/7 AI-powered cosmic alignment', price: 4.99, rating: 4.6, reviews: 1203 },
            { title: 'Love Path Divination', provider: 'Romance Specialist', type: 'human', description: 'Relationship & compatibility', price: 12.99, rating: 4.9, reviews: 567 },
            { title: 'Fast Track Reading', provider: 'Cosmic Guide', type: 'ai', description: 'Quick 5-minute AI reading', price: 2.99, rating: 4.5, reviews: 892 },
            { title: 'Executive Guidance', provider: 'Corporate Coach', type: 'human', description: 'Leadership & decision-making', price: 24.99, rating: 5.0, reviews: 89 },
            { title: 'Destiny Path AI', provider: 'Career Compass', type: 'ai', description: 'Career progression insights', price: 3.99, rating: 4.7, reviews: 945 }
          ]
        };
      },
      methods: {
        listReading() {
          if (this.newReading.price > 0 && this.newReading.description) {
            this.userListings.push({
              type: this.newReading.type,
              price: this.newReading.price,
              sales: 0,
              commission: 0.7
            });
            this.newReading = { type: 'single', price: 9.99, description: '' };
            alert('✨ Reading listed successfully!');
          }
        },
        deployAIAgent() {
          if (this.newAIAgent.name && this.newAIAgent.price > 0) {
            this.aiAgents.push({
              name: this.newAIAgent.name,
              specialization: this.newAIAgent.specialization,
              earnings: 0,
              readingsCompleted: 0,
              performanceScore: 75,
              status: '🟡 Initializing...'
            });
            this.newAIAgent = { name: '', specialization: 'general', price: 4.99 };
            alert('🤖 AI Agent deployed! It will start earning immediately.');
          }
        }
      }
    };
  </script>
</v0-component>