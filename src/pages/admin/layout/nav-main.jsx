import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import useHasPermission from "@/components/PermissionWrapper"; // adjust path as needed

export function NavMain({ items }) {
  const hasPermission = useHasPermission();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-3">
        {items.map((item) => {
          // Filter sub-items by permission
          const visibleSubItems = item.items?.filter((subItem) => {
            return (
              !subItem.permission || hasPermission(subItem.permission)
            );
          });

          // If no sub-items are visible, skip rendering this parent
          if (!visibleSubItems || visibleSubItems.length === 0) return null;

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} className="text-lg">
                    {item.icon && <item.icon className="size-5" />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="gap-3 mt-3">
                    {visibleSubItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <NavLink to={subItem.url}>
                          {({ isActive }) => (
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive}
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
