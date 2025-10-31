"use client";

import {
  Archive,
  LogOut,
  NotebookPenIcon,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

import { NavMain } from "./nav-main";

// This is sample data.

const data = {
  navMain: [
    {
      label: "Menu",
      items: [
        {
          title: "Cadastros",
          url: "#",
          icon: NotebookPenIcon,
          items: [
            {
              title: "Fornecedores",
              url: "/fornecedores",
            },

            {
              title: "Garagens",
              url: "/garagens",
            },
          ],
        },
      ],
    },
    {
      label: "Veículos",
      items: [
        {
          title: "Veículos",
          url: "#",
          icon: Wrench,
          items: [
            {
              title: "Cadastro",
              url: "/veiculos",
            },
            {
              title: "Documentos",
              url: "/documentos-veiculos",
            },
            {
              title: "Abastecimentos",
              url: "/abastecimentos",
            },
          ],
        },
      ],
    },
    {
      label: "Manutenção",
      items: [
        {
          title: "Ordens de Serviço",
          url: "#",
          icon: Wrench,
          items: [
            {
              title: "Solicitações",
              url: "/manutencoes",
            },
            {
              title: "Historico",
              url: "/historico-manutencoes",
            },
          ],
        },
      ],
    },
    {
      label: "Estoque",
      items: [
        {
          title: "Produtos e Serviços",
          url: "#",
          icon: Archive,
          items: [
            {
              title: "Cadastro",
              url: "/estoque",
            },
            {
              title: "Entregas",
              url: "/entregas",
            },
          ],
        },
      ],
    },
    {
      label: "Compras",
      items: [
        {
          title: "Gestão de Compras",
          url: "#",
          icon: ShoppingCart,
          items: [
            {
              title: "Compras",
              url: "/compras",
            },
            {
              title: "Solicitações e Cotações",
              url: "/solicitacoes-compras",
            },
            {
              title: "Histórico de Compras",
              url: "/historico-compras",
            },
          ],
        },
      ],
    },
    {
      label: "RH",
      items: [
        {
          title: "Funcionários",
          url: "/funcionarios",
          icon: Users,
          items: [
            {
              title: "Cadastro",
              url: "/funcionarios",
            },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const session = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="mx-auto mt-4"
      />
      <SidebarContent>
        <NavMain groups={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarFallback>
                      {session.data?.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{session.data?.user.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {session.data?.user.email}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
