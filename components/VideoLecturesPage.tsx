import React, { useState } from 'react';
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

const StreamingHeader: React.FC = () => (
    <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <div className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/members" className="flex items-center text-slate-300 hover:text-white transition-colors">
                <i className="fas fa-chevron-left mr-3"></i>
                <span className="font-semibold">メンバーエリアに戻る</span>
            </Link>
            <h2 className="text-xl font-bold text-rose-300 tracking-wider">
                Diet Academy Member Stream
            </h2>
        </div>
    </header>
);

const ThumbnailCard: React.FC<{ video: Video; onSelect: (video: Video) => void; }> = ({ video, onSelect }) => (
    <div
        className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
        onClick={() => onSelect(video)}
    >
        <div className="relative aspect-[16/10] bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-800">
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fas fa-play text-white text-5xl"></i>
            </div>
        </div>
        <div className="mt-3">
            <h3 className="font-semibold text-slate-300 group-hover:text-white transition-colors text-base">{video.title}</h3>
        </div>
    </div>
);


const PlayerView: React.FC<{ video: Video; onClose: () => void }> = ({ video, onClose }) => (
    <div className="w-full max-w-7xl mx-auto p-6 animate-fade-in">
        <button onClick={onClose} className="mb-6 flex items-center text-slate-300 hover:text-white transition-colors">
            <i className="fas fa-arrow-left mr-3"></i>
            <span className="font-semibold">すべての講義に戻る</span>
        </button>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 flex-shrink-0">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800">
                    <video key={video.videoSrc} className="w-full h-full" controls autoPlay preload="auto">
                        <source src={video.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className="lg:w-1/3">
                <h2 className="text-3xl font-bold text-white mb-4">{video.title}</h2>
                <h3 className="font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">この講義のトピック</h3>
                <ul className="space-y-2.5 text-slate-400">
                    {video.topics.map((topic, index) => (
                        <li key={index} className="flex items-start">
                            <i className="fas fa-check-circle text-rose-400/70 mr-3 mt-1"></i>
                            <span>{topic}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const StreamingFooter: React.FC = () => (
    <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-500 border-t border-slate-800 mt-12">
        <p>&copy; Nihon Diet Academy,Inc. All rights reserved.</p>
    </footer>
);

export const VideoLecturesPage: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    return (
        <div className="bg-slate-900 text-white min-h-screen flex flex-col">
            <StreamingHeader />
            <main className="flex-grow">
                {selectedVideo ? (
                    <PlayerView video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                ) : (
                    <div className="w-full max-w-7xl mx-auto p-6">
                        <h1 className="text-4xl font-extrabold text-white mb-2">基礎編 動画講義</h1>
                        <p className="text-slate-400 mb-8">視聴したい講義を選択してください。</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
                            {videoLecturesData.map((video) => (
                                <ThumbnailCard key={video.id} video={video} onSelect={setSelectedVideo} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <StreamingFooter />
        </div>
    );
};