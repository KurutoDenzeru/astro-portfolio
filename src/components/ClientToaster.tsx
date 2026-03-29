import { Toaster } from "@/components/ui/sonner";

export default function ClientToaster() {
	return (
		<Toaster
			position="top-right"
			closeButton
			richColors
			duration={2200}
			offset={16}
		/>
	);
}
