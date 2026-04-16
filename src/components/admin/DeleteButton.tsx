"use client";

interface Props {
  action: (formData: FormData) => Promise<void>;
  id: number;
  label?: string;
  confirmMessage?: string;
}

export default function DeleteButton({ action, id, label = "Delete", confirmMessage = "Are you sure?" }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        {label}
      </button>
    </form>
  );
}
