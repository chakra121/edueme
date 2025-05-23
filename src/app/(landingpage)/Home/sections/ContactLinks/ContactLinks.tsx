import { FC } from "react";
import { motion } from "framer-motion";
import { 
  FaWhatsapp, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaFacebook, 
  FaYoutube 
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface SocialLink {
  name: string;
  icon: JSX.Element;
  link: string;
  color: string;
  hoverBg: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "WhatsApp",
    icon: <FaWhatsapp className="text-3xl" />,
    link: "https://wa.me/919059508050",
    color: "text-green-500",
    hoverBg: "hover:bg-green-500",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-3xl" />,
    link: "https://linkedin.com/company/yourcompany",
    color: "text-blue-600",
    hoverBg: "hover:bg-blue-600",
  },
  
  {
    name: "Email",
    icon: <MdEmail className="text-3xl" />,
    link: "mailto:info@eduemeresearchlabs.com",
    color: "text-gray-600",
    hoverBg: "hover:bg-gray-600",
  },
];

const ContactLinks: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div id="contact-section" className="w-full py-16 bg-white">
      <div className="flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          <h2 className="px-6 py-3 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight inline-block">
            Connect With Us
          </h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join our community and stay updated with the latest news and updates
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl mx-auto justify-items-center"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl
                w-full max-w-[280px]
                bg-white border-2 border-gray-100 ${social.color}
                ${social.hoverBg} hover:text-white
                shadow-sm hover:shadow-lg transition-all duration-300
                cursor-pointer group`}
            >
              <div className="transform transition-transform duration-300 group-hover:scale-110">
                {social.icon}
              </div>
              <span className="font-medium text-sm">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export { ContactLinks };
export default ContactLinks;