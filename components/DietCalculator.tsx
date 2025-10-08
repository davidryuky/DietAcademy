import React, { useState, useCallback } from 'react';
import type { DietFormData } from '../types';

interface ResultData {
    bmi: number;
    idealWeight: number;
    bmr: number;
    weightToLose: number;
    dailyIntake: number;
    months: number;
}

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

const ResultCard: React.FC<{ data: ResultData }> = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200 animate-fade-in w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">あなたのダイエットプラン</h3>
            <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-baseline">
                        <span className="text-sm font-medium text-slate-600">あなたのBMI値</span>
                        <span className="text-2xl font-bold text-blue-600">{data.bmi.toFixed(2)}</span>
                    </div>
                    <div className="mt-2">
                         <BmiGauge bmi={data.bmi} />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-slate-600">標準体重</p>
                        <p className="text-lg font-bold text-slate-800">{data.idealWeight.toFixed(1)} <span className="text-xs">kg</span></p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-slate-600">基礎代謝量 (BMR)</p>
                        <p className="text-lg font-bold text-slate-800">{Math.round(data.bmr).toLocaleString()} <span className="text-xs">kcal/日</span></p>
                    </div>
                </div>

                <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-blue-800">
                        {data.months}ヶ月で目標達成するためには...
                    </p>
                    <p className="text-slate-600 mt-1">1日の摂取カロリー目安は</p>
                    <p className="text-3xl font-extrabold text-blue-600 my-2">{Math.round(data.dailyIntake).toLocaleString()} kcal</p>
                    <p className="text-xs text-slate-500">基礎代謝量を下回らない、健康的なプランです。</p>
                </div>
            </div>
        </div>
    );
};

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
    });
    const [results, setResults] = useState<ResultData | null>(null);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, gender: e.target.value as 'female' | 'male'}));
    };

    const calculateDietPlan = useCallback(() => {
        setError('');
        setResults(null);

        const { age, height, weight, targetWeight, months, gender } = formData;
        const numAge = parseInt(age, 10);
        const numHeight = parseInt(height, 10);
        const numWeight = parseInt(weight, 10);
        const numTargetWeight = parseInt(targetWeight, 10);
        const numMonths = parseInt(months, 10);

        if ([numAge, numHeight, numWeight, numTargetWeight, numMonths].some(isNaN)) {
            setError('すべての項目に有効な半角数値を入力してください。');
            return;
        }
        if (numAge <= 0 || numHeight <= 0 || numWeight <= 0 || numTargetWeight <= 0 || numMonths <= 0) {
            setError('すべての値は0より大きい必要があります。');
            return;
        }
        if (numTargetWeight >= numWeight) {
            setError('目標体重は現在の体重より少なく設定してください。');
            return;
        }

        const heightInMeters = numHeight / 100;
        const bmi = numWeight / (heightInMeters * heightInMeters);

        let bmr: number; // Harris-Benedict
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * numWeight) + (4.799 * numHeight) - (5.677 * numAge);
        } else {
            bmr = 447.593 + (9.247 * numWeight) + (3.098 * numHeight) - (4.330 * numAge);
        }
        
        const idealWeight = 22 * (heightInMeters * heightInMeters);
        const weightToLose = numWeight - numTargetWeight;
        const totalCaloriesToLose = weightToLose * 7200;
        const dailyCalorieDeficit = totalCaloriesToLose / (numMonths * 30);
        const dailyIntake = bmr * 1.2 - dailyCalorieDeficit; // Assuming light activity (BMR * 1.2)
        
        if (dailyIntake < bmr) {
           setError('このプランは基礎代謝量を下回る可能性があり、急進的すぎます。期間を長くするか、目標体重を調整してください。');
           return;
        }

        setResults({ bmi, idealWeight, bmr, weightToLose, dailyIntake, months: numMonths });

    }, [formData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        calculateDietPlan();
    };

    return (
        <section className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Left Side: Form */}
                <div className="w-full md:w-3/5 p-6 md:p-8">
                    <img src="https://dietacademy.jp/img2023/toppage/keisan-copy.png" alt="○ヶ月で○kgやせたい？" className="mb-4 w-full max-w-md"/>
                    <p className="text-sm text-slate-600 mb-6 max-w-md">
                        ダイエットを始める上で、あなたが最低限知っておかなければならない、あなたの基礎代謝量や摂取カロリー、またBMI、そしてあなたのダイエット期間などが自動計算により確認できます。
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
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
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-caret-right text-blue-500 fa-sm w-4 text-center"></i>
                                <label htmlFor="months" className="w-20 flex-shrink-0 text-sm text-slate-700"></label>
                                <input type="number" name="months" id="months" value={formData.months} onChange={handleInputChange} className="w-24 rounded border bg-slate-50 border-slate-300 p-1 text-black text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                <span className="text-sm text-slate-700">ヶ月で、なりたい！</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105">
                                計算する
                            </button>
                        </div>
                    </form>
                </div>
                {/* Right Side: Image */}
                <div className="hidden md:block md:w-2/5 relative min-h-[300px]">
                    <img src="https://dietacademy.jp/img2023/calculate/calcu-girl.jpg" alt="Diet model" className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
            </div>

            {/* Results Section */}
            <div className="p-6 md:p-8 border-t-2 border-pink-300">
                <div className="max-w-xl mx-auto flex items-center justify-center">
                    {error && <div className="text-red-600 font-semibold p-4 text-center" role="alert"><p>{error}</p></div>}
                    
                    {!results && !error && (
                        <div className="text-center text-slate-500 p-8">
                             <p className="font-semibold">ここに診断結果が表示されます</p>
                        </div>
                    )}
                    
                    {results && <ResultCard data={results} />}
                </div>
            </div>
        </section>
    );
};