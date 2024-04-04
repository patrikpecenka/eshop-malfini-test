import { modals } from "@mantine/modals";

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  title: string;
}

export const confirmDeleteModal = ({ onConfirm, title }: ConfirmDeleteModalProps) => {


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
      radius: "xl",
      opacity: 0.8
    },
    labels: {
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    onConfirm: () => onConfirm(),
  });
};