import React, { useState } from 'react';
import type { ResultData } from '../types';

const BmiGauge: React.FC<{ bmi: number }> = ({ bmi }) => {
    const getBmiStatus = (value: number) => {
        if (value < 18.5) return { label: '低体重', color: 'bg-cyan-500', position: '10%' };
        if (value < 25) return { label: '普通体重', color: 'bg-green-500', position: '37.5%' };
        if (value < 30) return { label: '肥満（1度）', color: 'bg-yellow-500', position: '62.5%' };
        return { label: '肥満（2度以上）', color: 'bg-red-500', position: '87.5%' };
    };

    const { label, color } = getBmiStatus(bmi);
    
    let percentage = 0;
    if (bmi < 18.5) percentage = (bmi / 18.5) * 25;
    else if (bmi < 25) percentage = 25 + ((bmi - 18.5) / 6.5) * 25;
    else if (bmi < 30) percentage = 50 + ((bmi - 25) / 5) * 25;
    else percentage = 75 + ((bmi - 30) / 10) * 25;
    percentage = Math.min(100, Math.max(0, percentage));


    return (
        <div className="w-full">
            <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-cyan-500 via-green-500 to-red-500">
                <div 
                    className="absolute top-1/2 -mt-3 w-6 h-6 rounded-full bg-white border-2 border-blue-600 shadow-md transform -translate-x-1/2" 
                    style={{ left: `${percentage}%` }}
                ></div>
            </div>
            <div className="text-center mt-3">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full text-white ${color}`}>{label}</span>
            </div>
        </div>
    );
};

const WeightProgressBar: React.FC<{ current: number; target: number }> = ({ current, target }) => (
    <div className="relative pt-8">
        <div className="h-2.5 w-full rounded-full bg-slate-200">
            <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-green-400" style={{ width: '100%' }}></div>
        </div>
        <div className="absolute -top-1 text-center" style={{ left: '0%', transform: 'translateX(-10%)' }}>
            <span className="text-xs font-bold text-slate-700">{current}kg</span>
            <span className="block text-[10px] text-slate-500">現在</span>
        </div>
        <div className="absolute -top-1 text-center" style={{ right: '0%', transform: 'translateX(10%)' }}>
            <span className="text-xs font-bold text-green-600">{target}kg</span>
            <span className="block text-[10px] text-slate-500">目標</span>
        </div>
    </div>
);

const CalorieBreakdownChart: React.FC<{ tdee: number; intake: number; bmr: number }> = ({ tdee, intake, bmr }) => {
    const bmrPercent = (bmr / tdee) * 100;
    const intakePercent = (intake / tdee) * 100;
    
    return (
        <div className="w-full p-4 bg-slate-50 rounded-lg mt-4">
            <div className="relative w-full h-8 bg-blue-100 rounded mb-2">
                <div 
                    className="absolute top-0 bottom-0 h-full bg-green-300 rounded-l" 
                    style={{ width: `${Math.min(100, intakePercent)}%` }}
                    title={`摂取カロリー: ${Math.round(intake)} kcal`}
                ></div>
                 <div 
                    className="absolute top-0 bottom-0 border-r-2 border-dashed border-red-400" 
                    style={{ left: `${bmrPercent}%` }}
                    title={`基礎代謝量: ${Math.round(bmr)} kcal`}
                >
                </div>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-sm bg-green-300 mr-2"></span>
                        <span>摂取カロリー目安</span>
                    </div>
                    <span className="font-semibold">{Math.round(intake)} kcal</span>
                </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-sm bg-blue-100 mr-2"></span>
                        <span>消費カロリー (TDEE)</span>
                    </div>
                    <span className="font-semibold">{Math.round(tdee)} kcal</span>
                </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="w-0 h-3 border-r-2 border-dashed border-red-400 mr-2"></span>
                        <span className="text-red-600">基礎代謝量 (BMR)</span>
                    </div>
                    <span className="font-semibold text-red-600">{Math.round(bmr)} kcal</span>
                </div>
            </div>
        </div>
    );
};

const MetricDisplay: React.FC<{ icon: string; label: string; value: string; unit: string; iconBg: string; }> = ({ icon, label, value, unit, iconBg }) => (
    <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center text-center h-full">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${iconBg} mb-3 flex-shrink-0`}>
            <i className={`fas ${icon} text-xl`}></i>
        </div>
        <p className="text-sm text-slate-600 flex-grow">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value} <span className="text-sm font-normal">{unit}</span></p>
    </div>
);

