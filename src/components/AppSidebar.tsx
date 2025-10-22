import { Home, FileText, Search, MessageSquare, HelpCircle, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { t, language } = useLanguage();
  const { state } = useSidebar();
  const isRTL = language === 'ar';

  const navItems = [
    { path: '/dashboard', label: t('common.dashboard'), icon: Home },
    { path: '/chat', label: t('common.aiAssistant'), icon: MessageSquare },
    { path: '/attestation/new', label: t('common.startAttestation'), icon: FileText },
    { path: '/cases', label: t('common.trackStatus'), icon: Search },
    { path: '/faqs', label: t('common.faqs'), icon: HelpCircle },
    { path: '/help', label: t('common.help'), icon: Phone },
  ];

  return (
    <Sidebar collapsible="icon" side={isRTL ? 'right' : 'left'}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('common.menu')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                      }
                    >
                      <item.icon className={`h-4 w-4 ${isRTL ? 'ml-2' : ''}`} />
                      {state === 'expanded' && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
