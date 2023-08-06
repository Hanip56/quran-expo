import { useGlobalSearchParams, usePathname } from "expo-router";
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TabContext = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
};

const initialValue = {
  tab: "beranda",
  setTab: () => {},
};

const tabContext = createContext<TabContext>(initialValue);

export default ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [tab, setTab] = useState(initialValue.tab);

  const pathname = usePathname();
  const params = useGlobalSearchParams();

  // Track the location in your analytics provider here.
  useEffect(() => {
    switch (pathname) {
      case "/":
        setTab("beranda");
        break;
      case "/quran":
        setTab("al-quran");
        break;

      default:
        break;
    }
  }, [pathname, params]);

  return (
    <tabContext.Provider value={{ tab, setTab }}>
      {children}
    </tabContext.Provider>
  );
};

export const useTabContext = () => useContext(tabContext);
