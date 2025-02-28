
import { useState } from "react";
import { Bell, ChevronRight, Check, X, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Agente activado",
    message: "El agente 'ContentGen' ha sido activado correctamente.",
    time: "Hace 5 minutos",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "Límite de tokens al 80%",
    message: "Estás cerca de alcanzar tu límite mensual de tokens.",
    time: "Hace 2 horas",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "Nueva funcionalidad disponible",
    message: "Ahora puedes conectar tus agentes con Google Drive.",
    time: "Hace 1 día",
    type: "info",
    read: true,
  },
  {
    id: "4",
    title: "Error en la integración",
    message: "No se pudo conectar con la API de análisis. Verifica las credenciales.",
    time: "Hace 2 días",
    type: "error",
    read: true,
  },
];

const NotificationsPopover = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast({
      title: "Todas las notificaciones marcadas como leídas",
      variant: "default",
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast({
      title: "Notificación eliminada",
      variant: "default",
    });
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <X className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 bg-muted/50">
          <h3 className="font-medium">Notificaciones</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto text-xs px-2 text-muted-foreground"
              onClick={markAllAsRead}
            >
              Marcar todas como leídas
            </Button>
          )}
        </div>
        <Separator />
        {notifications.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No tienes notificaciones</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-4 hover:bg-muted transition-colors cursor-pointer ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">
                        {notification.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
                {!notification.read && (
                  <div className="absolute top-1/2 -translate-y-1/2 left-1 w-1 h-1/2 bg-primary rounded-full" />
                )}
              </div>
            ))}
            <div className="p-4 text-center border-t">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto text-xs text-muted-foreground"
              >
                Ver todas las notificaciones
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
