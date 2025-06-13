// components/ExhibitionModal.jsx
import { X, CheckCircle, Users, Star, Hammer, Building2 } from "lucide-react";

const getTierColorClass = (tier) => {
  switch (tier) {
    case "Diamond":
      return "text-cyan-500";
    case "Platinum":
      return "text-purple-500";
    case "Gold":
      return "text-yellow-500";
    case "Silver":
      return "text-gray-400";
    case "Bronze":
      return "text-amber-600";
    default:
      return "text-slate-400";
  }
};

const ExhibitionModal = ({ pkg, isModalOpen, onClose, getTierColor }) => {
  if (!pkg) return null;

  return (
    <div
      className={`fixed inset-0 bg-transparent transition-all duration-300 ease-out flex items-center justify-center p-4 z-50 ${
        isModalOpen ? "bg-opacity-50 backdrop-blur-sm" : "bg-opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out shadow-2xl ${
          isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${getTierColor(
            pkg.tier
          )} text-white p-6`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-xl backdrop-blur-sm">
                {pkg.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {pkg.tier} - {pkg.type}
                </h2>
                <p className="text-white text-opacity-90 text-sm mt-1">
                  Stand Size: {pkg.standSize}m
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{pkg.price}</span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-colors backdrop-blur-sm cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Description */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-700 text-sm">{pkg.description}</p>
            </div>

            {/* Stand Features */}
            {pkg.standBenefits.length > 0 && (
              <Section icon={<Building2 size={18} />} title="Stand Features">
                {pkg.standBenefits.map((b, i) => (
                  <ListItem
                    key={i}
                    icon={
                      <CheckCircle
                        size={16}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                    }
                    text={b}
                  />
                ))}
              </Section>
            )}

            {/* Exhibitor Benefits */}
            {pkg.exhibitorBenefits.length > 0 && (
              <Section
                icon={
                  <Star size={18} className={getTierColorClass(pkg.tier)} />
                }
                title="Exhibitor Benefits"
              >
                {pkg.exhibitorBenefits.map((b, i) => (
                  <ListItem
                    key={i}
                    icon={
                      <Star size={16} className={getTierColorClass(pkg.tier)} />
                    }
                    text={b}
                  />
                ))}
              </Section>
            )}

            {/* Sponsorship Status */}
            {pkg.sponsorshipStatus.length > 0 && (
              <Section
                icon={
                  <Star size={18} className={getTierColorClass(pkg.tier)} />
                }
                title={`${pkg.tier} Sponsorship Status`}
              >
                {pkg.sponsorshipStatus.map((b, i) => (
                  <ListItem
                    key={i}
                    icon={
                      <Star size={16} className={getTierColorClass(pkg.tier)} />
                    }
                    text={b}
                  />
                ))}
              </Section>
            )}

            {/* Tickets */}
            <Section icon={<Users size={18} />} title="Included Passes">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-slate-700 text-sm">{pkg.tickets}</p>
              </div>
            </Section>

            {/* Notes */}
            {pkg.notes.length > 0 && (
              <Section icon={<Hammer size={18} />} title="Important Notes">
                {pkg.notes.map((note, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-black"
                  >
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{note}</span>
                  </div>
                ))}
              </Section>
            )}

            {/* CTA */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                className={`flex-1 bg-gradient-to-r ${getTierColor(
                  pkg.tier
                )} text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-md`}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ icon, title, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <div className="text-slate-600">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const ListItem = ({ icon, text }) => (
  <div className="flex items-start gap-2 text-sm text-slate-700">
    <div className="text-slate-400 mt-0.5 flex-shrink-0">{icon}</div>
    <span>{text}</span>
  </div>
);

export default ExhibitionModal;
