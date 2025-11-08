import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://dietacademy.jp/members/movies-senior/';

const videoLecturesData = [
    {
        id: 'mov-s-1',
        title: '第一章「運動療法の進め方」',
        thumbnail: `${BASE_URL}img/thum-s-1.jpg`,
        videoSrc: `${BASE_URL}contents/mov/01.mp4`,
        topics: ['やせるための運動　まず「歩く」(1)', '事前のメディカルチェック', '運動に何を期待するか？', 'やせるための運動　まず「歩く」(2)', 'いつでも、どこでも、1人でも', '楽しく続けて一日一万歩をめざそう', '1万歩を達成できたら20〜30分のノンストップ歩行', '運動不足の解消に', '筋肉を引き締めるレジスタンス運動', 'テレビを見ながらCM体操', '赤筋（せっきん）と白筋（はっきん）とは？', '筋トレで腕が太くなる？', '筋トレをすればやせる？', '運動と体脂肪と骨と筋肉の関係', '有酸素運動とレジスタンス運動の関係', 'ストレッチング', 'ながら運動はおすすめ！', '動く習慣の習得']
    },
    {
        id: 'mov-s-2',
        title: '第二章「リバウンドの予防と対応」',
        thumbnail: `${BASE_URL}img/thum-s-2.jpg`,
        videoSrc: `${BASE_URL}contents/mov/02.mp4`,
        topics: ['リバウンドの予防と対応', 'エネルギー収支を赤字にするには', '太りにくい体質に変えていく', '成功する減量曲線は、階段のようなライン', '体重が減らなくなってから', 'ウエイトサイクリングの危険性', 'ウエイトサイクリングを誘発する要因', 'リバウンドをなくすには']
    },
    {
        id: 'mov-s-3',
        title: '第三章「摂食障害」',
        thumbnail: `${BASE_URL}img/thum-s-3.jpg`,
        videoSrc: `${BASE_URL}contents/mov/03.mp4`,
        topics: ['「摂食障害」', '拒食症 Anorexia Nervosa : AN', '過食症 Bulimia Nervosa : BN', '特定不能の摂食障害', '摂食障害の自己診断', '摂食障害の原因', '美への憧れとダイエット', 'スポーツ摂食障害', '摂食障害の治療', '日常生活での対処法', 'さまざまな治療法-再養育療法', 'さまざまな治療法-内観療法', 'さまざまな治療法-認知行動療法', 'さまざまな治療法-家族療法', '身体と心の関係を大切に…']
    },
    {
        id: 'mov-s-4',
        title: '第四章「アルコール依存症」',
        thumbnail: `${BASE_URL}img/thum-s-4.jpg`,
        videoSrc: `${BASE_URL}contents/mov/04.mp4`,
        topics: ['様々な臓器故障', 'アルコール依存症', '適度な飲酒量(1)', '適度な飲酒量(2)']
    },
    {
        id: 'mov-s-5',
        title: '第五章「オキナワ26ショック」',
        thumbnail: `${BASE_URL}img/thum-s-5.jpg`,
        videoSrc: `${BASE_URL}contents/mov/05.mp4`,
        topics: ['オキナワ26ショック', '全国平均を下回る寿命(1)', '全国平均を下回る寿命(2)', '１キロ歩いたことがない', '豆腐と昆布と豚肉', '元凶はアメリカナイズ', '油の量も多い', '泡盛も危険']
    },
    {
        id: 'mov-s-6-1',
        title: '第六章「ダイエットマスター」として」（1）',
        thumbnail: `${BASE_URL}img/thum-s-6-1.jpg`,
        videoSrc: `${BASE_URL}contents/mov/06-01.mp4`,
        topics: ['「ダイエットマスターとして」', 'メタボリック・シンドローム(代謝症候群）', 'からだが錆びるのを防ぐライフスタイル', '活性酸素による老化を防ぐ', '抗酸化物質の上手なとり方', 'タバコは百害あって一利無し', 'ニコチン依存に注意！']
    },
    {
        id: 'mov-s-6-2',
        title: '第六章「ダイエットマスター」として」（2）',
        thumbnail: `${BASE_URL}img/thum-s-6-2.jpg`,
        videoSrc: `${BASE_URL}contents/mov/06-02.mp4`,
        topics: ['理想的な食と酒', '赤ワインなら　からだによい?', '緑茶パワーは健康の源', 'アメリカ人も認めた大豆パワー', '納豆・豆腐はやっぱりおすすめ！', '『おふくろの味』をダイエットに', '正しい糖質の摂り方', '理想的な食と酒', '赤ワインなら　からだによい?', '緑茶パワーは健康の源', 'アメリカ人も認めた大豆パワー']
    },
    {
        id: 'mov-s-6-3',
        title: '第六章「ダイエットマスター」として」（3）',
        thumbnail: `${BASE_URL}img/thum-s-6-3.jpg`,
        videoSrc: `${BASE_URL}contents/mov/06-03.mp4`,
        topics: ['モナリザ（=MONALISA）症候群', '自分を抑える力を身につける', '無意識にしている生活習慣', '食べすぎになりやすい食環境を見直す', '「三多」をつねに心に留めて', 'ダイエットマスターとしてのこれから', 'モナリザ（=MONALISA）症候群', '自分を抑える力を身につける', '無意識にしている生活習慣', '食べすぎになりやすい食環境を見直す', '「三多」をつねに心に留めて']
    },
];

