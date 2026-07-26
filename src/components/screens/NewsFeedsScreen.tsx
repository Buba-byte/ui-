import React, { useState } from 'react';
import { NewsFeedItem } from '../../types';
import { 
  Tv, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Play, 
  Search, 
  ExternalLink, 
  TrendingUp, 
  FileText, 
  Building2, 
  ChevronDown, 
  ChevronUp,
  Bot
} from 'lucide-react';

interface NewsFeedsScreenProps {
  newsItems: NewsFeedItem[];
}

export const NewsFeedsScreen: React.FC<NewsFeedsScreenProps> = ({ newsItems: initialItems }) => {
  const [items, setItems] = useState<NewsFeedItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSummaryId, setExpandedSummaryId] = useState<string | null>('news-1');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const categories = ['All', 'Tax Changes', 'CBK & Finance', 'SME Vlog', 'County Permits'];

  const toggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = !item.isLiked;
          return {
            ...item,
            isLiked,
            likesCount: isLiked ? item.likesCount + 1 : item.likesCount - 1,
          };
        }
        return item;
      })
    );
  };

  const toggleBookmark = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item))
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summaryText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 space-y-4 text-slate-900 pb-12">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Biashara Pulse & Vlogs</h1>
          <p className="text-xs text-slate-500">Kenyan Business Feeds, Tax Policy & Financial Data</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-slate-900 text-rose-400 font-extrabold flex items-center justify-center text-xs shadow-2xs">
          <Tv className="w-4 h-4" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tax changes, CBK rates, SME vlogs..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
        />
      </div>

      {/* Categories Horizontal Scroll Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed Cards (Instagram / Vlog Style) */}
      <div className="space-y-4">
        {filteredItems.map((post) => {
          const isSummaryOpen = expandedSummaryId === post.id;
          const isPlaying = playingVideoId === post.id;

          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition hover:shadow-md"
            >
              {/* Post Author / Source Header */}
              <div className="p-3.5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.authorAvatar}
                    alt={post.source}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                      <span>{post.source}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
                        {post.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {post.authorTitle} • {post.publishedTime}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-lg">
                  {post.readTime}
                </span>
              </div>

              {/* Vlog / Media Video Thumbnail Card */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                {isPlaying ? (
                  <div className="w-full h-full bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center animate-pulse">
                      <Tv className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-xs text-white">Playing Official Kenya Business Video Feed</div>
                    <p className="text-[10px] text-slate-400 max-w-xs">
                      {post.title}
                    </p>
                    <button
                      onClick={() => setPlayingVideoId(null)}
                      className="text-[10px] font-bold bg-slate-800 text-slate-200 px-3 py-1 rounded-lg border border-slate-700"
                    >
                      Close Video Preview
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src={post.thumbnailUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                    {post.hasVideo && (
                      <button
                        onClick={() => setPlayingVideoId(post.id)}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg transition transform group-hover:scale-110 active:scale-95"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    )}

                    {post.videoDuration && (
                      <span className="absolute bottom-3 right-3 text-[10px] font-mono font-bold text-white bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        {post.videoDuration}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 right-16 text-white">
                      <h3 className="font-extrabold text-sm leading-snug drop-shadow-xs line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </>
                )}
              </div>

              {/* Feed Content & AI Summary Section */}
              <div className="p-3.5 space-y-2.5">
                <p className="text-xs text-slate-700 leading-relaxed">
                  {post.summaryText}
                </p>

                {/* AI Executive Bullet Takeaways */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 space-y-2">
                  <div
                    onClick={() => setExpandedSummaryId(isSummaryOpen ? null : post.id)}
                    className="cursor-pointer flex items-center justify-between text-xs font-extrabold text-slate-900"
                  >
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Bot className="w-4 h-4 text-emerald-600" />
                      <span>ComplyAI 30-Sec Executive Takeaways</span>
                    </div>
                    {isSummaryOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>

                  {isSummaryOpen && (
                    <ul className="text-[11px] text-slate-700 space-y-1.5 pt-1 border-t border-slate-200/60 animate-in fade-in duration-150">
                      {post.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Social Interaction Bar */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 font-bold transition ${
                        post.isLiked ? 'text-rose-600' : 'hover:text-slate-900'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current text-rose-600' : ''}`} />
                      <span>{post.likesCount}</span>
                    </button>

                    <div className="flex items-center gap-1.5 font-semibold text-slate-600">
                      <MessageSquare className="w-4 h-4 text-slate-500" />
                      <span>{post.commentsCount}</span>
                    </div>

                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className={`transition ${
                        post.isBookmarked ? 'text-amber-600' : 'hover:text-slate-900'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current text-amber-600' : ''}`} />
                    </button>
                  </div>

                  {post.officialSourceUrl && (
                    <a
                      href={post.officialSourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-xl"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
