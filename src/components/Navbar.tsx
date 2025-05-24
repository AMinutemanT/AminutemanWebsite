import React, { useState } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
// import logo from 'src/logo.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = {
    'Valley': [
      'Command & Control',
      'Mission Autonomy',
      'Valley Partner Program'
    ],
    'Air Systems': [
      'Interceptor A',
      'Interceptor B',
      'Interceptor C'
    ],
    'Jet Engines': [
      'Twin Turbo Engine',
      'Ankosa A',
      'Ankosa B'
    ]
  };

  const getRoutePath = (item: string) => {
    switch (item) {
      case 'Command & Control':
        return '/valley/command-control';
      case 'Mission Autonomy':
        return '/valley/mission-autonomy';
      case 'Valley Partner Program':
        return '/valley/partner-program';
      case 'Twin Turbo Engine':
        return '/jet-engines/twin-turbo';
      case 'Ankosa A':
        return '/jet-engines/ankosa-a';
      case 'Ankosa B':
        return '/jet-engines/ankosa-b';
      case 'Interceptor A':
        return '/air-systems/interceptor-a';
      case 'Interceptor B':
        return '/air-systems/interceptor-b';
      case 'Interceptor C':
        return '/air-systems/interceptor-c';
      default:
        return '/';
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-colors duration-300 border-b border-white/10 ${
        isHovered || isMenuOpen
          ? 'bg-black' 
          : 'bg-black/20 backdrop-blur-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-[10px] border-b">
          <div className="flex items-center h-full ">
            <Link to="/" className="flex items-center h-full px-4" onClick={handleLinkClick}>
              <img 
                src={"src/logo.png"}
                alt="Logo" 
                className="h-8 w-auto"
              />
            </Link>
            <div className="h-full w-px bg-white" />
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {Object.entries(menuItems).map(([menu, items]) => (
              <div
                key={menu}
                className="relative group"
                onMouseEnter={() => setActiveMenu(menu)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button 
                  className="flex items-center space-x-2 py-2 transition-all text-white/70 hover:text-white group relative"
                >
                  <span className="text-sm font-medium after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                    {menu}
                  </span>
                  <Plus className={`w-4 h-4 transition-transform ${
                    activeMenu === menu ? 'rotate-45' : ''
                  }`} />
                </button>

                {activeMenu === menu && (
                  <div className="absolute left-0 top-full pt-2 w-64">
                    <div className="bg-black/90 backdrop-blur-sm rounded-lg shadow-lg ring-1 ring-white/10 py-2">
                      {items.map((item) => (
                        <Link
                          key={item}
                          to={getRoutePath(item)}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={handleLinkClick}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center h-full">
            <div className="hidden sm:block w-px h-full bg-white" />
            <Link
              to="/wingmans"
              className="hidden sm:inline-flex items-center h-full px-4 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors"
              onClick={handleLinkClick}
            >
              Wingmans
            </Link>
            <div className="hidden sm:block w-px h-full bg-white" />
            <Link
              to="/careers"
              className="hidden sm:inline-flex items-center h-full px-4 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors"
              onClick={handleLinkClick}
            >
              We're Hiring
            </Link>
            <div className="hidden sm:block w-px h-full bg-white" />
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden h-full px-4 text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-black/90 backdrop-blur-sm max-h-[calc(100vh-4rem)] overflow-y-auto border-b">
            <div className="px-4 py-2 space-y-1">
              {Object.entries(menuItems).map(([menu, items]) => (
                <div key={menu} className="py-2">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                    className="w-full text-left text-white/70 py-2 flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">{menu}</span>
                    <Plus className={`w-4 h-4 transition-transform ${
                      activeMenu === menu ? 'rotate-45' : ''
                    }`} />
                  </button>
                  {activeMenu === menu && (
                    <div className="pl-4 py-2 space-y-2">
                      {items.map((item) => (
                        <Link
                          key={item}
                          to={getRoutePath(item)}
                          className="block text-sm text-white/70 hover:text-white py-1"
                          onClick={handleLinkClick}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/wingmans"
                className="block sm:hidden w-full py-4 mt-4 text-sm text-white/70 "
                onClick={handleLinkClick}
              >
                Wingmans
              </Link>
              <Link
                to="/careers"
                className="block sm:hidden w-full py-4 my-4 text-sm text-white/70"
                onClick={handleLinkClick}
              >
                We're Hiring
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}