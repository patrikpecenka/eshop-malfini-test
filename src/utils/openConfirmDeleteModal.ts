import { modals } from "@mantine/modals";

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  title: string;
}

export const openConfirmDeleteModal = ({ onConfirm: confirm, title }: ConfirmDeleteModalProps) => {
  return modals.openConfirmModal({
    centered: true,
    title: title,
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
  })
}