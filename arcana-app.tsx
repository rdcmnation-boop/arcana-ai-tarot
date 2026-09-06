<v0-component id="arcana-free-app" description="Complete production-ready frontend simulator for the fully-unlocked, free ad-supported version of ARCANA AI Tarot, tracking unlimited card draws, real-time simulated AI interpretations, and persistent banner monetization.">
  <template>
    <div class="p-6 bg-[#090d16] text-slate-100 rounded-xl shadow-2xl border border-slate-800 max-w-lg mx-auto font-sans relative overflow-hidden pb-20">
      
      <!-- App Header -->
      <div class="text-center mb-6 mt-2">
        <h1 class="text-3xl font-bold tracking-[0.2em] text-[#f3e8ff] mb-1">ARCANA</h1>
        <p class="text-xs text-slate-400 italic">AI-guided readings for reflection, not certainty</p>
        
        <!-- Fully Unlocked Free Badge -->
        <div class="inline-block mt-3 px-3 py-1 bg-emerald-950/80 border border-emerald-500 rounded-full">
          <span class="text-[10px] font-extrabold tracking-wider text-emerald-400">✨ 100% FREE UNLOCKED ACCESS</span>
        </div>
      </div>

      <!-- Main Interaction Container -->
      <div class="bg-[#111827] rounded-2xl p-5 border border-slate-800 shadow-xl">
        <h2 class="text-base font-semibold text-slate-100 mb-1">Ask the Cards</h2>
        <p class="text-xs text-slate-400 mb-4">All layouts, pattern tools, and deep interpretations are entirely free.</p>
        
        <!-- Text Input Field -->
        <div class="space-y-1 mb-4">
          <textarea 
            h-model="userQuestion"
            placeholder="e.g., What should I focus on this month?" 
            class="w-full bg-[#030712] text-slate-200 border border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500 placeholder-slate-600 resize-none h-20"
          ></textarea>
        </div>

        <!-- Spread Selection Tabs -->
        <div class="flex gap-3 mb-4">
          <button 
            h-on:click="setSpread('SINGLE_CARD')"
            class="flex-1 py-2.5 text-center text-xs font-semibold rounded-lg border transition-all"
            h-class="spreadType === 'SINGLE_CARD' ? 'bg-[#7c3aed] border-[#a78bfa] text-white' : 'bg-[#1f2937] border-slate-700 text-slate-400 hover:bg-slate-800'"
          >
            Single Card
          </button>
          
          <button 
            h-on:click="setSpread('THREE_CARD')"
            class="flex-1 py-2.5 text-center text-xs font-semibold rounded-lg border transition-all"
            h-class="spreadType === 'THREE_CARD' ? 'bg-[#7c3aed] border-[#a78bfa] text-white' : 'bg-[#1f2937] border-slate-700 text-slate-400 hover:bg-slate-800'"
          >
            Three-Card Spread
          </button>
        </div>

        <!-- Core Draw Trigger -->
        <button 
          h-on:click="executeDraw"
          disabled="{{ loading }}"
          class="w-full bg-[#10b981] hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
        >
          <span h-if="loading" class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
          <span>{{ loading ? 'Generating AI Interpretation...' : 'Draw & Interpret Layout' }}</span>
        </button>

        <!-- Stats Tracker -->
        <div h-if="lifetimeDrawsCount > 0" class="text-center mt-3">
          <p class="text-[11px] text-slate-500 italic">Total insights explored in this session: {{ lifetimeDrawsCount }}</p>
        </div>
      </div>

      <!-- Simulated AI Output Presentation Module -->
      <div h-if="readingResult" class="mt-5 bg-[#131127] border border-purple-900 rounded-2xl p-5 space-y-4 animate-fade-in">
        <div class="flex justify-between items-center">
          <h3 class="text-sm font-bold text-[#c084fc] flex items-center gap-1.5">🔮 The Cosmic Alignment</h3>
          <span class="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">
            {{ spreadType === 'SINGLE_CARD' ? '1 Card Matrix' : '3 Card Spread' }}
          </span>
        </div>

        <!-- Intro -->
        <p class="text-sm text-slate-300 leading-relaxed italic">
          "{{ readingResult.introduction }}"
        </p>

        <div class="h-px bg-purple-950 my-3"></div>

        <!-- Cards Display Sub-Block -->
        <div class="grid gap-2" h-class="spreadType === 'THREE_CARD' ? 'grid-cols-3' : 'grid-cols-1'">
          <div h-for="card in drawnCards" class="bg-[#030712]/60 p-2.5 rounded-lg border border-purple-950/60 text-center">
            <span class="block text-xs font-bold text-slate-200 truncate">{{ card.name }}</span>
            <span class="text-[9px] text-purple-400 font-mono block mt-0.5">
              {{ card.reversed ? '🙃 Reversed' : '⬆️ Upright' }}
            </span>
          </div>
        </div>

        <!-- Detailed Synthesis -->
        <div class="space-y-1">
          <h4 class="text-xs font-bold text-[#a855f7] uppercase tracking-wider">The Structural Synthesis</h4>
          <p class="text-xs text-slate-300 leading-relaxed">{{ readingResult.synthesis }}</p>
        </div>

        <!-- Disclaimer -->
        <p class="text-[10px] text-slate-600 text-center pt-2 leading-normal border-t border-slate-900">
          Readings are AI-generated reflections drawing on traditional tarot symbolism — for entertainment and self-reflection, not fact, prediction, or medical, legal, or financial guidance.
        </p>
      </div>

      <!-- Persistent AdMob Ad Banner Placement -->
      <div class="absolute bottom-0 left-0 right-0 h-14 bg-[#0f172a] border-t border-slate-800 flex flex-col justify-center items-center text-center px-4">
        <span class="text-[10px] font-bold tracking-wider text-slate-400">🌐 SPONSOR ADVERTISEMENT PLACEHOLDER</span>
        <span class="text-[9px] text-slate-600 font-mono mt-0.5">[Google AdMob Integration Running Network ID: ca-app-pub-3940...]</span>
      </div>

    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          userQuestion: '',
          spreadType: 'SINGLE_CARD',
          loading: false,
          lifetimeDrawsCount: 0,
          readingResult: null,
          drawnCards: [],
          tarotPool: [
            "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", 
            "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit", 
            "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", 
            "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World",
            "Ace of Wands", "Two of Wands", "Three of Wands", "Ten of Cups", "Knight of Swords"
          ]
        };
      },
      methods: {
        setSpread(type) {
          this.spreadType = type;
        },
        executeDraw() {
          this.loading = true;
          this.readingResult = null;

          // Simulate live async cloud infrastructure delay
          setTimeout(() => {
            const count = this.spreadType === 'THREE_CARD' ? 3 : 1;
            let currentCards = [];
            
            for (let i = 0; i < count; i++) {
              const randIdx = Math.floor(Math.random() * this.tarotPool.length);
              currentCards.push({
                name: this.tarotPool[randIdx],
                reversed: Math.random() < 0.25
              });
            }

            this.drawnCards = currentCards;
            this.lifetimeDrawsCount += count;

            // Contextual output builder
            if (this.spreadType === 'SINGLE_CARD') {
              this.readingResult = {
                introduction: `The appearance of ${this.drawnCards[0].name} highlights an immediate focal node within your inquiry grid.`,
                synthesis: `This energy indicates that clarity isn't hidden down distant pathways, but rather anchored to how cleanly you process today's immediate choices.`
              };
            } else {
              this.readingResult = {
                introduction: `Your past, present, and future variables align through a sequential three-step narrative thread anchored by ${this.drawnCards[1].name}.`,
                synthesis: `The path forward requires distilling lessons from foundational shifts, anchoring your focus on current actions, and trusting structural transitions.`
              };
            }

            this.loading = false;
          }, 1200);
        }
      }
    };
  </script>
</v0-component>