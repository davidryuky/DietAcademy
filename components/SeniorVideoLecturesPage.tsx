import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageContentLayout } from './PageContentLayout';
import { AnimatedSection } from './AnimatedSection';


const PAGE_BASE_URL = 'https://dietacademy.jp/members/movies-senior/';
const VIDEO_BASE_URL = 'https://dietacademy.jp/members/movies-senior/contents/mov/';

const videoLecturesData = [
    {
        id: 'mov-s-1',
        title: '第一章「運動療法の進め方」',
        thumbnail: `${PAGE_BASE_URL}img/thum-s-1.jpg`,
        videoSrc: `${VIDEO_BASE_URL}01.mp4`,
        topics: ['やせるための運動　まず「歩く」(1)', '事前のメディカルチェック', '運動に何を期待するか？', 'やせるための運動　まず「歩く」(2)', 'いつでも、どこでも、1人でも', '楽しく続けて一日一万歩をめざそう', '1万歩を達成できたら20〜30分のノンストップ歩行', '運動不足の解消に', '筋肉を引き締めるレジスタンス運動', 'テレビを見ながらCM体操', '赤筋（せっきん）と白筋（はっきん）とは？', '筋トレで腕が太くなる？', '筋トレをすればやせる？', '運動と体脂肪と骨と筋肉の関係', '有酸素運動とレジスタンス運動の関係', 'ストレッチング', 'ながら運動はおすすめ！', '動く習慣の習得']
    },
    {
        id: 'mov-s-2',
        title: '第二章「リバウンドの予防と対応」',
        thumbnail: `${PAGE_BASE_URL}img/thum-s-2.jpg`,
        videoSrc: `${VIDEO_BASE_URL}02.mp4`,
        topics: ['リバウンドの予防と対応', 'エネルギー収支を赤字にするには', '太りにくい体質に変えていく', '成功する減量曲線は、階段のようなライン', '体重が減らなくなってから', 'ウエイトサイクリングの危険性', 'ウエイトサイクリングを誘発する要因', 'リバウンドをなくすには']
    },
    {
        id: 'mov-s-3',
        title: '第三章「摂食障害」',
        thumbnail: `${PAGE_BASE_URL}img/thum-s-3.jpg`,
        videoSrc: `${VIDEO_BASE_URL}03.mp4`,
        topics: ['「摂食障害」', '拒食症 Anorexia Nervosa : AN', '過食症 Bulimia Nervosa : BN', '特定不能の摂食障害', '摂食障害の自己診断', '摂食障害の原因', '美への憧れとダイエット', 'スポーツ摂食障害', '摂食障害の治療', '日常生活での対処法', 'さまざまな治療法-再養育療法', 'さまざまな治療法-内観療法', 'さまざまな治療法-認知行動療法', 'さまざまな治療法-家族療法', '身体と心の関係を大切に…']
    },
    {
        id: 'mov-s-4',
        title: '第四章「アルコール依存症」',
        thumbnail: `${PAGE_BASE_URL}img/thum-s-4.jpg`,
        videoSrc: `${VIDEO_BASE_URL}04.mp4`,
        topics: ['様々な臓器故障', 'アルコール依存症', '適度な飲酒量(1)', '適度な飲酒量(2)']
    },
    {
        id: 'mov-s-5',
        title: '第五章「オキナワ26ショック」',
        thumbnail: `${PAGE_BASE_URL}img/thum-s-5.jpg`,
        videoSrc: `${VIDEO_BASE_URL}05.mp4`,
        topics: ['オキナワ26ショック', '全国平均を下回る寿命(1)', '全国平均を下回る寿命(2)', '１キロ歩いたことがない', '豆腐と昆布と豚肉', '元凶はアメリカナイズ', '油の量も多い', '泡盛も危険']
    },
    {
        id: 'mov-s-6-1',
        title: '第六章「ダイエットマスター」として」（1）',
        thumbnail: `${PAGE_BASE_URL}img/thum-s-6-1.jpg`,
        videoSrc: `${VIDEO_BASE_URL}06-01.mp4`,
        topics: ['「ダイエットマスターとして」', 'メタボリック・シンドローム(代謝症候群）', 'からだが錆びるのを防ぐライフスタイル', '活性酸素による老化を防ぐ', '抗酸化物質の上手なとり方', 'タバコは百害あって一利無し', 'ニコチン依存に注意！']
    },
    {
        id: 'mov-s-6-2',
        title: '第六章「ダイエットマスター」として」（2）',
        thumbnail: `${PAGE_BASE_URL}img/thum-s-6-2.jpg`,
        videoSrc: `${VIDEO_BASE_URL}06-02.mp4`,
        topics: ['理想的な食と酒', '赤ワインなら　からだによい?', '緑茶パワーは健康の源', 'アメリカ人も認めた大豆パワー', '納豆・豆腐はやっぱりおすすめ！', '『おふくろの味』をダイエットに', '正しい糖質の摂り方', '理想的な食と酒', '赤ワインなら　からだによい?', '緑茶パワーは健康の源', 'アメリカ人も認めた大豆パワー']
    },
    {
        id: 'mov-s-6-3',
        title: '第六章「ダイエットマスター」として」（3）',
        thumbnail: `${PAGE_BASE_URL}img/thum-s-6-3.jpg`,
        videoSrc: `${VIDEO_BASE_URL}06-03.mp4`,
        topics: ['モナリザ（=MONALISA）症候群', '自分を抑える力を身につける', '無意識にしている生活習慣', '食べすぎになりやすい食環境を見直す', '「三多」をつねに心に留めて', 'ダイエットマスターとしてのこれから', 'モナリザ（=MONALISA）症候群', '自分を抑える力を身につける', '無意識にしている生活習慣', '食べすぎになりやすい食環境を見直す', '「三多」をつねに心に留めて']
    },
];

