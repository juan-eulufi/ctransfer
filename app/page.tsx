"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { Label } from "@radix-ui/react-label";

import { IconCloud } from "@tabler/icons-react"


import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"


export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Selecciona un archivo primero");
      return;
    }

    // Guardamos con un nombre único
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("files") // Reemplaza con el nombre de tu bucket
      .upload(fileName, file);

    if (error) {
      console.error("Error subiendo archivo:", error);
      return;
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from("files")
      .getPublicUrl(fileName);

    setFileUrl(publicUrlData.publicUrl);
  };

  return (
    <div><nav className="bg-gray-700 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="scroll-m-20 text-white text-center text-4xl font-extrabold tracking-tight text-balance">Ctransfer</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
         
        </div>
      </div>
    </nav>
      <div className="font-sans bg-indigo-50 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex text-gray-800 flex-col  gap-[32px] row-start-2  sm:items-start">
          <ol className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight first:mt-0">
            Ctransfer
          </ol>

          <div className="flex gap-4 items-start flex-col">
            <Label htmlFor="files" className="scroll-m-20 text-2xl font-semibold tracking-tight">Comparte con tu grupo de amigos o trabajo. 👋</Label>
            <p className="text-xs text-gray">Archivos de los formatos más utilizados, como PDF, PNG, JPG, Word, Excel, ZIP, entre otros.</p>
            <Input className="text-xs hover:bg-gray-100 hover:cursor-pointer" id="files" type="file" onChange={handleFileChange} />
          </div>

          <Button
            className="text-black text-xs hover:border-gray-300 hover:bg-gray-100 cursor-pointer"
            type="button"
            variant="outline"
            onClick={uploadFile}
          >
            Compartir archivo 🔗
          </Button>


          {fileUrl && (
            <Alert className="mt-10">
              <CheckCircle2Icon />
              <AlertTitle>Success! Your file in:</AlertTitle>
              <AlertDescription>
                <a href={fileUrl} target="_blank" className="underline hover:text-blue-300" rel="noopener noreferrer">
                  {fileUrl}
                </a>
              </AlertDescription>
            </Alert>


          )}

        </main>
      </div>
    </div>
  );
}
