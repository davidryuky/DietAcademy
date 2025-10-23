import React from 'react';

// Reusable InfoCard Component
interface InfoCardProps {
  imageSrc: string;
  imageAlt: string;
  subtitle: string;
  mainText: React.ReactNode;
  buttonText: string;
  buttonLink: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc, imageAlt, subtitle, mainText, buttonText, buttonLink
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden group flex flex-col md:flex-row items-center">
    {/* Image on the left */}
    <div className="w-full md:w-1/3">
      <a href={buttonLink} className="block overflow-hidden">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </a>
    </div>
    {/* Content on the right */}
    <div className="flex flex-col items-center md:items-start p-6 text-center md:text-left md:w-2/3">
      <p className="text-sm text-slate-600">{subtitle}</p>
      <h3 className="font-bold my-2 text-slate-800 text-xl">{mainText}</h3>
      <a 
        href={buttonLink} 
        className="inline-flex items-center justify-center px-6 py-2.5 mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-base rounded-md shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5"
      >
        {buttonText} <i className="fas fa-arrow-right ml-2 text-sm"></i>
      </a>
    </div>
  </div>
);


const FeatureCard: React.FC<{
  title: string;
  icon: string;
  iconColorClass: string;
  borderColorClass: string;
  children: React.ReactNode;
}> = ({ title, icon, iconColorClass, borderColorClass, children }) => (
    <div className={`flex-1 bg-white p-6 rounded-lg shadow-md border-t-4 ${borderColorClass} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start space-x-5`}>
        <div className="flex-shrink-0 mt-1">
            <i className={`fas ${icon} text-4xl ${iconColorClass}`}></i>
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <div className="text-slate-700 font-medium space-y-2">
                {children}
            </div>
        </div>
    </div>
);


const InfoButton: React.FC<{
  href: string;
  title: React.ReactNode;
  className: string;
  iconClassName: string;
}> = ({ href, title, className, iconClassName }) => (
  <a
    href={href}
    className={`flex-1 block group rounded-lg shadow-md text-white overflow-hidden transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 ${className}`}
  >
    <div className="p-6 h-full flex justify-between items-center min-h-[100px]">
      <div className="flex-grow">
        <h3 className="text-2xl font-bold leading-tight">{title}</h3>
      </div>
      <div className="ml-4 flex-shrink-0">
        <i
          className={`fas fa-play-circle text-5xl opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100 ${iconClassName}`}
        ></i>
      </div>
    </div>
  </a>
);

export const MoreInfo: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-4 flex items-center justify-center text-center shadow-md">
                    <i className="fas fa-award text-3xl mr-4 hidden sm:block"></i>
                    <h2 className="text-2xl md:text-3xl font-bold">ダイエットマスター資格取得</h2>
                </div>
                {/* Section Content */}
                <div className="p-4 md:p-5 space-y-6">
                    <InfoCard
                      imageSrc="https://dietacademy.jp/img2023/toppage/banner-img6.jpg"
                      imageAlt="痩せる・太るには理由"
                      subtitle="痩せる・太るには理由がありますが"
                      mainText={<>人間が痩せるには、基本的に<br />二つの理由しかありません</>}
                      buttonText="詳しく見る"
                      buttonLink="#"
                    />
                    {/* You can add more InfoCard components here and they will be separated */}
                </div>
            </div>
            
             <div className="text-center space-y-4">
                <a href="#" className="inline-block transition-transform duration-300 hover:scale-105"><img src="https://dietacademy.jp/img2023/toppage/btn-faq-wide.jpg" alt="ダイエットマスターよくある質問ボタン" className="mx-auto hidden md:block max-w-full h-auto"/></a> 
                <a href="#" className="inline-block transition-transform duration-300 hover:scale-105"><img src="https://dietacademy.jp/img2023/toppage/btn-voices-wide.jpg" alt="受講生の喜びの声" className="mx-auto hidden md:block max-w-full h-auto"/></a>
                
                <a href="#" className="inline-block transition-opacity hover:opacity-80"><img src="https://dietacademy.jp/img2023/toppage/btn-faq.jpg" alt="ダイエットマスターよくある質問" className="mx-auto md:hidden max-w-full h-auto"/></a> 
                <a href="#" className="inline-block transition-opacity hover:opacity-80"><img src="https://dietacademy.jp/img2023/toppage/btn-voices.jpg" alt="受講生の体験談" className="mx-auto md:hidden max-w-full h-auto"/></a>
            </div>

            {/* Feature Cards Section */}
            <div className="flex flex-col md:flex-row gap-6">
                <FeatureCard 
                    title="受講及びダイエット期間" 
                    icon="fa-calendar-check" 
                    iconColorClass="text-orange-500" 
                    borderColorClass="border-orange-500"
                >
                    <p>平均 半月〜3ヶ月で学んで痩せることができます。</p>
                    <p className="text-xs text-slate-500">
                        新陳代謝がひとまわりする期間を想定しています
                    </p>
                </FeatureCard>
                <FeatureCard 
                    title="受講及びダイエット方法" 
                    icon="fa-mobile-screen-button" 
                    iconColorClass="text-cyan-500"
                    borderColorClass="border-cyan-500"
                >
                    <p>スマホやタブレットでいつでもどこでも動画中心で学習できます！</p>
                    <p className="text-xs text-slate-500">
                        イラストを多用した分かりやすい内容です。
                    </p>
                </FeatureCard>
            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-col md:flex-row gap-6">
                 <InfoButton
                    href="#"
                    title="ダイエットマスターの活躍"
                    className="bg-gradient-to-br from-sky-500 to-blue-600"
                    iconClassName="text-blue-200"
                />
                <InfoButton
                    href="#"
                    title={<>ダイエットマスターの理論は<br />こんな方に効果的です</>}
                    className="bg-gradient-to-br from-teal-500 to-cyan-600"
                    iconClassName="text-cyan-200"
                />
            </div>
        </div>
    );
};