/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type MouseEventHandler,
  type FC,
  useRef,
} from "react";
import Text from "../common/Text";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown.");
  }
  return context;
};

// 2. Dropdown 컴포넌트
interface DropdownProps {
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> & {
  Toggle: typeof DropdownToggle;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef as any, close, isOpen);
  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div ref={dropdownRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// 3. Toggle 컴포넌트
interface DropdownToggleProps {
  children: ReactNode;
}

const DropdownToggle: FC<DropdownToggleProps> = ({ children }) => {
  const { toggle } = useDropdown();
  return (
    <div onClick={toggle} className="">
      {children}
    </div>
  );
};

// 4. Menu 컴포넌트
interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ children }) => {
  const { isOpen } = useDropdown();
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50 ">
      {children}
    </div>
  );
};

// 5. Item 컴포넌트
interface DropdownItemProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const DropdownItem: FC<DropdownItemProps> = ({ children, onClick }) => {
  const { toggle } = useDropdown();

  return (
    <div
      onClick={(event) => {
        if (onClick) onClick(event);
        toggle();
      }}
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition bg-[#f5f8fc]"
    >
      <Text size="sm">{children}</Text>
    </div>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;
