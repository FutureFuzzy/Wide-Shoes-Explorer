/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  ListFilter,
  BarChart2,
  Ruler,
  RotateCcw,
  AlertTriangle,
  Footprints
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { ShoeWidthData, shoeWidthData } from './data';

const WIDTH_GRADES = [
  { label: '窄楦 (Narrow)', min: 0, max: 94, color: '#ef4444' },
  { label: '标准 (Standard)', min: 94, max: 99, color: '#f59e0b' },
  { label: '宽楦 (2E)', min: 99, max: 104, color: '#10b981' },
  { label: '加宽 (4E)', min: 104, max: 109, color: '#3b82f6' },
  { label: '极宽 (4E+)', min: 109, max: 200, color: '#8b5cf6' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'ranking' | 'calculator'>('ranking');
  const [searchTerm, setSearchTerm] = useState('');
  const [footWidth, setFootWidth] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'barefoot' | 'athletic' | 'casual'>('all');
  const [failedImages, setFailedImages] = useState<Record<string, number>>( {});

  const handleImageError = (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.target as HTMLImageElement;
    const currentAttempt = failedImages[id] || 0;

    if (currentAttempt === 0) {
      // First retry: try a different proxy (WordPress Jetpack)
      const originalUrl = el.getAttribute('data-original');
      if (originalUrl) {
        // Retry with Jetpack proxy
        el.src = `https://i0.wp.com/${originalUrl.replace(/^https?:\/\//, '')}?w=600`;
        setFailedImages(prev => ({ ...prev, [id]: 1 }));
      } else {
        setFailedImages(prev => ({ ...prev, [id]: 3 }));
      }
    } else if (currentAttempt === 1) {
      // Second retry: try Google's proxy
      const originalUrl = el.getAttribute('data-original');
      if (originalUrl) {
        el.src = `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&url=${encodeURIComponent(originalUrl)}`;
        setFailedImages(prev => ({ ...prev, [id]: 2 }));
      } else {
        setFailedImages(prev => ({ ...prev, [id]: 3 }));
      }
    } else {
      // Final fallback: show icon
      setFailedImages(prev => ({ ...prev, [id]: 3 }));
    }
  };

  const filteredData = useMemo(() => {
    return shoeWidthData
      .filter(item => {
        const matchesSearch = item.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.series.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => b.widthMm - a.widthMm);
  }, [searchTerm, categoryFilter]);

  const footEvaluation = useMemo(() => {
    const width = parseFloat(footWidth);
    if (isNaN(width)) return null;

    const grade = WIDTH_GRADES.find(g => width >= g.min && width < g.max);
    return grade || null;
  }, [footWidth]);

  return (
    <div className="min-h-screen bg-bento-bg text-bento-text font-sans selection:bg-bento-accent selection:text-white">
      {/* Header */}
      <header className="px-6 py-8 border-b border-bento-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">宽足选鞋 <span className="text-bento-accent">专家助手</span></h1>
            <p className="text-xs text-bento-dim font-medium uppercase tracking-wider mt-1">数据来源：全球实测数据库 & 品牌官宣</p>
          </div>
          <div className="flex gap-2">
            {[
              { id: 'ranking', label: '宽度排名', icon: ListFilter },
              { id: 'calculator', label: '脚型计算', icon: Calculator },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all rounded-full border ${
                  activeTab === tab.id 
                    ? 'bg-bento-accent/20 border-bento-accent text-bento-accent' 
                    : 'bg-bento-card border-bento-border text-bento-dim hover:text-white'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'ranking' && (
            <motion.div 
              key="ranking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {/* Chart Card - 3 Columns Wide */}
              <div className="md:col-span-3 bg-bento-card border border-bento-border rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-bold text-bento-dim uppercase tracking-widest">全球“真·宽楦”分布图 (毫米)</h3>
                  <BarChart2 size={16} className="text-bento-dim" />
                </div>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shoeWidthData} layout="vertical" margin={{ left: 100, right: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#2d3139" />
                      <XAxis type="number" domain={[90, 125]} hide />
                      <YAxis 
                        dataKey="brand" 
                        type="category" 
                        tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#9ca3af' }} 
                        width={100}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${value}mm`, '实测内宽']}
                        contentStyle={{ backgroundColor: '#1a1d23', border: '1px solid #2d3139', borderRadius: '8px' }}
                        itemStyle={{ color: '#f3f4f6', fontFamily: 'monospace' }}
                      />
                      <Bar dataKey="widthMm" radius={[0, 4, 4, 0]}>
                        {shoeWidthData.map((entry, index) => {
                          const grade = WIDTH_GRADES.find(g => entry.widthMm >= g.min && entry.widthMm < g.max);
                          return <Cell key={`cell-${index}`} fill={grade?.color || '#4f46e5'} opacity={0.8} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Distinction Card */}
              <div className="bg-bento-card border border-bento-border rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-bento-dim uppercase tracking-widest">核心逻辑区分</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-bento-success/10 border border-bento-success/20 rounded-lg">
                    <h4 className="text-[10px] font-bold text-bento-success uppercase mb-1">足形楦 (Anatomical)</h4>
                    <p className="text-[10px] leading-relaxed opacity-70">鞋楦形状模仿足部真实展开。大脚趾可直线伸出，彻底解决挤压。</p>
                  </div>
                  <div className="p-3 bg-bento-dim/10 border border-bento-border rounded-lg">
                    <h4 className="text-[10px] font-bold text-bento-dim uppercase mb-1">传统加宽 (Volume Wide)</h4>
                    <p className="text-[10px] leading-relaxed opacity-70">仅增加鞋面布料周长，鞋底形状依然收尖。脚趾空间提升有限。</p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-bento-border text-[10px] text-bento-dim">
                  * 测量标准：ISO 9407 / 前掌内衬实测
                </div>
              </div>

              {/* Data Table Card - Full Width Below */}
              <div className="md:col-span-4 bg-bento-card border border-bento-border rounded-2xl overflow-hidden p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                  <h3 className="text-xs font-bold text-bento-dim uppercase tracking-widest">实测数据深度明细表</h3>
                  <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bento-dim" size={14} />
                      <input 
                        type="text" 
                        placeholder="搜索品牌/系列..."
                        className="w-full pl-9 pr-4 py-2 bg-bento-bg border border-bento-border rounded-lg text-xs outline-none focus:border-bento-accent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select 
                      className="px-4 py-2 bg-bento-bg border border-bento-border rounded-lg text-xs outline-none cursor-pointer text-bento-dim"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as any)}
                    >
                      <option value="all">所有类别</option>
                      <option value="barefoot">赤足/简约</option>
                      <option value="athletic">专业运动</option>
                      <option value="casual">日常/休闲</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-[40px_1fr_1fr_100px_80px] gap-4 px-4 py-2 text-[10px] font-bold text-bento-dim uppercase tracking-widest border-b border-bento-border">
                    <div>#</div>
                    <div>品牌 / 系列</div>
                    <div>内宽 / 级别</div>
                    <div>鞋楦类型</div>
                    <div className="text-right">评级</div>
                  </div>
                  {filteredData.map((item, idx) => (
                    <div 
                      key={item.brand + item.series}
                      className="grid grid-cols-[40px_1fr_1fr_100px_80px] gap-4 px-4 py-3 items-center hover:bg-white/5 rounded-lg transition-colors border-b border-bento-border/50 last:border-0"
                    >
                      <div className="font-mono text-xs opacity-40">{idx + 1}</div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{item.brand}</span>
                        <span className="text-[10px] text-bento-dim truncate">{item.series}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-mono font-bold">{item.widthMm}mm</span>
                           <span className="text-[9px] opacity-60 uppercase tracking-tighter">({item.widthLevel.split(' ')[0]})</span>
                        </div>
                        <div className="h-1 w-full bg-bento-bg rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${(item.widthMm - 90) / (125 - 90) * 100}%`,
                              backgroundColor: WIDTH_GRADES.find(g => item.widthMm >= g.min && item.widthMm < g.max)?.color 
                            }} 
                          />
                        </div>
                      </div>
                      <div>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.fitType === 'anatomical' 
                            ? 'bg-bento-success/20 text-bento-success' 
                            : 'bg-bento-dim/20 text-bento-dim'
                        }`}>
                          {item.fitType === 'anatomical' ? '足形楦' : '加宽楦'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-bento-dim truncate">
                          {item.source.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'calculator' && (
            <motion.div 
              key="calculator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {/* Input & Measurement Guide Card */}
              <div className="md:col-span-2 bg-bento-card border border-bento-border rounded-2xl p-8 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-bold text-bento-dim uppercase tracking-widest">精准测量与输入</h3>
                  <Ruler size={16} className="text-bento-dim" />
                </div>
                
                <div className="space-y-8 flex-1">
                  <div className="relative group">
                    <input 
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck="false"
                      pattern="[0-9]*"
                      placeholder="输入毫米数值..."
                      className="w-full text-7xl p-6 bg-bento-bg border border-bento-border rounded-2xl font-bold focus:border-bento-accent outline-none transition-all placeholder:text-white/5"
                      value={footWidth}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setFootWidth(val);
                      }}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end">
                      <span className="text-xs font-bold text-bento-accent tracking-widest uppercase">毫米</span>
                      <span className="text-3xl font-mono text-bento-dim opacity-50">MM</span>
                    </div>
                  </div>

                  {/* Measurement Guide Diagram */}
                  <div className="bg-bento-bg border border-bento-border rounded-2xl p-6 relative overflow-hidden">
                    <h4 className="text-[10px] font-bold text-bento-accent uppercase mb-4 flex items-center gap-2">
                       <Info size={12} /> 如何正确测量？
                    </h4>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-32 h-32 shrink-0 bg-bento-card border border-bento-border rounded-xl flex items-center justify-center p-2 relative">
                        {/* Styled Foot SVG */}
                        <svg viewBox="0 0 100 100" className="w-full h-full text-bento-dim opacity-40">
                          <path fill="currentColor" d="M50 95c-15 0-25-10-25-25 0-5 2-10 5-15l5-10 2-20c1-5 5-10 13-10s12 5 13 10l2 20 5 10c3 5 5 10 5 15 0 15-10 25-25 25z" />
                          <circle cx="50" cy="15" r="5" fill="currentColor" />
                        </svg>
                        {/* Measurement Line */}
                        <div className="absolute top-[65%] left-[20%] right-[20%] h-0.5 bg-bento-accent">
                          <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-bento-accent" />
                          <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-bento-accent" />
                        </div>
                        <span className="absolute top-[70%] left-1/2 -translate-x-1/2 text-[8px] font-bold text-bento-accent whitespace-nowrap">此处最宽</span>
                      </div>
                      <div className="space-y-3 opacity-80">
                        <p className="text-[10px] leading-relaxed">
                          1️⃣ <span className="text-white">双脚着地</span>：站立时足部会因受重自然变宽。
                        </p>
                        <p className="text-[10px] leading-relaxed">
                          2️⃣ <span className="text-white">关键点</span>：测量大脚趾根部到小脚趾根部最宽的直线距离。
                        </p>
                        <p className="text-[10px] leading-relaxed text-bento-dim italic">
                          注意：左右脚宽度可能不同，请以<span className="text-bento-accent">宽的那只</span>为准。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setFootWidth('')}
                  className="mt-8 py-3 px-4 bg-bento-bg border border-bento-border rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={12} /> 重置测量数值
                </button>
              </div>

              {/* Assessment & Recommendation Card */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-bento-card border border-bento-border rounded-2xl p-8 overflow-hidden relative min-h-[300px]">
                  <h3 className="text-xs font-bold text-bento-dim uppercase tracking-widest mb-8">专家共识评估</h3>
                  {footEvaluation ? (
                    <div className="space-y-6">
                      <div className="flex items-end gap-3">
                        <h2 className="text-6xl font-black uppercase tracking-tighter" style={{ color: footEvaluation.color }}>
                          {footEvaluation.label.split(' ')[0]}
                        </h2>
                        <span className="text-xs font-mono text-bento-dim mb-2 uppercase">{footEvaluation.min}-{footEvaluation.max}mm 区间</span>
                      </div>
                      <div className="p-6 bg-bento-bg border border-bento-border rounded-2xl space-y-4">
                        <p className="text-sm font-medium leading-relaxed">
                          您的测量值为 <span className="text-white">{footWidth}mm</span>。
                          {footEvaluation.label.includes('窄楦') && "这属于标准到偏窄的范畴。您在选鞋上拥有绝对自由，Nike、On 或主流田径鞋款都能提供良好的包裹感。"}
                          {footEvaluation.label.includes('标准') && "属于最常见的标准脚型。长距离运动建议选择 NB 或 Brooks 的 2E 版本，以应对足部充血导致的肿胀。"}
                          {footEvaluation.label.includes('宽楦') && "您已经跨入真正的宽脚范畴。普通 D 楦会产生明显的挤压痛，强烈建议转向足形楦品牌或专业 4E 版本。"}
                          {footEvaluation.label.includes('加宽') && "极具挑战性的宽度。绝大多数市售运动鞋都会失效，建议从赤足系或品牌顶级宽楦（如 Altra Original Fit）中挑选。"}
                          {footEvaluation.label.includes('极宽') && "医生级别的超宽阈值。目前仅发现个别捷克或德国品牌能完美适配，建议优先考虑 Realfoot 或 Joe Nimble。"}
                        </p>
                        <div className="pt-4 border-t border-bento-border/50">
                          <h5 className="text-[10px] font-bold text-bento-accent uppercase mb-2">避坑建议：</h5>
                          <p className="text-[10px] text-bento-dim leading-relaxed">
                            ⚠️ {(parseFloat(footWidth) > 100) ? "避开 Nike Pegagus 或 Adidas Boston 系列，哪怕是所谓的 Wide 版，它们依然采用收尖鞋头，无法让脚趾自然展开。" : "您的脚型非常宽容，可以尝试大部分风格。"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 border border-dashed border-bento-border rounded-2xl flex flex-col items-center justify-center text-bento-dim/30">
                      <Calculator size={32} />
                      <span className="text-[10px] font-bold uppercase mt-2">等待输入扫描数据</span>
                    </div>
                  )}
                </div>

                {/* Specific Recommendations Gallery */}
                <AnimatePresence>
                  {footEvaluation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-bento-card border border-bento-border rounded-2xl p-6"
                    >
                      <h3 className="text-xs font-bold text-bento-dim uppercase tracking-widest mb-4">为您定制的精品鞋款</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {shoeWidthData
                          .filter(item => {
                            const width = parseFloat(footWidth);
                            // Recommend shoes that are slightly wider or close to foot width
                            return item.widthMm >= width && item.widthMm <= width + 8;
                          })
                          .sort((a, b) => a.widthMm - b.widthMm)
                          .slice(0, 2)
                          .map(shoe => (
                            <div key={shoe.brand + shoe.series} className="group cursor-pointer">
                              <div className="aspect-[4/3] bg-bento-bg rounded-xl mb-3 overflow-hidden border border-bento-border group-hover:border-bento-accent transition-colors flex items-center justify-center relative">
                                {failedImages[`${shoe.brand}-${shoe.series}`] === 3 ? (
                                  <div className="flex flex-col items-center justify-center opacity-20 transform -rotate-12">
                                    <Footprints size={64} />
                                    <span className="text-[8px] font-bold mt-2 uppercase tracking-tighter text-center">Image Unavailable</span>
                                  </div>
                                ) : (
                                  <img 
                                    src={shoe.imageUrl} 
                                    data-original={shoe.imageUrl.split('url=')[1] || shoe.imageUrl}
                                    alt={shoe.brand}
                                    referrerPolicy="no-referrer"
                                    onError={(e) => handleImageError(`${shoe.brand}-${shoe.series}`, e)}
                                    className="w-full h-full object-contain p-2 opacity-90 group-hover:opacity-100 transition-opacity"
                                  />
                                )}
                              </div>
                              <h4 className="text-xs font-bold truncate">{shoe.brand}</h4>
                              <p className="text-[9px] text-bento-dim truncate">{shoe.series}</p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-[9px] px-1.5 py-0.5 bg-bento-accent/10 text-bento-accent rounded font-bold uppercase">内宽 {shoe.widthMm}mm</span>
                                <ArrowRight size={10} className="text-bento-dim group-hover:text-bento-accent" />
                              </div>
                            </div>
                          ))
                        }
                        {shoeWidthData.filter(item => {
                            const width = parseFloat(footWidth);
                            return item.widthMm >= width && item.widthMm <= width + 8;
                        }).length === 0 && (
                          <div className="col-span-2 text-center py-8 opacity-40">
                            <AlertTriangle size={24} className="mx-auto mb-2" />
                            <p className="text-[10px] font-bold uppercase">暂无精准匹配鞋款，建议查看本站榜单</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tips Grid Recap */}
              <div className="md:col-span-4 bg-gradient-to-r from-bento-accent/20 to-transparent border border-bento-accent/30 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="shrink-0">
                    <CheckCircle2 size={48} className="text-bento-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">为什么你的 4E 依然挤脚？</h3>
                    <p className="text-xs text-bento-dim leading-relaxed max-w-3xl">
                      大多数专业运动品牌（NB/Brooks 除外）的加宽版只是通过增加鞋面布料来增大“容积”，但鞋底的<b>模具 (Last)</b> 依然是尖头形状。
                      这意味着脚趾依然会被迫向内挤压。本榜单优先推荐那些<b>“解剖学足形楦 (Anatomical Last)”</b>品牌，这类品牌哪怕宽度数值稍低，
                      由于鞋头形状是方型的，其实际穿着体验也会比圆尖头的 4E 更加舒适。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-12 px-6 border-t border-bento-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-bento-dim">
          <div className="flex items-center gap-3">
            <h5 className="font-bold text-lg text-white">宽足数据实验室</h5>
            <span className="text-[10px] font-bold bg-white/5 px-2 py-1 border border-bento-border">BROADFOOT v2.2.0</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
             <span>足形楦优先</span>
             <span>定量实测</span>
             <span>科学选鞋</span>
          </div>
          <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
            &copy; 2026 BROADFOOT ANALYTICS CHINA
          </p>
        </div>
      </footer>
    </div>
  );
}
