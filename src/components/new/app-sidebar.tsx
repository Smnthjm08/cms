'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  //   SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  //   SidebarMenuButton,
  SidebarMenuItem,
  //   SidebarMenuSub,
  //   SidebarMenuSubButton,
  //   SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CommandIcon,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
} from 'lucide-react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
// import { NavProjects } from './nav-projects';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Week 0',
      url: '#',
      icon: CommandIcon,
      isActive: true,
      items: [
        {
          title: 'Intro, Setting Up Your IDE',
          url: '#',
        },
        {
          title: 'HTML Basics',
          url: '#',
        },
        {
          title: 'Css Basics',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton size="lg" asChild> */}
            <div className="flex items-center justify-center gap-2">
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {session?.user && pathname !== '/home' && (
                    <Button
                      onClick={() => router.back()}
                      variant={'ghost'}
                      size={'icon'}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="size-4" />
                    </Button>
                  )}
                </div>
              </a>

              <div className="flex flex-col gap-0.5 leading-none">
                {/* <span className="font-semibold">Documentation</span> */}
                {/* <span className="">v1.0.0</span> */}
                <Link href={'/'} className="flex items-center gap-2">
                  <img
                    src={
                      'https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg'
                    }
                    alt="100xDevs Logo"
                    className="size-8 rounded-full"
                  />
                  <p
                    className={`hidden bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-black tracking-tighter text-transparent min-[375px]:block`}
                  >
                    100xDevs
                  </p>
                </Link>
              </div>
            </div>
            {/* </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data?.navMain} />
        {/* <NavProjects projects={data?.projects} /> */}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
