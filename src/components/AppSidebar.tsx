import { NavLink } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LayoutDashboard,
  MessageSquare,
  FilePlus,
  FolderOpen,
  HelpCircle,
  Phone,
  User,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export function AppSidebar() {
  const { t, language } = useLanguage();
  const { state } = useSidebar();
  const isRTL = language === 'ar';
  const isExpanded = state === 'expanded';

  const mainMenuItems = [
    {
      title: t('common.dashboard'),
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: t('common.aiAssistant'),
      url: '/chat',
      icon: MessageSquare,
    },
  ];

  const attestationItems = [
    {
      title: t('common.newAttestation'),
      url: '/attestation/new',
      icon: FilePlus,
    },
    {
      title: t('cases.title'),
      url: '/cases',
      icon: FolderOpen,
    },
  ];

  const supportItems = [
    {
      title: t('faqs.title'),
      url: '/faqs',
      icon: HelpCircle,
    },
    {
      title: t('help.title'),
      url: '/help',
      icon: Phone,
    },
  ];

  return (
    <Sidebar 
      collapsible="icon" 
      side={isRTL ? 'right' : 'left'}
      className="border-r border-border/40 bg-card"
    >
      {isExpanded && (
        <SidebarHeader className="border-b border-border/40 px-4 py-5 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm leading-tight">
                {language === 'en' ? 'MOFA Qatar' : 'وزارة الخارجية'}
              </div>
              <div className="text-xs text-muted-foreground">
                {language === 'en' ? 'eServices Portal' : 'بوابة الخدمات'}
              </div>
            </div>
          </div>
        </SidebarHeader>
      )}

      <SidebarContent className="px-2 py-4">
        {/* Main Menu */}
        <SidebarGroup>
          {isExpanded && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase">
              {language === 'en' ? 'Main' : 'الرئيسية'}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="h-11 transition-all">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-primary/10 text-primary font-medium border-s-2 border-primary'
                          : 'hover:bg-accent/50'
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {isExpanded && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isExpanded && <Separator className="my-3" />}

        {/* Attestation Services */}
        <SidebarGroup>
          {isExpanded && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase">
              {language === 'en' ? 'Attestation' : 'التصديقات'}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {attestationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="h-11 transition-all">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-primary/10 text-primary font-medium border-s-2 border-primary'
                          : 'hover:bg-accent/50'
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {isExpanded && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isExpanded && <Separator className="my-3" />}

        {/* Support */}
        <SidebarGroup>
          {isExpanded && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase">
              {language === 'en' ? 'Support' : 'الدعم'}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="h-11 transition-all">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-primary/10 text-primary font-medium border-s-2 border-primary'
                          : 'hover:bg-accent/50'
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {isExpanded && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 px-2 py-3 bg-gradient-to-t from-primary/5 to-transparent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t('common.profile')} className="h-12">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-accent/50'
                }
              >
                {isExpanded ? (
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex-1 text-start">
                      <p className="text-sm font-medium">{t('common.profile')}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Manage account' : 'إدارة الحساب'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <User className="h-5 w-5" />
                )}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
