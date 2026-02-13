import { motion } from "framer-motion";

export function MarqueeTicker() {
  const items = [
    "PAYMENTS PROCESSED",
    "APPOINTMENTS BOOKED",
    "24/7 SUPPORT ACTIVE",
    "MULTI-LANGUAGE NATIVE",
    "WHITE-LABEL READY",
    "NO-CODE SETUP",
  ];

  return (
    <div className="w-full overflow-hidden border-y-[3px] border-black bg-white py-4">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, idx) => (
              <span key={idx} className="flex items-center mx-8 text-[13px] font-black uppercase tracking-[0.3em] text-black">
                <span className="mr-8 h-2 w-2 bg-black" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
