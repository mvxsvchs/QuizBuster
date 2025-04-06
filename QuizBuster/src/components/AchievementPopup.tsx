import { motion, AnimatePresence } from "framer-motion";
import "./AchievementPopup.css";


interface AchievementPopupProps {
    show: boolean;
    title: string;
}

const AchievementPopup: React.FC<AchievementPopupProps> = ({ show, title }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="achievement-popup"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="achievement-icon">🏆</div>
                    <div className="achievement-text">
                        <strong>Achievement freigeschaltet!</strong>
                        <div>{title}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AchievementPopup;
