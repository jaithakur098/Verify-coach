/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="py-16 bg-transparent min-h-[calc(100vh-5rem)] text-left">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <button 
            onClick={() => setSelectedPost(null)}
            className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-xs text-slate-300 font-semibold cursor-pointer"
          >
            ← Back to Articles list
          </button>

          <div className="space-y-4">
            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 text-[10px] font-mono rounded uppercase tracking-wide">
              {selectedPost.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
              {selectedPost.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3 border-y border-white/5 py-3 text-xs text-slate-400 font-mono">
              <span>Author: <strong>{selectedPost.author}</strong></span>
              <span>•</span>
              <span>{selectedPost.authorRole}</span>
              <span>•</span>
              <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Cover image */}
          <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/10">
            <img src={selectedPost.coverImage} alt={selectedPost.title} className="h-full w-full object-cover" />
          </div>

          {/* Article main body */}
          <article className="prose prose-invert prose-amber max-w-none text-slate-300 text-sm leading-relaxed space-y-4 pt-4">
            <p className="text-slate-400 italic text-base leading-relaxed border-l-4 border-amber-400 pl-4">
              "{selectedPost.summary}"
            </p>
            <div className="whitespace-pre-wrap pt-2 space-y-4">
              {selectedPost.content}
            </div>
          </article>

          {/* Tag rows */}
          <div className="pt-6 border-t border-white/5 flex gap-2">
            {selectedPost.tags.map(t => (
              <span key={t} className="px-2 py-0.5 bg-slate-900 rounded text-xs text-slate-400">
                #{t}
              </span>
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-transparent min-h-[calc(100vh-5rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-left space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">COACH ADVICE & EDUCATION</span>
          <h1 className="text-3xl font-display font-black text-white">CoachVerify Advice Hub</h1>
          <p className="text-sm text-slate-400">Explore technical tutorials, physical fitness guides, traditional Indian nutrition planning, and career guidance written by certified professionals.</p>
        </div>

        {/* Article listing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {blogs.map((post) => (
            <div 
              key={post.id}
              className="border border-white/10 glass hover:border-white/20 hover:bg-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                {/* Cover Image */}
                <div className="h-48 overflow-hidden relative border-b border-white/5 bg-slate-950">
                  <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover group-hover:scale-103 transition-all duration-300" />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-white/10 text-amber-400 font-bold text-[9px] px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                </div>

                {/* Info body */}
                <div className="p-5 space-y-3">
                  <div className="flex gap-2 text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> By {post.author.split(' ')[0]}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-white text-base group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-light">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="p-5 pt-0 mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-slate-500">Read time: 5 mins</span>
                <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                  Read Article <ArrowRight className="h-3 w-3" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
