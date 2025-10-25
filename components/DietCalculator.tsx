import React, { useState, useCallback, Fragment, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
        <div className="flex items-stretch focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-400 transition-all duration-300 rounded-md">
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

const InfoTooltip: React.FC<{
    targetRef: React.RefObject<HTMLElement>;
    onClose: () => void;
}> = ({ targetRef, onClose }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0, arrowClass: '', arrowStyle: {} });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) && targetRef.current && !targetRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        const handleScroll = () => onClose();

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [onClose, targetRef]);
    
    useEffect(() => {
        const updatePosition = () => {
            if (!targetRef.current || !tooltipRef.current) return;
            
            const targetRect = targetRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const isMobile = window.innerWidth < 768;
            
            let top, left, arrowClass, arrowStyle = {};
            
            if (isMobile) {
                // Center tooltip on screen for mobile
                top = window.innerHeight / 2 - tooltipRect.height / 2;
                left = window.innerWidth / 2 - tooltipRect.width / 2;
                
                // Position arrow on the left, pointing to the button
                const buttonCenterY = targetRect.top + targetRect.height / 2;
                const arrowTop = buttonCenterY - top;

                arrowClass = 'absolute -left-2 top-0 transform -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-slate-700';
                arrowStyle = { top: `${arrowTop}px` };

            } else {
                 // Position above on desktop
                 top = targetRect.top - tooltipRect.height - 10;
                 left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
                 arrowClass = 'absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-slate-700';
            }

            setPosition({ top, left, arrowClass, arrowStyle });
        };
        
        // A small timeout to ensure the tooltip has rendered and has dimensions
        const timer = setTimeout(updatePosition, 0);

        window.addEventListener('resize', updatePosition);
        return () => {
             clearTimeout(timer);
             window.removeEventListener('resize', updatePosition);
        }

    }, [targetRef]);

    return ReactDOM.createPortal(
        <div 
            ref={tooltipRef}
            className="fixed z-50 bg-slate-700 text-white text-sm rounded-lg shadow-xl p-3 max-w-[280px] animate-fade-in"
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
             ダイエットを始める上で、あなたが最低限知っておかなければならない、あなたの基礎代謝量や摂取カロリー、またBMI、そしてあなたのダイエット期間などが自動計算により確認できます。
            <div className={position.arrowClass} style={position.arrowStyle}></div>
        </div>,
        document.body
    );
};

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
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const infoButtonRef = useRef<HTMLButtonElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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
                        style={{ backgroundImage: "url('https://i.postimg.cc/j2LMDz8W/calcu-girl-1-copiar.png')" }}
                    ></div>
                    <div className="relative">
                        <div className="mb-8 text-left">
                           <h2 className="text-[1.4rem] sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-rose-300 to-pink-400 bg-clip-text text-transparent leading-tight">
                                ダイエットマスターなら<br />
                                短期間で、誰でも痩せる!<br />
                                あなたの希望は何ヶ月で何kg?
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto md:mx-0">
                            {/* Gender Toggle */}
                             <div className="flex items-center justify-center gap-3">
                                 <button
                                     ref={infoButtonRef}
                                     type="button"
                                     onClick={() => setIsInfoVisible(prev => !prev)}
                                     className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-rose-300"
                                     aria-label="計算についての情報を表示"
                                 >
                                     <i className="fas fa-info"></i>
                                 </button>
                                <div className="relative flex items-center justify-center flex-grow max-w-xs p-1 bg-slate-200/70 rounded-full">
                                    <div className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${formData.gender === 'male' ? 'translate-x-full' : 'translate-x-0'}`}></div>
                                    <button type="button" onClick={() => handleGenderChange('female')} className={`relative z-10 flex-1 py-2 text-center rounded-full transition-colors duration-300 font-semibold ${formData.gender === 'female' ? 'text-slate-800' : 'text-slate-500'}`}>
                                        <i className="fas fa-venus mr-2 text-pink-400"></i> 女性
                                    </button>
                                    <button type="button" onClick={() => handleGenderChange('male')} className={`relative z-10 flex-1 py-2 text-center rounded-full transition-colors duration-300 font-semibold ${formData.gender === 'male' ? 'text-slate-800' : 'text-slate-500'}`}>
                                        <i className="fas fa-mars mr-2 text-sky-500"></i> 男性
                                    </button>
                                </div>
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

                            <div className="pt-2">
                                <div className="flex items-center justify-center gap-3">
                                    <button 
                                        type="submit" 
                                        className="w-full max-w-sm flex items-center justify-center px-10 py-4 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-rose-400/50 transform hover:-translate-y-1 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-md disabled:cursor-not-allowed disabled:translate-y-0"
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
                                </div>
                                 {error && <p className="text-red-600 text-sm mt-4 font-semibold text-center" role="alert">{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
                {/* Right Side: Image */}
                <div className="hidden md:block md:w-2/5 relative min-h-[300px]">
                    <img src="https://i.postimg.cc/j2LMDz8W/calcu-girl-1-copiar.png" alt="Diet model" className="absolute inset-0 w-full h-full object-cover object-left" />
                </div>
            </div>
            
            <ResultModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={results}
            />
            {isInfoVisible && <InfoTooltip targetRef={infoButtonRef} onClose={() => setIsInfoVisible(false)} />}
        </section>
    );
};