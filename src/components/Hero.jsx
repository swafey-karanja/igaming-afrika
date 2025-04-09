import { useTranslation } from "react-i18next";

export default function Hero() {

  const { t } = useTranslation();

    return (
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/29650302/pexels-photo-29650302/free-photo-of-close-up-of-red-vintage-game-controller.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content container */}
        <div className="relative z-10 h-full flex items-center justify-center max-w-7xl mx-auto px-6">
          <div className="text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('welcome')}</h1>
            <p className="text-md md:text-lg">{t('register_ags_2026')}</p>
          </div>
        </div>
      </div>
    );
  }