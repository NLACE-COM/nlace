import { useState } from "react";
import { Clock, Download, FileText, MoreHorizontal, Plus, Search, Upload, Trash2, AlertCircle, File, FolderX, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentCompany, getKnowledgeBasesByCompany } from "@/lib/data";
import { toast } from "@/hooks/use-toast";
import { KnowledgeBase, KnowledgeDocument } from "@/lib/types";
const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [knowledgeBaseToDelete, setKnowledgeBaseToDelete] = useState<KnowledgeBase | null>(null);
  const [documentToDelete, setDocumentToDelete] = useState<{
    kb: KnowledgeBase;
    doc: KnowledgeDocument;
  } | null>(null);
  const [isNewKBDialogOpen, setIsNewKBDialogOpen] = useState(false);
  const [newKBName, setNewKBName] = useState("");
  const [newKBDescription, setNewKBDescription] = useState("");

  // Estado para manejar la subida de archivos
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedKB, setSelectedKB] = useState<KnowledgeBase | null>(null);
  const companyKnowledgeBases = currentCompany ? getKnowledgeBasesByCompany(currentCompany.id) : [];
  const filteredKnowledgeBases = companyKnowledgeBases.filter(kb => kb.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
      year: "numeric"
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
  const handleDeleteKnowledgeBase = () => {
    if (knowledgeBaseToDelete) {
      // Aquí iría la lógica para eliminar la base de conocimiento
      console.log("Eliminando base de conocimiento:", knowledgeBaseToDelete.id);
      toast({
        title: "Base de conocimiento eliminada",
        description: `La base de conocimiento "${knowledgeBaseToDelete.name}" ha sido eliminada.`
      });
      setKnowledgeBaseToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  const handleDeleteDocument = () => {
    if (documentToDelete) {
      // Aquí iría la lógica para eliminar el documento
      console.log("Eliminando documento:", documentToDelete.doc.id, "de la KB:", documentToDelete.kb.id);
      toast({
        title: "Documento eliminado",
        description: `El documento "${documentToDelete.doc.title}" ha sido eliminado.`
      });
      setDocumentToDelete(null);
    }
  };
  const handleCreateKnowledgeBase = () => {
    if (!newKBName.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la base de conocimiento es obligatorio.",
        variant: "destructive"
      });
      return;
    }

    // Aquí iría la lógica para crear una nueva base de conocimiento
    console.log("Creando nueva base de conocimiento:", {
      name: newKBName,
      description: newKBDescription
    });
    toast({
      title: "Base de conocimiento creada",
      description: `La base de conocimiento "${newKBName}" ha sido creada.`
    });
    setNewKBName("");
    setNewKBDescription("");
    setIsNewKBDialogOpen(false);
  };
  const handleUploadFile = () => {
    if (!selectedKB) return;

    // Aquí iría la lógica para subir archivos
    toast({
      title: "Documento subido",
      description: "El documento ha sido añadido a la base de conocimiento."
    });
    setSelectedKB(null);
    setIsUploadDialogOpen(false);
  };
  return <div className="container py-6 max-w-7xl animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="heading-1 font-extrabold">Base de Conocimiento</h1>
          <p className="text-muted-foreground">
            Gestiona el conocimiento privado de tu empresa
          </p>
        </div>
        <Dialog open={isNewKBDialogOpen} onOpenChange={setIsNewKBDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nueva Base de Conocimiento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nueva Base de Conocimiento</DialogTitle>
              <DialogDescription>
                Crea una nueva base de conocimiento para tu empresa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Ej: Documentación Técnica" value={newKBName} onChange={e => setNewKBName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Ej: Contiene toda la documentación técnica de nuestros productos" value={newKBDescription} onChange={e => setNewKBDescription(e.target.value)} rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewKBDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateKnowledgeBase}>Crear</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar bases de conocimiento..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Subir
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Subir Documento</DialogTitle>
                <DialogDescription>
                  Selecciona una base de conocimiento y sube un documento
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Base de Conocimiento</Label>
                  <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm" onChange={e => {
                  const kb = companyKnowledgeBases.find(kb => kb.id === e.target.value);
                  setSelectedKB(kb || null);
                }} value={selectedKB?.id || ""}>
                    <option value="" disabled>
                      Selecciona una base de conocimiento
                    </option>
                    {companyKnowledgeBases.map(kb => <option key={kb.id} value={kb.id}>
                        {kb.name}
                      </option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Documento</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <File className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium mb-1">
                      Arrastra archivos aquí o haz clic para subirlos
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Soporta PDF, DOCX, TXT (máx. 10MB)
                    </p>
                    <Input type="file" className="hidden" id="file-upload" accept=".pdf,.docx,.txt" />
                    <Label htmlFor="file-upload" className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground cursor-pointer">
                      Seleccionar archivo
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUploadFile} disabled={!selectedKB}>
                  Subir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredKnowledgeBases.length === 0 ? <div className="flex flex-col items-center justify-center p-6 sm:p-12 text-center border rounded-lg bg-muted/10">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No se encontraron bases de conocimiento</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? "Prueba a ajustar tu término de búsqueda" : "Crea tu primera base de conocimiento para comenzar"}
          </p>
          <Button onClick={() => setIsNewKBDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nueva Base de Conocimiento
          </Button>
        </div> : <div className="grid gap-6 md:grid-cols-2">
          {filteredKnowledgeBases.map(kb => <Card key={kb.id} className="animate-fade-in card-hover">
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
                      <DropdownMenuItem onClick={() => {
                  setSelectedKB(kb);
                  setIsUploadDialogOpen(true);
                }}>
                        Añadir documentos
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive flex items-center" onClick={() => {
                  setKnowledgeBaseToDelete(kb);
                  setIsDeleteDialogOpen(true);
                }}>
                        <Trash2 className="h-4 w-4 mr-2" />
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
                  {kb.documents.length === 0 ? <div className="p-4 text-center border border-dashed rounded-md">
                      <p className="text-muted-foreground">No hay documentos aún</p>
                    </div> : kb.documents.map(doc => <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/40 rounded-md hover:bg-muted transition-colors duration-200">
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
                        <div className="flex gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Descargar</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => setDocumentToDelete({
                        kb,
                        doc
                      })}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Eliminar</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>)}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => {
            setSelectedKB(kb);
            setIsUploadDialogOpen(true);
          }}>
                  <Plus className="mr-2 h-3 w-3" /> Añadir Documento
                </Button>
              </CardFooter>
            </Card>)}
          {/* Se ha eliminado el módulo de "Crear Nueva Base de Conocimiento" que aparecía al final de la lista */}
        </div>}

      {/* Dialog para confirmar eliminación de base de conocimiento */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" /> Eliminar Base de Conocimiento
            </DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la base de conocimiento y todos sus documentos.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-3 bg-destructive/10 rounded-md border border-destructive/20 text-sm">
              <p className="font-medium text-destructive mb-1">¿Estás seguro de que quieres eliminar esta base de conocimiento?</p>
              <p className="text-muted-foreground">
                {knowledgeBaseToDelete?.name} - {knowledgeBaseToDelete?.documents.length} documentos
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteKnowledgeBase}>
              <Trash2 className="h-4 w-4 mr-2" /> Eliminar Base de Conocimiento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar eliminación de documento */}
      <Dialog open={!!documentToDelete} onOpenChange={open => !open && setDocumentToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" /> Eliminar Documento
            </DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El documento será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-3 bg-destructive/10 rounded-md border border-destructive/20 text-sm">
              <p className="font-medium text-destructive mb-1">¿Estás seguro de que quieres eliminar este documento?</p>
              <p className="text-muted-foreground">
                {documentToDelete?.doc.title} - {documentToDelete?.doc.type.toUpperCase()}
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteDocument}>
              <Trash2 className="h-4 w-4 mr-2" /> Eliminar Documento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Knowledge;