export default function MiniProfile({
  name,
  email,
  logout,
}: {
  name: string;
  email: string;
  logout: () => void;
}) {
  return (
    <div className="absolute top-[40px] right-0 w-[180px] bg-[#202020] text-white p-3 rounded-md shadow-lg z-50">
      <div className="text-sm font-semibold">{name}</div>
      <div className="text-xs text-gray-400">{email}</div>
      <button
        onClick={logout}
        className="cursor-pointer mt-2 text-red-400 text-sm hover:text-red-300"
      >
        Вийти
      </button>
    </div>
  );
}
