import React, { useState } from 'react';
import { 
  Play, 
  Video as VideoIcon, 
  ExternalLink, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';
import { YouTubeVideoItem } from '../types';

interface MediaSectionProps {
  videos: YouTubeVideoItem[];
}

export const MediaSection: React.FC<MediaSectionProps> = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem>(videos[0] || {
    id: 'vid-default',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Tahmeed Official Keynote',
    description: 'Welcome to the official video broadcast for tahmeed.com.',
    category: 'Official Media',
    views: '100K',
    publishedDate: 'Recently',
    duration: '15:00',
  });

  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    const url = `https://www.youtube.com/watch?v=${activeVideo.youtubeId}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <section id="videos" className="py-16 sm:py-24 bg-[#f5f5f7] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple-Style Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80 mb-3 shadow-2xs">
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Official YouTube Channel & Music Hub</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
              Music Videos & Visuals.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl font-normal">
              Official cinematic music videos, world tour live sets, acoustic sessions, and behind-the-scenes recording documentaries from Tahmeed.
            </p>
          </div>

          {/* YouTube Channel Stats & Link (Apple Pill) */}
          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com/@tahmeed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-xs transition active:scale-98"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Subscribe on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Media Player + Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Active Video Player (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-stone-300/80 shadow-xl flex items-center justify-center">
              {activeVideo.videoUrl ? (
                <video
                  key={activeVideo.videoUrl}
                  src={activeVideo.videoUrl}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Your browser does not support HTML5 video streaming.
                </video>
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId || 'dQw4w9WgXcQ'}?autoplay=0&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              )}
            </div>

            {/* Video Metadata Card (Pure Light Mode) */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 mb-2.5">
                <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {activeVideo.category}
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-400" /> {activeVideo.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" /> {activeVideo.publishedDate}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-stone-600 hover:text-stone-900 transition"
                    title="Copy video link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedShare ? 'Copied Link' : 'Share'}</span>
                  </button>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {activeVideo.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                {activeVideo.description}
              </p>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-stone-900 flex items-center justify-center font-bold text-[10px] text-white font-mono">
                    T
                  </div>
                  <span className="font-semibold text-stone-800">Tahmeed Official Broadcast Channel</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                </div>
                
                <span className="hidden sm:inline text-[11px] text-stone-400">
                  Google SEO Video Schema Active
                </span>
              </div>
            </div>
          </div>

          {/* Video Playlist Sidebar (1 Col) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-500">
                Broadcast Library ({videos.length})
              </h4>
              <span className="text-[11px] text-stone-400 font-mono">HD 4K Verified</span>
            </div>

            <div className="space-y-3">
              {videos.map((vid) => {
                const isActive = activeVideo.id === vid.id;

                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex gap-3.5 ${
                      isActive
                        ? 'bg-white border-stone-900 shadow-md ring-1 ring-stone-900/10'
                        : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-16 bg-stone-900 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center border border-stone-200">
                      {vid.youtubeId ? (
                        <img
                          src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                          alt={vid.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-950 flex flex-col items-center justify-center text-stone-300">
                          <VideoIcon className="w-5 h-5 text-emerald-400 opacity-90" />
                          <span className="text-[8px] font-mono mt-0.5 text-stone-400">LOCAL MP4</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-emerald-600 text-white' : 'bg-white/90 text-stone-900'}`}>
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded font-mono">
                        {vid.duration}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 font-mono block uppercase">
                          {vid.category}
                        </span>
                        <p className={`text-xs font-bold line-clamp-2 mt-0.5 ${isActive ? 'text-stone-950' : 'text-stone-700'}`}>
                          {vid.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1.5">
                        <span>{vid.views} views</span>
                        <span>•</span>
                        <span>{vid.publishedDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
