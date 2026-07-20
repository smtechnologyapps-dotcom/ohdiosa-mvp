"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Search } from "lucide-react";

type Message = {
  id: number;
  sender: 'user' | 'assistant';
  text?: string;
  isProduct?: boolean;
  product?: {
    name: string;
    price: string;
    image: string;
  };
};

export function SalesAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchingFullScreen, setIsSearchingFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'assistant', text: 'Bienvenido a OHDIOSA. Soy Isabella, tu Concierge personal. ¿Buscas alguna pieza en particular hoy?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newUserMsg: Message = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");

    // Trigger full screen Isabella search effect
    setIsSearchingFullScreen(true);

    // Simulate AI finding the product after the search animation
    setTimeout(() => {
      setIsSearchingFullScreen(false);
      
      const foundMsg: Message = {
        id: Date.now() + 2,
        sender: 'assistant',
        text: 'He encontrado esta pieza exclusiva basada en tu estilo:'
      };
      const productSuggestion: Message = {
        id: Date.now() + 3,
        sender: 'assistant',
        isProduct: true,
        product: {
          name: "Vestido Asimétrico Noir con detalles en Oro",
          price: "$1,200",
          image: "/images/evening.jpg"
        }
      };
      setMessages(prev => [...prev, foundMsg, productSuggestion]);
    }, 3500); // Isabella searches for 3.5 seconds
  };

  return (
    <>
      {/* Full Screen Isabella Search Effect */}
      <AnimatePresence>
        {isSearchingFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative"
            >
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gold shadow-[0_0_50px_rgba(212,175,55,0.3)] z-10">
                <Image src="/images/avatar.jpg" alt="Isabella Buscando" fill className="object-cover" />
              </div>
              
              {/* Radar/Scanning rings */}
              <motion.div 
                animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 border border-gold rounded-full z-0"
              />
              <motion.div 
                animate={{ scale: [1, 1.8, 2.5], opacity: [0.5, 0.1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                className="absolute inset-0 border border-gold rounded-full z-0"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center"
            >
              <div className="flex items-center gap-3 text-gold mb-2">
                <Search className="animate-pulse" size={24} />
                <h2 className="font-serif text-3xl">Isabella está buscando...</h2>
              </div>
              <p className="text-steel font-sans uppercase tracking-widest text-sm">
                Analizando el catálogo de Alta Costura
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && !isSearchingFullScreen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center overflow-hidden border border-gold/30 cursor-pointer"
          >
            <Image src="/images/avatar.jpg" alt="Isabella Concierge" fill className="object-cover" />
            <div className="absolute inset-0 bg-gold/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-30"></div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed bottom-6 right-6 z-50 w-[350px] bg-surface border border-whisper shadow-2xl flex flex-col overflow-hidden ${isSearchingFullScreen ? 'pointer-events-none opacity-50' : ''}`}
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header with Avatar */}
            <div className="bg-canvas border-b border-whisper p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/30">
                  <Image src="/images/avatar.jpg" alt="Isabella" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-gold tracking-wide leading-none">Isabella</h4>
                  <span className="text-[10px] text-steel uppercase tracking-widest flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Asistente IA
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-steel hover:text-foreground transition-colors"
                disabled={isSearchingFullScreen}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map(msg => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && !msg.isProduct && (
                    <div className="w-6 h-6 relative rounded-full overflow-hidden mr-2 flex-shrink-0 mt-1">
                       <Image src="/images/avatar.jpg" alt="Isabella" fill className="object-cover" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] p-3 text-sm font-sans leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-gold text-canvas' 
                        : 'bg-canvas text-ink border border-whisper'
                    } ${msg.isProduct ? 'ml-8' : ''}`}
                  >
                    {msg.isProduct && msg.product ? (
                      <div className="flex flex-col gap-3">
                        <div className="w-full aspect-[3/4] relative bg-background overflow-hidden border border-whisper group cursor-pointer">
                          <Image src={msg.product.image} alt={msg.product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <span className="font-serif text-gold text-base">{msg.product.name}</span>
                        <span className="font-mono text-xs">{msg.product.price}</span>
                        <button className="text-[10px] uppercase tracking-widest bg-ink text-canvas py-2 hover:bg-gold transition-colors">
                          Añadir a Bolsa
                        </button>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-whisper bg-canvas">
              <div className="flex items-center border border-whisper bg-surface focus-within:border-gold transition-colors">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isSearchingFullScreen && handleSend()}
                  placeholder="Escribe a Isabella..."
                  disabled={isSearchingFullScreen}
                  className="flex-1 bg-transparent border-none text-sm p-3 text-ink placeholder:text-steel focus:outline-none disabled:opacity-50"
                />
                <button 
                  onClick={handleSend}
                  disabled={isSearchingFullScreen}
                  className="p-3 text-steel hover:text-gold transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
