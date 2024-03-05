import { modals } from "@mantine/modals";
import { ConfirmDeleteModalProps } from "lib/props/types";

export const openConfirmDeleteModal = ({ confirm, ...rest }: ConfirmDeleteModalProps) => {
  const openModal = () => modals.openConfirmModal({
    centered: true,
    title: 'Are you sure you want to delete this item?',
    size: "md",
    radius: "md",
    withCloseButton: false,
    confirmProps: {
      variant: "filled",
      color: "red.6",
    },
    cancelProps: {
      color: "gray",
      variant: "outline",
      radius: "md",
      opacity: 0.8
    },
    labels: {
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    onConfirm: () => confirm(),
    ...rest
  })

  return (
    openModal()
  )
}