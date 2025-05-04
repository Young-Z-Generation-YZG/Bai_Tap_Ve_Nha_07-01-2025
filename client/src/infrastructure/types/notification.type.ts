// Define notification interfaces based on the server data
export interface NotificationBase {
	id: string;
	recipient: string;
	sender: string | null;
	type: 'INVOICE' | 'REVIEW';
	isRead?: boolean;
	readAt?: string | null;
	isDeleted?: boolean;
	createdAt?: string;
}
  
export interface InvoiceNotificationType extends NotificationBase {
	type: 'INVOICE';
	invoice_info: {
		label: string,
		message: string,
		invoice_id: string,
		invoice_code: string,
		customer_id: string,
		customer_name: string,
		amount: number,
		unit: number,
		status: string,
	};
}
  
export interface ReviewNotificationType extends NotificationBase {
	type: 'REVIEW';
	review_info: {
		label: string,
		rating: number,
		message: string,
		review_id: string,
		content: string,
		user_id: string,
		customer_name: string,
		product_id: string,
		product_name: string,
		product_image: string,
		invoice_code: string,
	};
}
  
// export interface VoucherNotification extends NotificationBase {
// 	type: 'VOUCHER';
// 	voucher_info: {
// 		label: string;
// 		message: string;
// 		// Add other voucher-specific fields
// 	};
// }

export type NotificationType = InvoiceNotificationType | ReviewNotificationType;

// Update the callback type
type NotificationCallback = (notification: NotificationType) => void;