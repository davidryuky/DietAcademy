import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const BASE_URL = 'https://dietacademy.jp/members/movies-regular/';

const videoLecturesData = [
    {
        id: 'mov-r-0',
        title: 'はじめに',
        thumbnail: `${BASE_URL}img/thum-r-0.jpg`,
        videoSrc: `${BASE_URL}contents/mov/00.mp4`,
        topics: [
            'ダイエット = 痩せること？',
            '正しいダイエットで、身も心も健康になる！',
            '一日にどのくらい運動しますか？',
            '一日にどのくらい食べますか？',
            'まとめ（1）',
            'まとめ（2）',
        ]
    },
    {
        id: 'mov-r-1',
        title: '第一章「新陳代謝について」',
        thumbnail: `${BASE_URL}img/thum-r-1.jpg`,
        videoSrc: `${BASE_URL}contents/mov/01.mp4`,
        topics: [
            '新陳代謝を知っていますか？',
            'ダイエットの目安が３ヶ月の理由',
            '自分自身を知る（1）',
            '体組成計を使って自分の体内を確認しましょう',
            '肥満は「身長のわりに体重が重すぎる状態」ではありません！',
            'かた太りとかくれ肥満',
            'どんなダイエットの種類があるの？',
            'Let\'s Do the ヘルシーダイエット',
        ]
    },
    {
        id: 'mov-r-2',
        title: '第ニ章「自分を知ること」',
        thumbnail: `${BASE_URL}img/thum-r-2.jpg`,
        videoSrc: `${BASE_URL}contents/mov/02.mp4`,
        topics: [
            '自分を知ること', 'あなたがなりたい自分はどんな自分ですか？', '行き過ぎた「やせ願望」', '自分自身を知る（2）', '食事日記・生活活動日記', '記録の目的は己を知ること', '腹囲チェック', '内臓周囲の脂肪は「生活習慣病」に注意！', '内臓脂肪や体筋肉量もチェック', '記録は少なくとも１ヶ月はつけましょう', '「太ってきた」サインに気付くことは早期予防のポイント', '肥満の認識', 'ライフスタイルチェック', 'ダイエットの基本は「自分を見つめ直す」こと',
        ]
    },
    {
        id: 'mov-r-3',
        title: '第三章「生活習慣病」',
        thumbnail: `${BASE_URL}img/thum-r-3.jpg`,
        videoSrc: `${BASE_URL}contents/mov/03.mp4`,
        topics: [
            '生活習慣病', '健全なライフスタイルを身につけること', '糖尿病（1）', '糖尿病（2）', '高血圧（1）', '高血圧（2）', '高脂血症', '高脂血症の治療', '動脈硬化', '狭心症・心筋梗塞', '高尿酸血症', '脂肪肝', '肥満が原因になっている生活習慣病', 'がん', '飢餓のころ…',
        ]
    },
    {
        id: 'mov-r-4',
        title: '第四章「減量方法を知る」',
        thumbnail: `${BASE_URL}img/thum-r-4.jpg`,
        videoSrc: `${BASE_URL}contents/mov/04.mp4`,
        topics: [
            '減量方法を知る', '間違った減量をしないために', 'SOSサインが出る前に…', '意外に気づけない自分自身のメンタルバランス', '話題のダイエットここが間違い', '腹筋体操、テープ、ベルトで部分やせ？', 'あなたのからだに入れていくものだから', '低インスリンダイエットの効果', 'やせ薬には やみ薬やニセ薬が多い', '減量治療指導の進め方の概略', '減量（治療）計画の立て方', '脂肪細胞が増える肥満とふくらむ肥満との関係', '中年太りこそ、減量のしがいがある？', 'ob遺伝子とやせホルモン「レプチン？！」', '自分のベスト体重',
        ]
    },
    {
        id: 'mov-r-5',
        title: '第五章「行動修正療法とは」',
        thumbnail: `${BASE_URL}img/thum-r-5.jpg`,
        videoSrc: `${BASE_URL}contents/mov/05.mp4`,
        topics: [
            '行動修正療法とは', '01・02・03・04タイプ', '05・09・10・12・13タイプ', '01・02・05・11・13タイプ', '01・02・03タイプ', '01・02・03タイプ', '01・05・06・07タイプ', '04タイプ', '05・10・13タイプ', '02・05・08・09・11・13タイプ', '04・08・09タイプ', '10・12タイプ', '13タイプ', 'ダイエットとは、良い印象を与えるテーブルマナーを身につけることである', '行動修正療法とは…自分の生活習慣を知り太りにくいライフスタイルをつくりあげていくものです',
        ]
    },
    {
        id: 'mov-r-6',
        title: '第六章「実践的ヘルシーダイエット」',
        thumbnail: `${BASE_URL}img/thum-r-6.jpg`,
        videoSrc: `${BASE_URL}contents/mov/06.mp4`,
        topics: [
            '実践的ヘルシーダイエット', 'いきいきダイエットのための栄養学', '主食のとりかた 複合糖質からとるポイント', '糖尿病食は手軽なモデルメニュー', '食品群早見表', 'コレステロールの減らし方', 'コレステロールより「隠れた脂肪」に要注意', 'どんなふうに脂質を摂るのか', 'リノール酸はからだによい？', 'オリーブ油（オイル）に注目！', '青い背の魚をもっともっと食べよう', '油を使う料理のエネルギーの抑え方', 'エネルギーを抑える食品・料理・献立', 'もの足りなさを感じさせない料理術', '簡単にできる朝食で　食事抜きを防ぐ', '夜食を食べたい時の段階別対策', '酒とつまみのとりかた', '新しい自分を開拓していく',
        ]
    },
];

const VideoModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    video: { title: string; videoSrc: string } | null;
}> = ({ isOpen, onClose, video }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
            // Autoplay when modal opens
            videoRef.current?.play().catch(e => console.error("Autoplay was prevented:", e));
        } else {
            document.body.style.overflow = 'unset';
            videoRef.current?.pause();
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !video) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-slate-900 rounded-lg shadow-2xl w-full max-w-4xl transform animate-scale-up flex flex-col overflow-hidden border border-slate-700"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 flex justify-between items-center bg-slate-900/80">
                    <h3 className="font-bold text-lg text-white">{video.title}</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-700"
                        aria-label="閉じる"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div className="aspect-video bg-black">
                    <video
                        ref={videoRef}
                        key={video.videoSrc}
                        className="w-full h-full"
                        controls
                        preload="auto"
                    >
                        <source src={video.videoSrc} type="video/mp4" />
                        お使いのブラウザはビデオ再生に対応していません。
                    </video>
                </div>
            </div>
        </div>,
        document.body
    );
};


const VideoThumbnail: React.FC<{ chapter: typeof videoLecturesData[0]; onPlay: () => void; }> = ({ chapter, onPlay }) => {
  return (
    <div 
      className="relative aspect-[16/10] bg-slate-800 rounded-lg overflow-hidden group cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-rose-500/20"
      onClick={onPlay}
    >
      <img src={chapter.thumbnail} alt={chapter.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 group-hover:from-black/90 transition-all duration-300"></div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
          <i className="fas fa-play text-white text-2xl ml-1"></i>
        </div>
      </div>

      <h3 className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-bold truncate" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
        {chapter.title}
      </h3>
    </div>
  );
};


export const VideoLecturesPage: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoSrc: string } | null>(null);

    const openModal = (video: { title: string; videoSrc: string }) => {
        setSelectedVideo(video);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };
    
    const featuredVideo = videoLecturesData[0];

    return (
        <>
            <div className="bg-slate-900 text-slate-200">
                {/* Hero Section */}
                <div 
                    className="relative h-[65vh] min-h-[450px] flex items-end p-6 md:p-12 text-white"
                    style={{ 
                        backgroundImage: `url(${featuredVideo.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    <div className="relative z-10 max-w-3xl animate-fade-in-up">
                        <p className="text-rose-400 font-bold text-lg">基礎編</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold my-3" style={{ textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>{featuredVideo.title}</h1>
                        <p className="text-slate-300 mb-6 line-clamp-2">{featuredVideo.topics.join(' / ')}</p>
                        <button
                            onClick={() => openModal({ title: featuredVideo.title, videoSrc: featuredVideo.videoSrc })}
                            className="inline-flex items-center justify-center px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-rose-500/30 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <i className="fas fa-play mr-3"></i>
                            今すぐ再生
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-100">講義一覧</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {videoLecturesData.map((chapter) => (
                            <VideoThumbnail 
                                key={chapter.id}
                                chapter={chapter}
                                onPlay={() => openModal({ title: chapter.title, videoSrc: chapter.videoSrc })}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <VideoModal
                isOpen={!!selectedVideo}
                onClose={closeModal}
                video={selectedVideo}
            />
        </>
    );
};
