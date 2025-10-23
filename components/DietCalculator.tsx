import React, { useState, useCallback, Fragment } from 'react';
import type { DietFormData, ResultData } from '../types';
import { ResultModal } from './ResultModal';

const ModernFormInput: React.FC<{
    icon: string;
    name: string;
    value: string;
    unit: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ icon, name, value, unit, placeholder, onChange }) => (
    <div className="group">
        <div className="flex items-stretch focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-all duration-300 rounded-md">
            {/* Input with icon. bg-white, rounded-l-md */}
            <div className="flex-grow flex items-stretch bg-white shadow-inner border border-r-0 border-slate-200 rounded-l-md">
                <span className="inline-flex items-center pl-2 pr-1 text-slate-400">
                    <i className={`fas ${icon} fa-fw`}></i>
                </span>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent p-2 text-slate-800 text-center placeholder:text-slate-400 focus:outline-none placeholder:text-sm placeholder:tracking-tighter"
                    placeholder={placeholder}
                />
            </div>
            {/* Unit. bg-slate-100, rounded-r-md */}
            <span className="inline-flex items-center justify-center w-16 bg-slate-100 text-slate-600 text-sm border border-l-0 border-slate-200 rounded-r-md">
                {unit}
            </span>
        </div>
    </div>
);

