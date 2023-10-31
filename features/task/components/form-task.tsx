import { Input } from "@/components/ui";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskPriority, TaskProgress } from "@prisma/client";
import { format } from "date-fns";
import { ErrorMessage, useFormikContext } from "formik";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Tasks } from "../core";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const FormTask = () => {
  const { values, errors, handleChange, setValues } = useFormikContext<Tasks>();

  return (
    <ScrollArea>
      <div className="flex flex-col gap-5 p-1">
        <Label htmlFor="title" className="flex w-full flex-col gap-1">
          Title
          <Input
            id="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Todo..."
          />
          <ErrorMessage
            name="title"
            component="div"
            className="mt-1 text-[13px] text-red-500"
          />
        </Label>

        {/* task assignee */}
        <Label className="flex flex-col gap-1">
          Assignee
          <Select
            name="priority"
            value={String(values.priority)}
            onValueChange={(value: TaskPriority) =>
              setValues({ ...values, priority: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={TaskPriority.NOT_SET}>
                  <span className="flex items-center gap-3">Not set</span>
                </SelectItem>
                <SelectItem value={TaskPriority.LOW}>
                  <span className="flex items-center gap-3">Low</span>
                </SelectItem>
                <SelectItem value={TaskPriority.MEDIUM}>
                  <span className="flex items-center gap-3">Medium</span>
                </SelectItem>
                <SelectItem value={TaskPriority.HIGH}>
                  <span className="flex items-center gap-3">High</span>
                </SelectItem>
                <SelectItem value={TaskPriority.URGENT}>
                  <span className="flex items-center gap-3">Urgent</span>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>

        {/* task priority, progress, endedAt, startedAt */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-2">
          <Label
            htmlFor="priority"
            className="col-span-1 flex w-full flex-col gap-1"
          >
            Priority
            <Select
              name="priority"
              value={String(values.priority)}
              onValueChange={(value: TaskPriority) =>
                setValues({ ...values, priority: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={TaskPriority.NOT_SET}>
                    <span className="flex items-center gap-3">Not set</span>
                  </SelectItem>
                  <SelectItem value={TaskPriority.LOW}>
                    <span className="flex items-center gap-3">Low</span>
                  </SelectItem>
                  <SelectItem value={TaskPriority.MEDIUM}>
                    <span className="flex items-center gap-3">Medium</span>
                  </SelectItem>
                  <SelectItem value={TaskPriority.HIGH}>
                    <span className="flex items-center gap-3">High</span>
                  </SelectItem>
                  <SelectItem value={TaskPriority.URGENT}>
                    <span className="flex items-center gap-3">Urgent</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorMessage
              name="priority"
              component="div"
              className="mt-1 text-[13px] text-red-500"
            />
          </Label>

          <Label
            htmlFor="progress"
            className="col-span-1 flex w-full flex-col gap-1"
          >
            Progress
            <Select
              name="progress"
              value={String(values.progress)}
              onValueChange={(value: TaskProgress) =>
                setValues({ ...values, progress: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={TaskProgress.NOT_STARTED}>
                    <span className="flex items-center gap-3">Not started</span>
                  </SelectItem>
                  <SelectItem value={TaskProgress.ON_PROGRESS}>
                    <span className="flex items-center gap-3">On Progress</span>
                  </SelectItem>
                  <SelectItem value={TaskProgress.FINISHED}>
                    <span className="flex items-center gap-3">Finished</span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorMessage
              name="progress"
              component="div"
              className="mt-1 text-[13px] text-red-500"
            />
          </Label>

          <Label htmlFor="startedAt" className="flex flex-col gap-1">
            startedAt
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full bg-slate-100 pl-3 text-left font-normal",
                    !values.startedAt && "text-muted-foreground",
                  )}
                >
                  {values.startedAt ? (
                    format(values.startedAt, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(String(values.startedAt))}
                  onSelect={(value) =>
                    setValues({ ...values, startedAt: value })
                  }
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </Label>

          <Label htmlFor="endedAt" className="flex flex-col gap-1">
            EndedAt
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full bg-slate-100 pl-3 text-left font-normal",
                    !values.endedAt && "text-muted-foreground",
                  )}
                >
                  {values.endedAt ? (
                    format(values.endedAt, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(String(values.endedAt))}
                  onSelect={(value) => setValues({ ...values, endedAt: value })}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </Label>
        </div>

        <Label htmlFor="description" className="flex flex-col gap-1">
          Deskripsi
          <Textarea
            id="description"
            name="description"
            value={values.description!}
            onChange={handleChange}
          />
          <ErrorMessage
            name="progress"
            component="div"
            className="mt-1 text-[13px] text-red-500"
          />
        </Label>
      </div>
      <ScrollBar dir="vertical" />
    </ScrollArea>
  );
};
