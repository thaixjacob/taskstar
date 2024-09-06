"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FormEvent, useRef } from "react";
import Image from "next/image";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

function ModalNewTask() {
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const [addTask, image, setImage, newTaskInput, setNewTaskInput, newTaskType] =
    useBoardStore((state) => [
      state.addTask,
      state.image,
      state.setImage,
      state.newTaskInput,
      state.setNewTaskInput,
      state.newTaskType,
    ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModal();
  };

  return (
    <>
      <Dialog
        as="form"
        open={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        transition
        className="fixed inset-0 flex w-screen min-h-full items-center justify-center text-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between">
            <DialogTitle
              as="h3"
              className="font-medium text-lg leading-6 text-gray-900 pb-2"
            >
              Add new task
            </DialogTitle>
            <XMarkIcon
              onClick={closeModal}
              className="w-6 h-6 cursor-pointer hover:bg-black/10"
            />
          </div>

          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder="Enter a task here"
            className="mt-2 w-full border border-gray-300 rounded-md outline-none p-5"
          />

          <TaskTypeRadioGroup />

          <div className="mt-2">
            <button
              type="button"
              className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Upload a image"
              onClick={() => {
                imagePickerRef.current?.click();
              }}
            >
              <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
              Upload image
            </button>

            {image && (
              <div className="relative group mt-2">
                <Image
                  alt="Uploaded Image"
                  width={200}
                  height={200}
                  className="w-full h-32 rounded-xl object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-pointer"
                  src={URL.createObjectURL(image)}
                  onClick={() => {
                    setImage(null);
                  }}
                />
                <TrashIcon className="h-8 w-8 text-white opacity-0 absolute inset-0 m-auto group-hover:opacity-100 transition-opacity duration-150 cursor-pointer" />
              </div>
            )}

            <input
              type="file"
              ref={imagePickerRef}
              hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files![0].type.startsWith("image/")) return;
                setImage(e.target.files![0]);
              }}
            />
          </div>

          <div className="mt-6 flex justify-between gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex w-full justify-center rounded-md border-2 border-[#c0d0f8] hover:border-[#8ba6e7] bg-white px-4 py-2 text-sm font-medium text-[#728dce] hover:font-bold focus-outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Add the Task"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!newTaskInput}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#8ba6e7] border-[#8ba6e7] hover:bg-[#728dce] px-4 py-2 text-sm font-medium text-white hover:font-bold focus-outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:hover:font-medium disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-100 disabled:cursor-not-allowed"
              aria-label="Add the Task"
            >
              Add Task
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default ModalNewTask;
