import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-gray-800 rounded-xl max-w-lg w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-blue-400 mb-4">Feedback Forum</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-500/10 rounded-lg p-4 text-blue-300">
            <p>This site is currently in beta version. We're actively developing new features and improvements.</p>
          </div>

          <p className="text-gray-300">
            We'd love to hear your thoughts! What features or topics would you like to see added?
            How can we make this platform more helpful for you?
          </p>

          <textarea
            className="w-full h-32 bg-gray-700/50 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Share your suggestions here..."
          />

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackModal; 