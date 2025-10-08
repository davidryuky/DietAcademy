
import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; }> = ({ title, children, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
        <div className="text-slate-600 space-y-3">
            {children}
        </div>
    </div>
);

export const InfoSection: React.FC = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800">Understanding Your Plan</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                        Knowledge is the key to a successful and sustainable diet.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <InfoCard title="What is BMI?" icon={<ScaleIcon />}>
                        <p>
                            BMI (Body Mass Index) is a widely used measure to gauge if your weight is healthy in proportion to your height. It's a useful starting point for assessing your weight status.
                        </p>
                        <p className="text-sm p-3 bg-slate-100 rounded-md">
                            Formula: <strong>BMI = weight (kg) / [height (m)]²</strong>
                        </p>
                    </InfoCard>
                    <InfoCard title="Basal Metabolic Rate (BMR)" icon={<FireIcon />}>
                        <p>
                           Your BMR is the number of calories your body needs to accomplish its most basic, life-sustaining functions while at rest. We use the Harris-Benedict equation to estimate this.
                        </p>
                         <p>
                            Knowing your BMR helps create a calorie target that ensures you're eating enough while still creating a deficit for weight loss.
                        </p>
                    </InfoCard>
                </div>
                 <div className="text-center mt-12">
                     <a href="#" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
                        Learn More About Diet Science
                    </a>
                </div>
            </div>
        </section>
    );
};

const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
);

const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
);
