
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const AILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkInitialKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasKey(has);
      }
    };
    checkInitialKey();
  }, []);

  const handleKeySelection = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume success per instructions
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageGen = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setError(null);
    setResultUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: imageSize
          }
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find(p => p.inlineData);
      if (imagePart?.inlineData) {
        setResultUrl(`data:image/png;base64,${imagePart.inlineData.data}`);
      } else {
        setError('No image was returned. Try adjusting your prompt.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Requested entity was not found')) {
        setHasKey(false);
        setError('API Key error. Please re-select your paid API key.');
      } else {
        setError('Image generation failed. Ensure your prompt adheres to safety guidelines.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVideoGen = async () => {
    if (!prompt && !selectedFile) return;
    setIsGenerating(true);
    setError(null);
    setResultUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let imagePayload = undefined;
      
      if (selectedFile) {
        const base64 = await fileToBase64(selectedFile);
        imagePayload = {
          imageBytes: base64,
          mimeType: selectedFile.type
        };
      }

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'A cinematic motion scene',
        image: imagePayload,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setResultUrl(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Requested entity was not found')) {
        setHasKey(false);
        setError('API Key error. Please re-select your paid API key.');
      } else {
        setError('Video generation failed. This process can take several minutes.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 bg-white/[0.01] rounded-[2rem] border border-white/5 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-xs uppercase tracking-[0.6em] text-white/40 mb-4 font-medium italic">Innovation</h2>
        <h3 className="text-5xl md:text-6xl luxury-font mb-6 tracking-tight">Intelligence Lab</h3>
        <p className="text-white/30 max-w-xl mx-auto font-light leading-relaxed">
          Ahsan's custom-built playground for Generative AI. Interface with the world's most capable visual models directly through this portfolio.
        </p>
      </div>

      {!hasKey && (activeTab === 'video' || (activeTab === 'image' && imageSize !== '1K')) ? (
        <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl border border-white/10 mx-auto max-w-2xl text-center px-10">
          <div className="text-4xl mb-6">🔑</div>
          <h4 className="text-2xl luxury-font mb-4">Paid API Key Required</h4>
          <p className="text-sm text-white/40 mb-8 leading-relaxed">
            High-fidelity generation and Veo video models require a selected API key from a paid GCP project. 
            Please review the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-white underline underline-offset-4 hover:text-gray-300">billing documentation</a> before proceeding.
          </p>
          <button 
            onClick={handleKeySelection}
            className="px-12 py-4 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95"
          >
            Authorize Access
          </button>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="flex justify-center mb-12 space-x-6">
            <button 
              onClick={() => { setActiveTab('image'); setResultUrl(null); }}
              className={`pb-2 text-xs uppercase tracking-[0.3em] transition-all border-b-2 ${activeTab === 'image' ? 'border-white text-white' : 'border-transparent text-white/30 hover:text-white'}`}
            >
              Image Engine
            </button>
            <button 
              onClick={() => { setActiveTab('video'); setResultUrl(null); }}
              className={`pb-2 text-xs uppercase tracking-[0.3em] transition-all border-b-2 ${activeTab === 'video' ? 'border-white text-white' : 'border-transparent text-white/30 hover:text-white'}`}
            >
              Motion Engine
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Creative Narrative</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., A minimalist luxury watch floating in a void of liquid silver, hyper-realistic, 8k..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 focus:border-white/30 outline-none transition-all h-40 resize-none text-sm font-light leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {activeTab === 'image' ? (
                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Output Quality</label>
                    <div className="flex bg-white/5 rounded-xl p-1">
                      {(['1K', '2K', '4K'] as const).map(size => (
                        <button 
                          key={size}
                          onClick={() => setImageSize(size)}
                          className={`flex-1 py-2 rounded-lg text-[10px] transition-all ${imageSize === size ? 'bg-white/10 text-white border border-white/10' : 'text-white/30 hover:text-white'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Reference Frame</label>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 bg-white/5 border border-dashed border-white/10 rounded-xl text-[10px] uppercase tracking-widest text-white/40 hover:bg-white/10 transition-all truncate px-4"
                    >
                      {selectedFile ? selectedFile.name : '+ Upload Frame'}
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Dimensions</label>
                  <div className="flex bg-white/5 rounded-xl p-1">
                    {(['16:9', '9:16'] as const).map(ratio => (
                      <button 
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`flex-1 py-2 rounded-lg text-[10px] transition-all ${aspectRatio === ratio ? 'bg-white/10 text-white border border-white/10' : 'text-white/30 hover:text-white'}`}
                      >
                        {ratio === '16:9' ? 'Wide' : 'Port.'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                disabled={isGenerating || (!prompt && activeTab === 'image')}
                onClick={activeTab === 'image' ? handleImageGen : handleVideoGen}
                className={`w-full py-5 rounded-full text-[10px] uppercase tracking-[0.4em] font-black transition-all group overflow-hidden relative
                  ${isGenerating ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-white text-black hover:scale-[1.02]'}`}
              >
                <span className="relative z-10">{isGenerating ? 'Engaging Neural Net...' : `Manifest ${activeTab === 'image' ? 'Visual' : 'Motion'}`}</span>
                {!isGenerating && <div className="absolute inset-0 bg-gray-200 translate-x-full group-hover:translate-x-0 transition-transform duration-500 origin-left" />}
              </button>
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-[10px] uppercase tracking-widest leading-relaxed">{error}</p>
                </div>
              )}
            </div>

            <div className="relative group">
              <div className="aspect-square lg:aspect-auto lg:h-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center relative">
                {isGenerating ? (
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-16 h-16 relative">
                      <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
                      <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full animate-spin" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-[10px] uppercase tracking-[0.5em] text-white animate-pulse">Computing</p>
                      <p className="text-[8px] uppercase tracking-[0.3em] text-white/20 italic">Architecting pixels...</p>
                    </div>
                  </div>
                ) : resultUrl ? (
                  activeTab === 'image' ? (
                    <img src={resultUrl} alt="AI Manifestation" className="w-full h-full object-cover animate-fade-in" />
                  ) : (
                    <video src={resultUrl} controls className="w-full h-full object-cover" autoPlay loop />
                  )
                ) : (
                  <div className="text-center space-y-6 opacity-20">
                    <div className="text-5xl luxury-font italic">✧</div>
                    <p className="text-[10px] uppercase tracking-[0.4em] max-w-[200px] leading-loose">Awaiting creative command to initialize manifestation</p>
                  </div>
                )}
                
                {resultUrl && !isGenerating && (
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={resultUrl} 
                      download={`ahsan-ai-${activeTab}-${Date.now()}`}
                      className="px-6 py-3 glass rounded-full text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/20"
                    >
                      Export Asset
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AILab;