type Video = typeof videoLecturesData[0];


const PlayerView: React.FC<{ video: Video; onClose: () => void }> = ({ video, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const saveProgress = () => {
        if (videoRef.current) {
            const { currentTime, duration } = videoRef.current;
            if (duration) {
                localStorage.setItem(`video-progress-${video.id}`, JSON.stringify({ currentTime, duration }));
            }
        }
    };

    const handleLoadedMetadata = () => {
        const savedProgressRaw = localStorage.getItem(`video-progress-${video.id}`);
        if (savedProgressRaw && videoRef.current) {
            const savedProgress = JSON.parse(savedProgressRaw);
            // Ensure we don't try to seek past the end of the video
            if (savedProgress.currentTime < savedProgress.duration) {
                videoRef.current.currentTime = savedProgress.currentTime;
            }
        }
    };

    return (
         <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-lg flex items-center justify-center p-4 md:p-6 animate-fade-in">
            <div className="relative z-10 w-full max-w-screen-xl mx-auto">
                <div className="flex justify-end mb-4">
                    <button onClick={onClose} className="flex items-center text-slate-300 hover:text-white transition-colors bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        <i className="fas fa-times mr-2"></i>
                        <span className="font-semibold text-sm">プレーヤーを閉じる</span>
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-[65%] flex-shrink-0">
                        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700">
                            <video
                                ref={videoRef}
                                key={video.videoSrc}
                                className="w-full h-full"
                                controls
                                autoPlay
                                preload="auto"
                                onTimeUpdate={saveProgress}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={saveProgress}
                            >
                                <source src={video.videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="lg:w-[35%] bg-black/20 backdrop-blur-md p-6 rounded-xl border border-slate-800 max-h-[70vh] overflow-y-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">{video.title}</h2>
                        <h3 className="font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">この講義のトピック</h3>
                        <ol className="space-y-2.5 text-slate-400 list-decimal list-inside marker:text-rose-400/80 marker:font-semibold">
                            {video.topics.map((topic, index) => (
                                <li key={index}>{topic}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VideoListItem: React.FC<{ video: Video, onSelect: (video: Video) => void }> = ({ video, onSelect }) => {
    const savedProgressRaw = localStorage.getItem(`video-progress-${video.id}`);
    let progressPercentage = 0;
    let isCompleted = false;

    if (savedProgressRaw) {
        const savedProgress = JSON.parse(savedProgressRaw);
        if (savedProgress.duration > 0) {
            const percentage = Math.floor((savedProgress.currentTime / savedProgress.duration) * 100);
            if (percentage >= 95) {
                isCompleted = true;
                progressPercentage = 100;
            } else {
                progressPercentage = percentage;
            }
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden flex flex-col md:flex-row items-stretch group transition-shadow duration-300 hover:shadow-lg">
            <div className="md:w-1/3 lg:w-1/4 flex-shrink-0 bg-slate-100">
                <button onClick={() => onSelect(video)} className="block w-full h-full relative overflow-hidden group">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-contain transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl">
                            <i className="fas fa-play"></i>
                        </div>
                    </div>
                </button>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 transition-colors group-hover:text-rose-600">{video.title}</h3>
                <div className="text-sm text-slate-700 space-y-2 flex-grow">
                    <p className="font-semibold text-slate-800">主なトピック:</p>
                    <ol className="list-decimal list-inside space-y-1 md:columns-2 md:gap-x-6 marker:text-rose-500 marker:font-semibold">
                        {video.topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ol>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                     <button
                        onClick={() => onSelect(video)}
                        className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-base rounded-md shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 transform hover:-translate-y-0.5"
                    >
                        <i className={`fas ${isCompleted || progressPercentage > 0 ? 'fa-play-circle' : 'fa-play'} mr-2`}></i>
                        {isCompleted ? 'もう一度見る' : progressPercentage > 0 ? '続きを読む' : '講義を再生'}
                    </button>
                    {progressPercentage > 0 && (
                        <div className="flex-grow flex items-center gap-3">
                             <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-rose-500 h-2.5 rounded-full" style={{width: `${progressPercentage}%`}}></div>
                            </div>
                            {isCompleted ? (
                                 <span className="text-sm font-bold text-emerald-600 whitespace-nowrap">
                                    <i className="fas fa-check-circle mr-1.5"></i>
                                    完了
                                </span>
                            ) : (
                                <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">{progressPercentage}%</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export const SeniorVideoLecturesPage: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handlePlayerClose = () => {
        setSelectedVideo(null);
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <>
            <PageContentLayout>
                 <AnimatedSection>
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-extrabold text-slate-800">上級編 動画講義</h1>
                        <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
                           より専門的な知識を深め、ダイエット指導のプロフェッショナルを目指すための講義です。
                        </p>
                    </div>
                </AnimatedSection>
                <div className="space-y-6">
                    {videoLecturesData.map((video) => (
                        <AnimatedSection key={`${video.id}-${refreshKey}`}>
                           <VideoListItem video={video} onSelect={setSelectedVideo} />
                        </AnimatedSection>
                    ))}
                </div>
            </PageContentLayout>

            {selectedVideo && <PlayerView video={selectedVideo} onClose={handlePlayerClose} />}
        </>
    );
};