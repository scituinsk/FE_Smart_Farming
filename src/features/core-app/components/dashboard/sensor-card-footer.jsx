export const SensorCardFooter = ({ icon, label, value, status }) => {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      {/* Icon bulat */}
      <div className="size-8 rounded-full bg-white flex items-center justify-center mb-2">{icon}</div>

      {/* Label */}
      <p className="font-semibold text-lg">{label}</p>

      {/* Value atau status */}
      {status ? (
        <p className=" inline-block mt-1 px-3 py-1 rounded-full bg-green-400 text-black text-sm font-medium">{status}</p>
      ) : (
        <p className="mt-1 text-base">{value}</p>
      )}
    </div>
  );
};
