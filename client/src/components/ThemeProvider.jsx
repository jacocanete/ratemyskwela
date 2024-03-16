import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-slate-900 min-h-screen transition duration-300 ease-in-out ">
        {children}
      </div>
    </div>
  );
}
