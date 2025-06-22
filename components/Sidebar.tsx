'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  Search, 
  Menu, 
  ChevronRight, 
  ChevronDown,
  Combine,
  Scissors,
  Minimize2,
  Image,
  Crop,
  Palette,
  RotateCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  isExpanded: boolean;
  onToggleOpen: () => void;
  onToggleExpanded: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    id: 'pdf-tools',
    label: 'PDF Tools',
    icon: FileText,
    items: [
      {
        id: 'merge',
        label: 'Merge PDFs',
        href: '/pdf/merge',
        icon: Combine,
      },
      {
        id: 'split',
        label: 'Split PDF',
        href: '/pdf/split',
        icon: Scissors,
      },
      {
        id: 'compress',
        label: 'Compress PDF',
        href: '/pdf/compress',
        icon: Minimize2,
      },
    ],
  },
  {
    id: 'image-tools',
    label: 'Image Tools',
    icon: Image,
    items: [
      {
        id: 'resize',
        label: 'Resize Image',
        href: '/image/resize',
        icon: Crop,
      },
      {
        id: 'convert',
        label: 'Convert Format',
        href: '/image/convert',
        icon: RotateCw,
      },
      {
        id: 'enhance',
        label: 'Enhance Quality',
        href: '/image/enhance',
        icon: Palette,
      },
    ],
  },
];

export function Sidebar({ isOpen, isExpanded, onToggleOpen, onToggleExpanded }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['pdf-tools', 'image-tools'])
  );
  const pathname = usePathname();

  // Filter menu items based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return menuCategories;
    }

    const query = searchQuery.toLowerCase();
    return menuCategories
      .map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.label.toLowerCase().includes(query) ||
          category.label.toLowerCase().includes(query)
        ),
      }))
      .filter(category => category.items.length > 0);
  }, [searchQuery]);

  // Auto-expand categories when searching
  useMemo(() => {
    if (searchQuery.trim()) {
      const matchingCategories = new Set(
        filteredCategories.map(category => category.id)
      );
      setExpandedCategories(matchingCategories);
    }
  }, [searchQuery, filteredCategories]);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
          isExpanded ? 'w-64' : 'w-16'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isExpanded && (
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Privacy PDF Tools
                </h1>
                <p className="text-xs text-gray-500">Secure • Private • Fast</p>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            className="p-2"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        {isExpanded && (
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm"
                aria-label="Search tools"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4" role="navigation" aria-label="Main navigation">
          <div className="space-y-2">
            {filteredCategories.map((category) => (
              <div key={category.id}>
                {/* Category Header */}
                <button
                  onClick={() => isExpanded && toggleCategory(category.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors',
                    !isExpanded && 'justify-center'
                  )}
                  aria-expanded={expandedCategories.has(category.id)}
                  aria-controls={`category-${category.id}`}
                >
                  <category.icon className="h-5 w-5 flex-shrink-0" />
                  {isExpanded && (
                    <>
                      <span className="flex-1 text-left">{category.label}</span>
                      {expandedCategories.has(category.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </button>

                {/* Category Items */}
                {isExpanded && expandedCategories.has(category.id) && (
                  <div id={`category-${category.id}`} className="ml-4 mt-1 space-y-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors',
                          isActiveRoute(item.href) && 'bg-purple-50 text-purple-700 font-medium'
                        )}
                        aria-current={isActiveRoute(item.href) ? 'page' : undefined}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Collapsed state tooltips */}
                {!isExpanded && (
                  <div className="ml-2 mt-1 space-y-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          'flex items-center justify-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors',
                          isActiveRoute(item.href) && 'bg-purple-50 text-purple-700'
                        )}
                        title={item.label}
                        aria-label={item.label}
                      >
                        <item.icon className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Privacy PDF Tools
              </h1>
              <p className="text-xs text-gray-500">Secure • Private • Fast</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleOpen}
            className="p-2"
            aria-label="Close sidebar"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm"
              aria-label="Search tools"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4" role="navigation" aria-label="Main navigation">
          <div className="space-y-2">
            {filteredCategories.map((category) => (
              <div key={category.id}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-expanded={expandedCategories.has(category.id)}
                  aria-controls={`mobile-category-${category.id}`}
                >
                  <category.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{category.label}</span>
                  {expandedCategories.has(category.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {/* Category Items */}
                {expandedCategories.has(category.id) && (
                  <div id={`mobile-category-${category.id}`} className="ml-4 mt-1 space-y-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors',
                          isActiveRoute(item.href) && 'bg-purple-50 text-purple-700 font-medium'
                        )}
                        aria-current={isActiveRoute(item.href) ? 'page' : undefined}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}