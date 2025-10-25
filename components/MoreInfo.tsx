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
        className="inline-flex items-center justify-center px-6 py-2.5 mt-4 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base rounded-md shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 transform hover:-translate-y-0.5"
      >
        {buttonText} <i className="fas fa-arrow-right ml-2 text-sm"></i>
      </a>
    </div>
  </div>
);

export const MoreInfo: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-rose-300 to-pink-300 text-white p-4 flex items-center justify-center text-center shadow-md">
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
            </div>
        </div>
    );
};