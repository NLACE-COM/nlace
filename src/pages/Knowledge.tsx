
import { useState } from "react";
import {
  Clock,
  Download,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KnowledgeBase, KnowledgeDocument } from "@/lib/types";
import { currentCompany, getKnowledgeBasesByCompany } from "@/lib/data";

const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const companyKnowledgeBases = currentCompany
    ? getKnowledgeBasesByCompany(currentCompany.id)
    : [];
    
  const filteredKnowledgeBases = companyKnowledgeBases.filter((kb) =>
    kb.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (sizeInKB: number): string => {
    if (sizeInKB < 1000) {
      return `${sizeInKB} KB`;
    } else {
      return `${(sizeInKB / 1000).toFixed(1)} MB`;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "doc":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "txt":
        return <FileText className="h-6 w-6 text-gray-500" />;
      case "url":
        return <FileText className="h-6 w-6 text-green-500" />;
      case "image":
        return <FileText className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="container py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="heading-1">Base de Conocimiento</h1>
          <p className="text-muted-foreground">
            Gestiona el conocimiento privado de tu empresa
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nueva Base de Conocimiento
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar bases de conocimiento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Subir
          </Button>
        </div>
      </div>

      {filteredKnowledgeBases.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No se encontraron bases de conocimiento</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? "Prueba a ajustar tu término de búsqueda"
              : "Crea tu primera base de conocimiento para comenzar"}
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nueva Base de Conocimiento
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredKnowledgeBases.map((kb) => (
            <Card key={kb.id} className="animate-fade-in card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{kb.name}</CardTitle>
                    <CardDescription>{kb.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Editar base de conocimiento</DropdownMenuItem>
                      <DropdownMenuItem>Añadir documentos</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        Eliminar base de conocimiento
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>Última actualización: {formatDate(kb.updatedAt)}</span>
                </div>

                <div className="space-y-2">
                  {kb.documents.length === 0 ? (
                    <div className="p-4 text-center border border-dashed rounded-md">
                      <p className="text-muted-foreground">No hay documentos aún</p>
                    </div>
                  ) : (
                    kb.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 bg-muted/40 rounded-md hover:bg-muted transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-md p-2 bg-background">
                            {getFileIcon(doc.type)}
                          </div>
                          <div>
                            <p className="font-medium">{doc.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{doc.type.toUpperCase()}</span>
                              <span>•</span>
                              <span>{formatFileSize(doc.size)}</span>
                              <span>•</span>
                              <span>{formatDate(doc.uploadedAt)}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="mr-2 h-3 w-3" /> Añadir Documento
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card className="flex items-center justify-center h-full border-dashed animate-fade-in">
            <Button
              variant="ghost"
              className="h-full w-full flex flex-col gap-2 py-12"
            >
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-lg font-medium">
                Crear Nueva Base de Conocimiento
              </span>
              <p className="text-sm text-muted-foreground max-w-xs text-center">
                Añade una nueva colección de documentos para que tus agentes de IA aprendan
              </p>
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Knowledge;
