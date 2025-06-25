"use client";

import type * as React from "react";
import {
  BookOpen,
  Bus,
  ChevronRight,
  GraduationCap,
  Home,
  MessageSquare,
  UserCheck,
  BarChart3,
  Library,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Students",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "All Students",
          url: "/students",
        },
        {
          title: "Add Student",
          url: "/students/add",
        },
        {
          title: "Attendance",
          url: "/students/attendance",
        },
        {
          title: "Health Records",
          url: "/students/health",
        },
        {
          title: "Transfer Certificate",
          url: "/students/transfer",
        },
      ],
    },
    {
      title: "Teachers & Staff",
      url: "#",
      icon: UserCheck,
      items: [
        {
          title: "All Teachers",
          url: "/teachers",
        },
        {
          title: "Add Teacher",
          url: "/teachers/add",
        },
        {
          title: "Attendance",
          url: "/teachers/attendance",
        },
        {
          title: "Timetable",
          url: "/teachers/timetable",
        },
      ],
    },
    {
      title: "Academics",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Timetable",
          url: "/academics/timetable",
        },
        {
          title: "Exams & Marks",
          url: "/academics/exams",
        },
        {
          title: "Report Cards",
          url: "/academics/reports",
        },
        {
          title: "Assignments",
          url: "/academics/assignments",
        },
      ],
    },
    {
      title: "Communication",
      url: "#",
      icon: MessageSquare,
      items: [
        {
          title: "Send Messages",
          url: "/communication/messages",
        },
        {
          title: "Announcements",
          url: "/communication/announcements",
        },
        {
          title: "Circulars",
          url: "/communication/circulars",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "UDISE+ Reports",
          url: "/reports/udise",
        },
        {
          title: "Custom Reports",
          url: "/reports/custom",
        },
        {
          title: "Export Data",
          url: "/reports/export",
        },
      ],
    },
    {
      title: "Library",
      url: "#",
      icon: Library,
      items: [
        {
          title: "Book Catalog",
          url: "/library/catalog",
        },
        {
          title: "Issue/Return",
          url: "/library/transactions",
        },
        {
          title: "Search Books",
          url: "/library/search",
        },
      ],
    },
    {
      title: "Transport",
      url: "#",
      icon: Bus,
      items: [
        {
          title: "Bus Routes",
          url: "/transport/routes",
        },
        {
          title: "Student Mapping",
          url: "/transport/mapping",
        },
        {
          title: "Driver Details",
          url: "/transport/drivers",
        },
      ],
    },
    {
      title: "Admin Tools",
      url: "#",
      icon: Shield,
      items: [
        {
          title: "User Management",
          url: "/admin/users",
        },
        {
          title: "Settings",
          url: "/admin/settings",
        },
        {
          title: "Data Backup",
          url: "/admin/backup",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">SMS Dashboard</span>
            <span className="truncate text-xs text-muted-foreground">
              Government School
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible asChild defaultOpen={item.isActive}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                  <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin User</span>
                  <span className="truncate text-xs text-muted-foreground">
                    admin@school.gov.in
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
