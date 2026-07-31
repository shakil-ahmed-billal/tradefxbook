import React, { useState } from 'react';
import { Users, MessageSquare, ThumbsUp, Send } from 'lucide-react';

export const TradersLoungeView: React.FC = () => {
  const [posts, setSessions] = useState([
    {
      id: 'p1',
      author: 'Alex (Prop Trader)',
      time: '12m ago',
      pair: 'XAU/USD',
      type: 'Long Idea',
      content: 'Gold retested $2,380 demand zone. Looking for H1 candle close above $2,385 before scaling in.',
      likes: 14,
    },
    {
      id: 'p2',
      author: 'Elena_FX',
      time: '45m ago',
      pair: 'EUR/USD',
      type: 'Discussion',
      content: 'ECB rate decision commentary today. Expecting tight consolidation until London session open.',
      likes: 9,
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleSend = () => {
    if (!newPost.trim()) return;
    setSessions([
      {
        id: 'p-' + Date.now(),
        author: 'Shakil',
        time: 'Just now',
        pair: 'EUR/USD',
        type: 'Idea',
        content: newPost.trim(),
        likes: 1,
      },
      ...posts
    ]);
    setNewPost('');
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <div>
        <h1 className="font-sora text-2xl font-bold text-[#eef1f8] flex items-center gap-2.5">
          <Users className="w-6 h-6 text-[#7aa0ff]" />
          Traders Lounge
        </h1>
        <p className="text-xs text-[#565e73] mt-1">Connect with verified traders, share setups, and discuss market structure.</p>
      </div>

      {/* Post creator */}
      <div className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-4 flex flex-col gap-3">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your market analysis, setup idea, or question..."
          className="w-full bg-[#161b27] border border-[#232a3a] rounded-xl p-3 text-xs text-[#eef1f8] outline-none focus:border-[#7aa0ff] resize-none"
          rows={3}
        />
        <div className="flex justify-end">
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-[#2981eb] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 hover:bg-[#5aa2f2]"
          >
            <Send className="w-3.5 h-3.5" /> Post Setup
          </button>
        </div>
      </div>

      {/* Posts feed */}
      <div className="flex flex-col gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-sora font-semibold text-xs text-[#eef1f8]">{post.author}</span>
                <span className="text-[10px] text-[#565e73] font-mono">{post.time}</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#7aa0ff] bg-[#4c7dff]/15 px-2 py-0.5 rounded-full">
                {post.pair} • {post.type}
              </span>
            </div>

            <p className="text-xs text-[#8d94a8] leading-relaxed my-2">{post.content}</p>

            <div className="flex items-center gap-4 pt-3 border-t border-[#1a2029] text-xs text-[#565e73]">
              <button className="flex items-center gap-1.5 hover:text-[#00d9a3]">
                <ThumbsUp className="w-3.5 h-3.5" /> {post.likes} Likes
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#7aa0ff]">
                <MessageSquare className="w-3.5 h-3.5" /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
