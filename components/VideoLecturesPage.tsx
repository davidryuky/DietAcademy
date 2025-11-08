import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://dietacademy.jp/members/movies-regular/';

const videoLecturesData = [
    {
        id: 'mov-r-0',
        title: 'はじめに',
        thumbnail: `${BASE_URL}img/thum-r-0.jpg`,
        videoSrc: `${BASE_URL}contents/mov/00.mp4`,
        topics: ['ダイエット = 痩せること？', '正しいダイエットで、身も心も健康になる！', '一日にどのくらい運動しますか？', '一日にどのくらい食べますか？', 'まとめ（1）', 'まとめ（2）']
    },
    {
        id: 'mov-r-1',
        title: '第一章「新陳代謝について」',
        thumbnail: `${BASE_URL}img/thum-r-1.jpg`,
        videoSrc: `${BASE_URL}contents/mov/01.mp4`,
        topics: ['新陳代謝を知っていますか？', 'ダイエットの目安が３ヶ月の理由', '自分自身を知る（1）', '体組成計を使って自分の体内を確認しましょう', '肥満は「身長のわりに体重が重すぎる状態」ではありません！', 'かた太りとかくれ肥満', 'どんなダイエットの種類があるの？', 'Let\'s Do the ヘルシーダイエット']
    },
    {
        id: 'mov-r-2',
        title: '第ニ章「自分を知ること」',
        thumbnail: `${BASE_URL}img/thum-r-2.jpg`,
        videoSrc: `${BASE_URL}contents/mov/02.mp4`,
        topics: ['自分を知ること', 'あなたがなりたい自分はどんな自分ですか？', '行き過ぎた「やせ願望」', '自分自身を知る（2）', '食事日記・生活活動日記', '記録の目的は己を知ること', '腹囲チェック', '内臓周囲の脂肪は「生活習慣病」に注意！', '内臓脂肪や体筋肉量もチェック', '記録は少なくとも１ヶ月はつけましょう', '「太ってきた」サインに気付くことは早期予防のポイント', '肥満の認識', 'ライフスタイルチェック', 'ダイエットの基本は「自分を見つめ直す」こと']
    },
    {
        id: 'mov-r-3',
        title: '第三章「生活習慣病」',
        thumbnail: `${BASE_URL}img/thum-r-3.jpg`,
        videoSrc: `${BASE_URL}contents/mov/03.mp4`,
        topics: ['生活習慣病', '健全なライフスタイルを身につけること', '糖尿病（1）', '糖尿病（2）', '高血圧（1）', '高血圧（2）', '高脂血症', '高脂血症の治療', '動脈硬化', '狭心症・心筋梗塞', '高尿酸血症', '脂肪肝', '肥満が原因になっている生活習慣病', 'がん', '飢餓のころ…']
    },
    {
        id: 'mov-r-4',
        title: '第四章「減量方法を知る」',
        thumbnail: `${BASE_URL}img/thum-r-4.jpg`,
        videoSrc: `${BASE_URL}contents/mov/04.mp4`,
        topics: ['減量方法を知る', '間違った減量をしないために', 'SOSサインが出る前に…', '意外に気づけない自分自身のメンタルバランス', '話題のダイエットここが間違い', '腹筋体操、テープ、ベルトで部分やせ？', 'あなたのからだに入れていくものだから', '低インリンダイエットの効果', 'やせ薬には やみ薬やニセ薬が多い', '減量治療指導の進め方の概略', '減量（治療）計画の立て方', '脂肪細胞が増える肥満とふくらむ肥満との関係', '中年太りこそ、減量のしがいがある？', 'ob遺伝子とやせホルモン「レプチン？！」', '自分のベスト体重']
    },
    {
        id: 'mov-r-5',
        title: '第五章「行動修正療法とは」',
        thumbnail: `${BASE_URL}img/thum-r-5.jpg`,
        videoSrc: `${BASE_URL}contents/mov/05.mp4`,
        topics: ['行動修正療法とは', '01・02・03・04タイプ', '05・09・10・12・13タイプ', '01・02・05・11・13タイプ', '01・02・03タイプ', '01・02・03タイプ', '01・05・06・07タイプ', '04タイプ', '05・10・13タイプ', '02・05・08・09・11・13タイプ', '04・08・09タイプ', '10・12タイプ', '13タイプ', 'ダイエットとは、良い印象を与えるテーブルマナーを身につけることである', '行動修正療法とは…自分の生活習慣を知り太りにくいライフスタイルをつくりあげていくものです']
    },
    {
        id: 'mov-r-6',
        title: '第六章「実践的ヘルシーダイエット」',
        thumbnail: `${BASE_URL}img/thum-r-6.jpg`,
        videoSrc: `${BASE_URL}contents/mov/06.mp4`,
        topics: ['実践的ヘルシーダイエット', 'いきいきダイエットのための栄養学', '主食のとりかた 複合糖質からとるポイント', '糖尿病食は手軽なモデルメニュー', '食品群早見表', 'コレステロールの減らし方', 'コレステロールより「隠れた脂肪」に要注意', 'どんなふうに脂質を摂るのか', 'リノール酸はからだによい？', 'オリーブ油（オイル）に注目！', '青い背の魚をもっともっと食べよう', '油を使う料理のエネルギーの抑え方', 'エネルギーを抑える食品・料理・献立', 'もの足りなさを感じさせない料理術', '簡単にできる朝食で　食事抜きを防ぐ', '夜食を食べたい時の段階別対策', '酒とつまみのとりかた', '新しい自分を開拓していく']
    },
];

type Video = typeof videoLecturesData[0];

const StreamingBackground: React.FC = () => (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
        <img 
            src="https://i.postimg.cc/4xHt1wzm/bgstream.png" 
            alt="" 
            className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
    </div>
);

const StreamingHeader: React.FC = () => (
    <header className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="w-full max-w-screen-xl mx-auto px-6 py-5 flex justify-between items-center">
             <h1 className="text-3xl font-bold tracking-wider text-white uppercase" style={{ textShadow: '0 2px 5px rgba(0,0,0,0.6)' }}>
                DietAcademy<span className="text-rose-400 font-black">Flix</span>
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
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
        <StreamingBackground />
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

export const VideoLecturesPage: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const featuredVideo = videoLecturesData[0];
    const otherVideos = videoLecturesData.slice(0);

    if (selectedVideo) {
        return <PlayerView video={selectedVideo} onClose={() => setSelectedVideo(null)} />;
    }

    return (
        <div className="relative text-white min-h-screen">
            <StreamingBackground />
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