type Video = typeof videoLecturesData[0];

const StreamingHeader: React.FC = () => (
    <header className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="w-full max-w-screen-xl mx-auto px-6 py-5 flex justify-between items-center">
             <h1 className="text-3xl font-bold tracking-wider text-white uppercase" style={{ textShadow: '0 2px 5px rgba(0,0,0,0.6)' }}>
                Members Area
            </h1>
            <Link to="/members" className="flex items-center text-slate-300 hover:text-white transition-colors text-sm font-semibold bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <i className="fas fa-arrow-left-long mr-2"></i>
                <span>メンバーエリアに戻る</span>
            </Link>
        </div>
    </header>
);

const HeroSection: React.FC<{ video: Video; onPlay: (video: Video) => void; }> = ({ video, onPlay }) => (
    <div className="relative h-[60vh] min-h-[400px] md:h-[70vh] w-full flex items-end text-white animate-fade-in">
        <div className="absolute inset-0 overflow-hidden">
             <img src="https://i.postimg.cc/4xHt1wzm/bgstream.png" alt="" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="relative w-full max-w-screen-xl mx-auto px-6 pb-12 md:pb-20">
            <div className="max-w-xl">
                <p className="text-rose-300 font-semibold tracking-wider">注目の講義</p>
                <h2 className="text-4xl md:text-6xl font-extrabold my-3" style={{ textShadow: '0 3px 6px rgba(0,0,0,0.5)' }}>
                    {video.title}
                </h2>
                <p className="text-slate-300 text-base md:text-lg line-clamp-3">
                    {video.topics.slice(0, 3).join(' / ')}
                </p>
                <button
                    onClick={() => onPlay(video)}
                    className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-white text-slate-900 font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-white/50 transform hover:scale-105"
                >
                    <i className="fas fa-play mr-3"></i>
                    <span>今すぐ再生</span>
                </button>
            </div>
        </div>
    </div>
);

const ThumbnailCard: React.FC<{ video: Video; onSelect: (video: Video) => void; }> = ({ video, onSelect }) => (
    <div
        className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 focus-within:-translate-y-1.5"
        onClick={() => onSelect(video)}
        onKeyUp={(e) => e.key === 'Enter' && onSelect(video)}
        tabIndex={0}
        role="button"
        aria-label={`講義を再生: ${video.title}`}
    >
        <div className="relative bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-800 group-hover:border-rose-400/50 transition-all duration-300">
            <img src={video.thumbnail} alt={video.title} className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <i className="fas fa-play"></i>
                </div>
            </div>
        </div>
        <div className="mt-3 px-1">
            <h3 className="font-semibold text-slate-300 group-hover:text-white transition-colors text-base truncate">{video.title}</h3>
        </div>
    </div>
);


const PlayerView: React.FC<{ video: Video; onClose: () => void }> = ({ video, onClose }) => (
     <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-6 animate-fade-in">
        <div className="absolute inset-0 overflow-hidden z-0">
             <img src={video.thumbnail} alt="" className="w-full h-full object-cover scale-110 blur-xl brightness-50" />
             <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative z-10 w-full max-w-screen-xl mx-auto">
            <button onClick={onClose} className="mb-6 flex items-center text-slate-300 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <i className="fas fa-arrow-left mr-3"></i>
                <span className="font-semibold">すべての講義に戻る</span>
            </button>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-[65%] flex-shrink-0">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700">
                        <video key={video.videoSrc} className="w-full h-full" controls autoPlay preload="auto">
                            <source src={video.videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className="lg:w-[35%] bg-black/20 backdrop-blur-md p-6 rounded-xl border border-slate-800 max-h-[70vh] overflow-y-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">{video.title}</h2>
                    <h3 className="font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">この講義のトピック</h3>
                    <ul className="space-y-2.5 text-slate-400">
                        {video.topics.map((topic, index) => (
                            <li key={index} className="flex items-start">
                                <i className="fas fa-circle-play text-rose-400/70 mr-3 mt-1 flex-shrink-0"></i>
                                <span>{topic}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const StreamingFooter: React.FC = () => (
    <footer className="w-full text-center text-xs text-slate-500 py-8">
        <p>&copy; Nihon Diet Academy,Inc. All rights reserved.</p>
    </footer>
);

export const SeniorVideoLecturesPage: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const featuredVideo = videoLecturesData[0];
    const otherVideos = videoLecturesData.slice(0);

    if (selectedVideo) {
        return <PlayerView video={selectedVideo} onClose={() => setSelectedVideo(null)} />;
    }

    return (
        <div className="bg-slate-900 text-white min-h-screen relative">
            <StreamingHeader />
            <main>
                <HeroSection video={featuredVideo} onPlay={setSelectedVideo} />
                <div className="w-full max-w-screen-xl mx-auto p-6 mt-8">
                    <h2 className="text-3xl font-bold text-white mb-6">すべての講義</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                        {otherVideos.map((video) => (
                            <ThumbnailCard key={video.id} video={video} onSelect={setSelectedVideo} />
                        ))}
                    </div>
                </div>
            </main>
            <StreamingFooter />
        </div>
    );
};
