"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";

function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  const [newTaskInput,setNewTaskInput]= useBoardStore((state)=>[state.newTaskInput,state.setnewTaskInput])
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10"
        onClose={
          closeModal
        }
      >
        <div className="fixed insert-0 overflow-y-auto">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-opacity-25" />
            </Transition.Child>
          </div>
        </div>
        <div className="fixed insert-0 overflow-y-auto">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 pb-2"
              >
                Add a Task

              </Dialog.Title>
              <div className="mt-2">
               <input
               type="text"
               value={newTaskInput}
               onChange={(e)=> setNewTaskInput(e.target.value)}
               placeholder="Enter a Task here..."
               className="w-full border border-gray-300 rounded-md outline-none p-5"
               />
              </div>
              </Dialog.Panel>
            </Transition.Child>

          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