export const DietCalculator: React.FC = () => {
    const [formData, setFormData] = useState<DietFormData>({
        gender: 'female',
        age: '',
        height: '',
        weight: '',
        targetWeight: '',
        months: '',
    });
    const [results, setResults] = useState<ResultData | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Allow only numbers
        if (/^\d*$/.test(value)) {
           setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleGenderChange = (gender: 'female' | 'male') => {
        setFormData(prev => ({ ...prev, gender }));
    };

    const calculateDietPlan = useCallback(() => {
        const { age, height, weight, targetWeight, months, gender } = formData;
        const numAge = parseInt(age, 10);
        const numHeight = parseInt(height, 10);
        const numWeight = parseInt(weight, 10);
        const numTargetWeight = parseInt(targetWeight, 10);
        const numMonths = parseInt(months, 10);

        if ([numAge, numHeight, numWeight, numTargetWeight, numMonths].some(val => isNaN(val) || val <= 0)) {
            setError('すべての項目に0より大きい有効な半角数値を入力してください。');
            return null;
        }
        
        if (numTargetWeight >= numWeight) {
            setError('目標体重は現在の体重より少なく設定してください。');
            return null;
        }

        const heightInMeters = numHeight / 100;
        const bmi = numWeight / (heightInMeters * heightInMeters);
        
        let bmr: number;
        if (gender === 'male') {
            bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge) + 5;
        } else {
            bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge) - 161;
        }
        
        const idealWeight = 22 * (heightInMeters * heightInMeters);
        const weightToLose = numWeight - numTargetWeight;
        const totalCaloriesToLose = weightToLose * 7200;
        const dailyCalorieDeficit = totalCaloriesToLose / (numMonths * 30);
        
        // Using a fixed activity level multiplier for a sedentary lifestyle (1.2) for simplicity.
        const activityLevel = 1.2;
        const tdee = bmr * activityLevel;
        const calculatedDailyIntake = tdee - dailyCalorieDeficit;
        
        let warningMessage: string | undefined = undefined;

        if (calculatedDailyIntake < bmr) {
            warningMessage = `目標を${numMonths}ヶ月で達成するには、1日の摂取カロリーを約${Math.round(calculatedDailyIntake)}kcalにする必要があります。これはあなたの基礎代謝量（約${Math.round(bmr)}kcal）を下回っています。このような極端な食事制限は健康を害する可能性があり、専門家の監督下でのみ行うべきです。`;
        }
        
        if ((tdee - bmr) <= 0 && weightToLose > 0) {
            setError('現在の設定では、健康的な体重減少は困難です。より長い期間を設定するか、専門家にご相談ください。');
            return null;
        }

        return { 
            bmi, 
            idealWeight, 
            bmr,
            tdee,
            currentWeight: numWeight,
            targetWeight: numTargetWeight,
            weightToLose, 
            dailyIntake: calculatedDailyIntake,
            months: numMonths,
            warningMessage 
        };
    }, [formData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResults(null);
        setError('');

        setTimeout(() => {
            const resultData = calculateDietPlan();
            setIsLoading(false);
            if(resultData) {
                setResults(resultData);
                setIsModalOpen(true);
            }
        }, 500);
    };

    return (
        <section id="calculator" className="rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Left Side: Form */}
                <div className="w-full md:w-3/5 p-6 md:p-8 relative">
                    <div
                        className="md:hidden absolute inset-0 bg-no-repeat bg-cover bg-center opacity-50 pointer-events-none"
                        style={{ backgroundImage: "url('https://dietacademy.jp/img2023/calculate/calcu-girl.jpg')" }}
                    ></div>
                    <div className="relative">
                        <img src="https://dietacademy.jp/img2023/toppage/keisan-copy.png" alt="○ヶ月で○kgやせたい？" className="mb-4 w-full"/>
                        <p className="text-base text-slate-600 mb-6 max-w-lg" style={{textShadow: '0 1px 2px rgba(255,255,255,0.5)'}}>
                            ダイエットを始める上で、あなたが最低限知っておかなければならない、あなたの基礎代謝量や摂取カロリー、またBMI、そしてあなたのダイエット期間などが自動計算により確認できます。
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                            {/* Gender Toggle */}
                            <div className="relative flex items-center justify-center w-full max-w-xs p-1 bg-slate-200/70 rounded-full mx-auto">
                                <div className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${formData.gender === 'male' ? 'translate-x-full' : 'translate-x-0'}`}></div>
                                <button type="button" onClick={() => handleGenderChange('female')} className={`relative z-10 flex-1 py-2 text-center rounded-full transition-colors duration-300 font-semibold ${formData.gender === 'female' ? 'text-slate-800' : 'text-slate-500'}`}>
                                    <i className="fas fa-venus mr-2 text-pink-500"></i> 女性
                                </button>
                                <button type="button" onClick={() => handleGenderChange('male')} className={`relative z-10 flex-1 py-2 text-center rounded-full transition-colors duration-300 font-semibold ${formData.gender === 'male' ? 'text-slate-800' : 'text-slate-500'}`}>
                                    <i className="fas fa-mars mr-2 text-blue-500"></i> 男性
                                </button>
                            </div>
                            
                            {/* Input Grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <ModernFormInput icon="fa-birthday-cake" name="age" value={formData.age} unit="歳" placeholder="年齢" onChange={handleInputChange} />
                                <ModernFormInput icon="fa-ruler-vertical" name="height" value={formData.height} unit="cm" placeholder="身長" onChange={handleInputChange} />
                                <ModernFormInput icon="fa-weight-scale" name="weight" value={formData.weight} unit="kg" placeholder="現在の体重" onChange={handleInputChange} />
                                <ModernFormInput icon="fa-bullseye" name="targetWeight" value={formData.targetWeight} unit="kgに" placeholder="目標体重" onChange={handleInputChange} />
                                <div className="col-span-2">
                                    <ModernFormInput icon="fa-calendar-alt" name="months" value={formData.months} unit="ヶ月" placeholder="ヶ月で、なりたい！" onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="pt-2 text-center">
                                 <button 
                                    type="submit" 
                                    className="w-full max-w-sm flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50 transform hover:-translate-y-1 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-md disabled:cursor-not-allowed disabled:translate-y-0"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Fragment>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            計算中...
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                           <i className="fas fa-wand-magic-sparkles mr-3"></i>
                                           あなたのプランを計算
                                        </Fragment>
                                    )}
                                </button>
                                 {error && <p className="text-red-600 text-sm mt-4 font-semibold" role="alert">{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
                {/* Right Side: Image */}
                <div className="hidden md:block md:w-2/5 relative min-h-[300px]">
                    <img src="https://dietacademy.jp/img2023/calculate/calcu-girl.jpg" alt="Diet model" className="absolute inset-0 w-full h-full object-cover object-left" />
                </div>
            </div>
            
            <ResultModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={results}
            />
        </section>
    );
};