'use client';

import {
  Bookmark,
  Calendar,
  ChevronsUpDown,
  CreditCard,
  History,
  LogOut,
  MessageSquare,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import ExternalLinks from '../profile-menu/ExternalLinks';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import ProfileDropdown from '../profile-menu/ProfileDropdown';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { data: session } = useSession();

  const menuItemLinks = [
    {
      href: '/watch-history',
      icon: <History className="size-4" />,
      label: 'Watch History',
    },
    {
      href: '/bookmark',
      icon: <Bookmark className="size-4" />,
      label: 'Bookmarks',
    },
    {
      href: '/question',
      icon: <MessageSquare className="size-4" />,
      label: 'Questions',
    },
    {
      href: '/payout-methods',
      icon: <CreditCard className="size-4" />,
      label: 'Payout Methods',
    },
    {
      href: '/calendar',
      icon: <Calendar className="size-4" />,
      label: 'Calendar',
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-30 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
          {menuItemLinks.map(({ href, label, icon }) => (
            <Link href={href} key={href}>
              <DropdownMenuItem className="flex gap-2 text-base">
                {icon}
                <span>{label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ExternalLinks />

            <DropdownMenuSeparator />
            <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          <span
            className={`flex items-center gap-2 text-base transition-all duration-300 hover:text-red-500`}
          >
            <LogOut className="size-4" />
            Logout
          </span>
        </DropdownMenuItem>
          </DropdownMenuContent>
          {session?.user && <ProfileDropdown />}

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
