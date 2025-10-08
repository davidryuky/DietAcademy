import React, { useState, useCallback, Fragment, useMemo } from 'react';
import type { DietFormData, ResultData } from '../types';
import { ResultModal } from './ResultModal';

const activityLevels = [
  { value: 1.2, label: '座り仕事が中心' }, // Sedentary
  { value: 1.375, label: '軽い運動（週1〜3日）' }, // Lightly Active
  { value: 1.55, label: '中程度の運動（週3〜5日）' }, // Moderately Active
  { value: 1.725, label: '激しい運動（週6〜7日）' }, // Very Active
];

const FormInputRow: React.FC<{ label: string; name: string; value: string; unit: string; placeholder: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, name, value, unit, placeholder, onChange }) => (
    <div className="flex items-center space-x-2">
        <i className="fas fa-caret-right text-blue-500 fa-sm w-4 text-center"></i>
        <label htmlFor={name} className="w-20 flex-shrink-0 text-sm text-slate-700">{label}：</label>
        <input 
            type="number" 
            name={name} 
            id={name} 
            value={value} 
            onChange={onChange} 
            className="w-24 rounded border bg-slate-50 border-slate-300 p-1 text-black text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
            placeholder={placeholder}
        />
        <span className="text-sm text-slate-700">{unit}</span>
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
        activityLevel: 1.2,
    });
    const [results, setResults] = useState<ResultData | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, gender: e.target.value as 'female' | 'male'}));
    };

    const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.target.value, 10);
        if (!isNaN(index) && index >= 0 && index < activityLevels.length) {
            const newMultiplier = activityLevels[index].value;
            setFormData(prev => ({ ...prev, activityLevel: newMultiplier }));
        }
    };

    const currentActivityIndex = useMemo(() => {
        return activityLevels.findIndex(level => level.value === formData.activityLevel);
    }, [formData.activityLevel]);

    const calculateDietPlan = useCallback(() => {
        const { age, height, weight, targetWeight, months, gender, activityLevel } = formData;
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

        // Switched to Mifflin-St Jeor equation for better accuracy
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
        
        const tdee = bmr * activityLevel;
        
        const calculatedDailyIntake = tdee - dailyCalorieDeficit;
        
        let warningMessage: string | undefined = undefined;

        if (calculatedDailyIntake < bmr) {
            warningMessage = `目標を${numMonths}ヶ月で達成するには、1日の摂取カロリーを約${Math.round(calculatedDailyIntake)}kcalにする必要があります。これはあなたの基礎代謝量（約${Math.round(bmr)}kcal）を下回っています。このような極端な食事制限は健康を害する可能性があり、専門家の監督下でのみ行うべきです。`;
        }
        
        if ((tdee - bmr) <= 0 && weightToLose > 0) {
            setError('現在の設定では、活動レベルを上げない限り健康的な体重減少は困難です。より長い期間を設定するか、専門家にご相談ください。');
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
        <section id="calculator" className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Left Side: Form */}
                <div className="w-full md:w-3/5 p-6 md:p-8">
                    <img src="https://dietacademy.jp/img2023/toppage/keisan-copy.png" alt="○ヶ月で○kgやせたい？" className="mb-4 w-full max-w-md"/>
                    <p className="text-sm text-slate-600 mb-6 max-w-md">
                        ダイエットを始める上で、あなたが最低限知っておかなければならない、あなたの基礎代謝量や摂取カロリー、またBMI、そしてあなたのダイエット期間などが自動計算により確認できます。
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <p className="text-sm text-slate-500">（数値は半角で入力）</p>

                        <div className="flex items-center space-x-3">
                            <label className="flex items-center cursor-pointer text-sm">
                                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleGenderChange} className="sr-only peer"/>
                                <span className="w-4 h-4 rounded-full border border-slate-400 mr-2 flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-100 transition">
                                    <span className="w-2 h-2 rounded-full bg-transparent peer-checked:bg-blue-500 transition"></span>
                                </span>
                                女性
                            </label>
                             <label className="flex items-center cursor-pointer text-sm">
                                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleGenderChange} className="sr-only peer"/>
                                <span className="w-4 h-4 rounded-full border border-slate-400 mr-2 flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-100 transition">
                                     <span className="w-2 h-2 rounded-full bg-transparent peer-checked:bg-blue-500 transition"></span>
                                </span>
                                男性
                            </label>
                            <span className="text-sm text-slate-500">（性別をチェック）</span>
                        </div>
                        
                        <div className="space-y-2.5 pt-1">
                            <FormInputRow label="年齢" name="age" value={formData.age} unit="歳" placeholder="" onChange={handleInputChange} />
                            <FormInputRow label="身長" name="height" value={formData.height} unit="cm" placeholder="" onChange={handleInputChange} />
                            <FormInputRow label="体重" name="weight" value={formData.weight} unit="kg" placeholder="" onChange={handleInputChange} />
                            <FormInputRow label="目標体重" name="targetWeight" value={formData.targetWeight} unit="kgに" placeholder="" onChange={handleInputChange} />
                            <FormInputRow label="目標期間" name="months" value={formData.months} unit="ヶ月" placeholder="" onChange={handleInputChange} />
                        </div>

                        {/* Activity Level Slider */}
                        <div className="space-y-2 pt-2">
                            <div className="flex items-baseline space-x-2">
                               <i className="fas fa-caret-right text-blue-500 fa-sm w-4 text-center"></i>
                               <label className="text-sm text-slate-700">活動レベル：</label>
                               <span className="font-semibold text-blue-600 text-sm">{activityLevels[currentActivityIndex]?.label || ''}</span>
                            </div>
                            <div className="px-5">
                                <input
                                    type="range"
                                    min="0"
                                    max={activityLevels.length - 1}
                                    step="1"
                                    value={currentActivityIndex}
                                    onChange={handleActivityChange}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>座り仕事</span>
                                    <span>活発</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3">
                             <button 
                                type="submit" 
                                className="w-full max-w-xs flex items-center justify-center px-10 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 disabled:bg-slate-400 disabled:scale-100 disabled:cursor-not-allowed"
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
                                       <i className="fas fa-calculator mr-2"></i>
                                       計算する
                                    </Fragment>
                                )}
                            </button>
                             {error && <p className="text-red-600 text-sm mt-3 text-center font-semibold" role="alert">{error}</p>}
                        </div>
                    </form>
                </div>
                {/* Right Side: Image */}
                <div className="hidden md:block md:w-2/5 relative min-h-[300px]">
                    <img src="https://dietacademy.jp/img2023/calculate/calcu-girl.jpg" alt="Diet model" className="absolute inset-0 w-full h-full object-cover object-center" />
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