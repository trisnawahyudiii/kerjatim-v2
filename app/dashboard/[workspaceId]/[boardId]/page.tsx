"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  CategoryContainer,
  ModalCreateCategory,
} from "@/features/category/components";
import { Categories } from "@/features/category/core/categories";
import {
  useCreateCategory,
  useGetAllCategory,
} from "@/features/category/hooks";
import { useDeleteCategory } from "@/features/category/hooks/use-delete-category";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BoardPage() {
  const { workspaceId, boardId } = useParams();
  const { toast } = useToast();
  const { data, isFetching, isError, refetch } = useGetAllCategory({
    params: { boardId: String(boardId) },
  });

  const [open, setOpen] = useState<boolean>(false);
  const closeModal = () => setOpen(false);

  const createCategory = useCreateCategory();

  const handleSubmitCreateCategory = (values: Categories) => {
    return createCategory.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasil membuat kategori",
        });
        refetch();
        closeModal();
      },
    });
  };

  const initialValue: Categories = {
    name: "",
    boardId: String(boardId),
  };

  const deleteCategory = useDeleteCategory();
  const handleDeleteCategory = (values: Categories) => {
    deleteCategory.mutate(values.id!, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Berhasil menghapus kategori",
        });
        refetch();
      },
    });
  };

  const refetchCategory = () => {
    refetch();
  };

  return (
    <ScrollArea>
      <div className="flex gap-3 p-10">
        {data?.map((category) => (
          <CategoryContainer
            workspaceId={String(workspaceId)}
            key={category.id}
            category={category}
            handleDelete={handleDeleteCategory}
            refetch={refetchCategory}
          />
        ))}

        {/* modal create Category */}
        <ModalCreateCategory
          open={open}
          setOpen={setOpen}
          initialValue={initialValue}
          onSubmit={handleSubmitCreateCategory}
        />
        <ScrollBar orientation="horizontal" />
      </div>
    </ScrollArea>
  );
}