const LeadGenerationForm: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handlePlanSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically send the email to a server
        setFormSubmitted(true);
    };

    if (formSubmitted) {
        return (
            <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                <i className="fas fa-check-circle text-4xl text-green-500 mb-3"></i>
                <h3 className="text-lg font-bold text-green-800">ありがとうございます！</h3>
                <p className="text-sm text-green-700">
                    あなたの受信トレイに無料ダイエットプランを送信しました。今日からあなたの健康的な旅を始めましょう！
                </p>
            </div>
        );
    }
    
    return (
        <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-bold text-blue-800">次のステップへ進みましょう！</h3>
            <p className="text-sm text-blue-700 mt-2 mb-4">
                この結果に基づいた無料のスターターダイエットプランをメールで受け取り、目標達成への第一歩を踏み出しましょう。
            </p>
            <form onSubmit={handlePlanSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                    type="email"
                    placeholder="メールアドレスを入力"
                    required
                    className="flex-grow px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-sm hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <i className="fas fa-paper-plane mr-2"></i>
                    無料プランを送信
                </button>
            </form>
        </div>
    );
};

export const ResultCard: React.FC<{ data: ResultData }> = ({ data }) => {
    return (
        <div className="bg-white rounded-lg w-full">
            {data.warningMessage && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-sm text-yellow-800" role="alert">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <i className="fas fa-exclamation-triangle mr-3 mt-1"></i>
                        </div>
                        <div>
                            <p className="font-semibold">プランに関する注意</p>
                            <p>{data.warningMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 rounded-lg">
                     <p className="font-medium text-slate-600 text-center mb-1">あなたのBMI値</p>
                     <p className="text-4xl font-bold text-blue-600 text-center mb-3">{data.bmi.toFixed(2)}</p>
                     <BmiGauge bmi={data.bmi} />
                </div>
                 <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-medium text-slate-600 text-center mb-2">減量目標</p>
                    <p className="text-center">
                        <span className="text-4xl font-bold text-green-600">-{data.weightToLose.toFixed(1)}</span>
                        <span className="text-lg font-medium text-slate-800"> kg</span>
                    </p>
                     <WeightProgressBar current={data.currentWeight} target={data.targetWeight} />
                </div>
            </div>
            
            <hr className="my-4 border-slate-200" />

            <div>
                <h4 className="text-lg font-bold text-slate-700 mb-4 text-center">カロリープラン ({data.months}ヶ月目標)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <MetricDisplay icon="fa-bed" label="基礎代謝量 (BMR)" value={Math.round(data.bmr).toLocaleString()} unit="kcal" iconBg="bg-orange-500" />
                    <MetricDisplay icon="fa-person-running" label="1日の消費カロリー (TDEE)" value={Math.round(data.tdee).toLocaleString()} unit="kcal" iconBg="bg-blue-500" />
                    <MetricDisplay icon="fa-utensils" label="1日の摂取カロリー目安" value={Math.round(data.dailyIntake).toLocaleString()} unit="kcal" iconBg="bg-green-500" />
                </div>
                <CalorieBreakdownChart tdee={data.tdee} intake={data.dailyIntake} bmr={data.bmr} />
            </div>

            <hr className="my-4 border-slate-200" />
            
            <LeadGenerationForm />

        </div>
    );
};